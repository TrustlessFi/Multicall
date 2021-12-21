// Copyright (c) 2020. All Rights Reserved
// SPDX-License-Identifier: UNLICENSED

import { Contract, utils as ethersUtils, ethers } from 'ethers'
import { enforce, first, unscale, zeroAddress } from '@trustlessfi/utils'
import { TrustlessMulticallViewOnly, ResultStructOutput } from './typechain/TrustlessMulticallViewOnly'

export const rc  = {
  Number: (result: any) => result as number,
  Boolean: (result: any) => result as boolean,
  Address: (result: any) => result as string,
  String: (result: any) => result as string,
  StringArray: (result: any) => result as string[],
  BigNumber: (result: any) => result as ethers.BigNumber,
  BigNumberToNumber: (result: any) => (result as ethers.BigNumber).toNumber(),
  BigNumberToString: (result: any) => (result as ethers.BigNumber).toString(),
   BigNumberUnscale: (result: any) => unscale(result),
}

export const rcDecimals = (decimals: number) => (result: unknown) => unscale(result as ethers.BigNumber, decimals)

export type genericResultConverter = (result: unknown) => unknown

type resultConverter<customConverters extends genericResultConverter> = (typeof rc)[keyof typeof rc] | customConverters

// TODO convert any to unknown in custom converter
interface Call<customConverters extends (result: any) => any, CallType extends resultConverter<customConverters>> {
  id: string
  contract: Contract
  func: string
  args: any[]
  converter: CallType
  inputs: ethersUtils.ParamType[]
  outputs?: ethersUtils.ParamType[]
  encoding: string
}

export const oneContractOneFunctionMC = <
  customConverters extends (result: any) => any,
  ConverterType extends resultConverter<customConverters>,
  SpecificCallArgs extends {[key in string]: any[]}
>(
  contract: Contract,
  func: string,
  converter: ConverterType,
  calls: SpecificCallArgs,
) => {
  return Object.fromEntries(Object.entries(calls).map(([id, args]) => {
    if (contract.address === zeroAddress) {
      throw new Error('Multicall: oneContractOneFunctionMC called with contract with no address.')
    }

    const { inputs, outputs, encoding } = getCallMetadata(contract, func, args)

    return [id, {
      id,
      contract,
      func,
      args,
      converter,
      inputs,
      outputs,
      encoding,
    }]
  })) as {[K in keyof SpecificCallArgs]: Call<customConverters, ConverterType>}
}

export const oneContractManyFunctionMC = <
  customConverters extends (result: any) => any,
  Functions extends {[key in string]: resultConverter<customConverters>},
> (
  contract: Contract,
  funcs: Functions,
  args?: {[key in keyof Functions]?: any[]},
) => {
  return Object.fromEntries(Object.entries(funcs).map(([func, converter]) => {
    const args0 = args === undefined ? [] : args.hasOwnProperty(func) ? args[func] : [];
    const args1 = args0 === undefined ? [] : args0
    const {inputs, outputs, encoding } = getCallMetadata(contract, func, args1)

    return [func, {
      id: func,
      contract,
      func,
      args: args1,
      converter,
      inputs,
      outputs,
      encoding
    }]
  })) as {[K in keyof Functions]: Call<customConverters, Functions[K]>}
}

export const manyContractOneFunctionMC = <
  customConverters extends (result: any) => any,
  ConverterType extends resultConverter<customConverters>,
  ArgsArray extends string[],
  ArgsObject extends {[key in string]: any[]},
> (
  contract: Contract,
  inputArgs: ArgsObject | ArgsArray,
  func: string,
  converter: ConverterType,
) => {
  const args = (Array.isArray(inputArgs)
    ? Object.fromEntries(inputArgs.map(address => [address, []]))
    : inputArgs
  ) as ArgsObject

  return Object.fromEntries(Object.entries(args).map(([contractAddress, callArgs]) => {
    const id = contractAddress
    const specificContract = contract.attach(contractAddress)
    const { inputs, outputs, encoding } = getCallMetadata(specificContract, func, callArgs)

    return [id, {
      id,
      contract: specificContract,
      func,
      args: callArgs,
      converter,
      inputs,
      outputs,
      encoding,
    }]
  })) as {[K in keyof ArgsObject]: Call<customConverters, ConverterType>}
}

