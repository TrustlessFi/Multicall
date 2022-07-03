// Copyright (c) 2020. All Rights Reserved
// SPDX-License-Identifier: UNLICENSED

import { BaseContract, ContractFunction, utils as ethersUtils, ethers } from 'ethers'
import { enforce, first, unscale, zeroAddress } from '@trustlessfi/utils'
import { TrustlessMulticallViewOnly } from './typechain/TrustlessMulticallViewOnly'

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
  contract: BaseContract
  func: string
  args: any[]
  converter: CallType
  inputs: ethersUtils.ParamType[]
  outputs?: ethersUtils.ParamType[]
  encoding: string
}

export const oneContractOneFunctionMC = <
  customConverters extends (result: any) => any,
  specificContract extends BaseContract,
  funcName extends keyof specificContract["functions"],
  SpecificCallArgs extends {[id in string]: Parameters<specificContract["functions"][funcName]>},
  ConverterType extends resultConverter<customConverters>,
>(
  contract: specificContract,
  func: funcName,
  converter: ConverterType,
  calls: SpecificCallArgs,
) => {
  return Object.fromEntries(Object.entries(calls).map(([id, args]) => {
    multicallEnforce(
      contract.address !== zeroAddress,
      'oneContractOneFunctionMC called with contract with no address.')

    const { inputs, outputs, encoding } = getCallMetadata(contract, func.toString(), args)

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
  })) as unknown as {[K in keyof SpecificCallArgs]: Call<customConverters, ConverterType>}
}

export const oneContractManyFunctionMC = <
  specificContract extends BaseContract,
  customConverters extends (result: any) => any,
  Functions extends {[funcName in keyof specificContract["functions"]]?: resultConverter<customConverters>},
> (
  contract: specificContract,
  funcs: Functions,
  args?: {[funcName in keyof Functions]?: any[]},
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
  })) as unknown as {[K in keyof Functions]: Call<customConverters, NonNullable<Functions[K]>>}
}

export const manyContractOneFunctionMC = <
  specificContract extends BaseContract,
  funcName extends keyof specificContract["functions"],
  customConverters extends (result: any) => any,
  ConverterType extends resultConverter<customConverters>,
  Args extends {[key in string]: Parameters<specificContract["functions"][funcName]>},
> (
  contract: specificContract,
  args: Args,
  func: funcName,
  converter: ConverterType,
) => {

  return Object.fromEntries(Object.entries(args).map(([contractAddress, callArgs]) => {
    const id = contractAddress
    const specificContract = contract.attach(contractAddress)
    const { inputs, outputs, encoding } = getCallMetadata(specificContract, func.toString(), callArgs)

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
  })) as unknown as {[K in keyof Args]: Call<customConverters, ConverterType>}
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

  const fetchResults = async () => {
    try {
      const rawResult = await tcpMulticall.all(rawCalls)

      return (
        Object.fromEntries(rawResult.results.map((rawResult, index) => {
          const call = Object.values(calls)[index]

          multicallEnforce(rawResult.success, `Failed: ${
            JSON.stringify({
              contract: call.contract.address,
              func: call.func,
              args: call.args,
            })
          }`)

          const resultsArray = Object.values(abiCoder.decode(call.outputs!, rawResult.returnData))

          // TODO as needed: support more than one result
          return [Object.keys(calls)[index], call.converter(first(resultsArray))]
        }))
      )
    } catch (error) {
      throw new Error(prefixMulticallMessage(JSON.stringify({error, calls})))
    }
  }

  const results = Object.values(calls).length === 0 ? {} : await fetchResults()

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

const getFunctionFragment = (contract: BaseContract, func: string) => {
  const matchingFunctions = Object.values(contract.interface.functions).filter(interfaceFunction => interfaceFunction.name === func)
  multicallEnforce(matchingFunctions.length >= 1, `No matching functions found for ${func}`)
  multicallEnforce(matchingFunctions.length <= 1, `Multiple matching functions found for ${func}`)
  return first(matchingFunctions)
}

const getCallMetadata = (contract: BaseContract, func: string, args: any[]) => {
  const fragment = getFunctionFragment(contract, func)

  const stateMutability = fragment.stateMutability
  const inputs = fragment.inputs
  const outputs = fragment.outputs

  multicallEnforce(!fragment.payable, `Function ${func} is payable`)
  multicallEnforce(stateMutability === 'view' || stateMutability === 'pure', `Function ${func} mutates state`)
  multicallEnforce(
    inputs.length === args.length,
    `Incorrect args sent to function ${func}: ${inputs.length} required, ${args.length} given.`)

  const encoding = contract.interface.encodeFunctionData(func, args)

  return {inputs, outputs, encoding}
}

const prefixMulticallMessage = (message: string) => `[Multicall]: ${message}`

const multicallEnforce = (conditional: boolean, errorMessage: string) =>
  enforce(conditional, prefixMulticallMessage(errorMessage))

export const idsToIds = (ids: string[]) =>
  Object.fromEntries(ids.map(id => [id, [id] as [string]]))

export const idsToArg = <argsType extends unknown>(idArgs: string[], args: argsType) =>
  Object.fromEntries(idArgs.map(idArg => [idArg, args]))

export const idsToNoArg = (ids: string[]) =>
  Object.fromEntries(ids.map(id => [id, [] as []]))
