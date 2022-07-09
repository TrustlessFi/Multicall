// Copyright (c) 2020. All Rights Reserved
// SPDX-License-Identifier: UNLICENSED

import { BaseContract, ContractFunction, utils as ethersUtils } from 'ethers'
import { enforce, first, zeroAddress, PromiseType } from '@trustlessfi/utils'
import { TrustlessMulticallViewOnly } from './typechain/TrustlessMulticallViewOnly'

interface Call {
  id: string
  contract: BaseContract
  func: ContractFunction
  args: any[]
  inputs: ethersUtils.ParamType[]
  outputs?: ethersUtils.ParamType[]
  encoding: string
}

export const oneContractOneFunctionMC = <
  specificContract extends BaseContract,
  funcName extends keyof specificContract["functions"],
  SpecificCallArgs extends {[id in string]: Parameters<specificContract["functions"][funcName]>},
>(
  contract: specificContract,
  funcName: funcName,
  calls: SpecificCallArgs,
) => {
  return Object.fromEntries(Object.entries(calls).map(([id, args]) => {
    multicallEnforce(
      contract.address !== zeroAddress,
      'oneContractOneFunctionMC called with contract with no address.')

    const { inputs, outputs, encoding } = getCallMetadata(contract, funcName.toString(), args)

    return [id, {
      id,
      contract,
      func: contract.functions[funcName.toString()],
      args,
      inputs,
      outputs,
      encoding,
    } as Call]
  })) as {[K in keyof SpecificCallArgs]: Call}
}

export const oneContractManyFunctionMC = <
  specificContract extends BaseContract,
  Functions extends {[funcName in keyof specificContract["functions"]]?: Parameters<specificContract["functions"][funcName]>},
> (
  contract: specificContract,
  funcs: Functions,
) => {
  return Object.fromEntries(Object.entries(funcs).map(([funcName, args]) => {
    const {inputs, outputs, encoding } = getCallMetadata(contract, funcName, args!)

    return [funcName, {
      id: funcName,
      contract,
      func: contract.functions[funcName],
      args,
      inputs,
      outputs,
      encoding
    } as Call]
  })) as {[K in keyof Functions]: Call}
}

export const manyContractOneFunctionMC = <
  specificContract extends BaseContract,
  funcName extends keyof specificContract["functions"],
  params extends Parameters<specificContract["functions"][funcName]>,
  Args extends {[key in string]: params},
> (
  contract: specificContract,
  funcName: funcName,
  args: Args,
) => {
  return Object.fromEntries(Object.entries(args).map(([contractAddress, callArgs]) => {
    const id = contractAddress
    const specificContract = contract.attach(contractAddress)
    const { inputs, outputs, encoding } = getCallMetadata(specificContract, funcName.toString(), callArgs)

    return [id, {
      id,
      contract: specificContract,
      func: specificContract.functions[funcName.toString()],
      args: callArgs,
      inputs,
      outputs,
      encoding,
    } as Call]
  })) as {[K in keyof Args]: Call}
}

export const executeMulticalls = async <
  Multicalls extends {[key in string]: {[key in string]: Call}}
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
  Multicalls extends stringObject<stringObject<Call>>
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
          return [Object.keys(calls)[index], first(resultsArray)]
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
      [FunctionID in keyof Multicalls[Multicall]]: PromiseType<ReturnType<Multicalls[Multicall][FunctionID]['func']>>
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