export const executeMulticalls = async <
  customConverters extends (result: any) => any,
  ConverterType extends resultConverter<customConverters>,
  Multicalls extends {[key in string]: {[key in string]: Call<customConverters, ConverterType>}}
>(
  tcpMulticall: TrustlessMulticallViewOnly,
  multicalls: Multicalls,
) => {
  try {
    return executeMulticallsImpl(tcpMulticall, multicalls)
  } catch (exception) {
    console.error('Caught Multicall Execution Error:')
    console.error({exception})
    throw exception
  }
}

type stringObject<valueType> = {[key in string]: valueType}

const executeMulticallsImpl = async <
  customConverters extends (result: any) => any,
  ConverterType extends Call<customConverters, resultConverter<customConverters>>,
  Multicalls extends stringObject<stringObject<ConverterType>>
>(
  tcpMulticall: TrustlessMulticallViewOnly,
  multicalls: Multicalls,
) => {
  const calls =
    Object.fromEntries(
      Object.values(
        Object.fromEntries(
          Object.entries(multicalls)
            .map(([multicallName, innerMulticall]) =>
                [
                  multicallName,
                  Object.fromEntries(Object.entries(innerMulticall).map(([innerName, innerCall]) =>
                    [[multicallName, innerName, innerCall.id].join(':'), innerCall ]
                  ))
                ]
            )
        )
      ).map(obj => Object.entries(obj)).flat()
    )

  const abiCoder = new ethersUtils.AbiCoder()

  const rawCalls = Object.values(calls).map(
    call => ({ target: call.contract.address, callData: call.encoding })
  )

  const results = Object.values(calls).length === 0
    ? {}
    : Object.fromEntries(
        (await tcpMulticall.all(rawCalls)).results.map((rawResult, index) => {

          const call = Object.values(calls)[index]

          if (!rawResult.success) {
            throw new Error('Multicall Failed: ' + JSON.stringify({call}))
          }

          const resultsArray = Object.values(abiCoder.decode(call.outputs!, rawResult.returnData))

          // TODO as needed: support more than one result
          const countResults = resultsArray.length
          if (countResults > 1) console.warn(`multicall ${call.id} (${call.func}) has ${countResults} results.`)

          return [Object.keys(calls)[index], call.converter(first(resultsArray))]
      })
    )

  return Object.fromEntries(Object.entries(multicalls).map(([multicallName, innerMulticall]) =>
    [
      multicallName,
      Object.fromEntries(Object.entries(innerMulticall).map(([innerMulticallName, innerCall]) =>
        [
          innerMulticallName,
          results[[multicallName, innerMulticallName, innerCall.id].join(':')]
        ]
      ))
    ]
  )) as {
    [Multicall in keyof Multicalls]: {
      [FunctionID in keyof Multicalls[Multicall]]: ReturnType<Multicalls[Multicall][FunctionID]['converter']>
    }
  }
}

const getFunctionFragment = (contract: Contract, func: string) => {
  const matchingFunctions = Object.values(contract.interface.functions).filter(interfaceFunction => interfaceFunction.name === func)
  enforce(matchingFunctions.length >= 1, 'Multicall: No matching functions found for ' + func)
  enforce(matchingFunctions.length <= 1, 'Multicall: Multiple matching functions found for ' + func)
  return first(matchingFunctions)
}

const getCallMetadata = (contract: Contract, func: string, args: any[]) => {
  const fragment = getFunctionFragment(contract, func)

  const stateMutability = fragment.stateMutability
  const inputs = fragment.inputs
  const outputs = fragment.outputs

  enforce(!fragment.payable, 'function ' + func + ' is payable')
  enforce(stateMutability === 'view' || stateMutability === 'pure', 'function ' + func + ' mutates state')
  enforce(
    inputs.length === args.length,
    'Incorrect args sent to function ' + func + ': ' + inputs.length + ' required, ' + args.length + ' given.')

  const encoding = contract.interface.encodeFunctionData(func, args)

  return {inputs, outputs, encoding}
}

export const idToIdAndArg = (idArgs: string[]) =>
  Object.fromEntries(idArgs.map(idArg => [idArg, [idArg]]))

export const idToIdAndNoArg = (idArgs: string[]) =>
  Object.fromEntries(idArgs.map(idArg => [idArg, []]))
