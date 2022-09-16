// Copyright (c) 2020. All Rights Reserved
// SPDX-License-Identifier: UNLICENSED

import { BaseContract, ContractFunction, utils as ethersUtils, BigNumberish } from 'ethers'
import { enforce, first, zeroAddress, PromiseType } from '@trustlessfi/utils'
import { TrustlessMulticallViewOnly } from './types/TrustlessMulticallViewOnly'
import { Fragment, FunctionFragment } from 'ethers/lib/utils'

enum MulticallInteractionType {
  View = 'View',
  WriteTransaction = 'WriteTransaction',
}

interface Call<specificFunction extends ContractFunction> {
  id: string
  contract: BaseContract
  func: specificFunction
  args: any[]
  fragment: FunctionFragment,
  encoding: string
}

interface ArgumentsAndValue<parameters> {
  args: parameters, 
  value: BigNumberish
}

type argsOrArgsAndValue<parameters> = parameters | ArgumentsAndValue<parameters>

const isArgumentsAndValue = <T>(rawArgs: ArgumentsAndValue<T> | any): rawArgs is ArgumentsAndValue<T> => 
  (rawArgs as ArgumentsAndValue<T>).value !== undefined

export const oneContractOneFunctionMC = <
  specificContract extends BaseContract,
  funcName extends keyof specificContract["functions"],
  SpecificCallArgs extends {[id in string]: argsOrArgsAndValue<Parameters<specificContract["functions"][funcName]>>},
>(
  contract: specificContract,
  funcName: funcName,
  calls: SpecificCallArgs,
) => {
  return Object.fromEntries(Object.entries(calls).map(([id, args]) => {
    multicallEnforce(
      contract.address !== zeroAddress,
      'oneContractOneFunctionMC called with contract with no address.')

    const { fragment, encoding } = getCallMetadata(contract, funcName.toString(), args)

    return [id, {
      id,
      contract,
      func: contract.functions[funcName.toString()],
      args,
      fragment,
      encoding,
    } as any]
  })) as {[K in keyof SpecificCallArgs]: Call<specificContract["functions"][funcName]>}
}

export const oneContractManyFunctionMC = <
  specificContract extends BaseContract,
  contractFunctions extends specificContract["functions"],
  functionName extends keyof contractFunctions,
  specificFunctions extends Pick<contractFunctions, functionName>,
> (
  contract: specificContract,
  funcs: {[funcName in functionName]: argsOrArgsAndValue<Parameters<specificFunctions[funcName]>>}
) => {
  return Object.fromEntries(Object.entries(funcs).map(([funcName, args]) => {
    const { fragment, encoding } = getCallMetadata(contract, funcName, args as argsOrArgsAndValue<unknown[]>)

    return [funcName, {
      id: funcName,
      contract,
      func: contract.functions[funcName],
      args,
      fragment,
      encoding
    } as any]
  })) as {[funcName in keyof specificFunctions]: Call<specificFunctions[funcName]>}
}

export const manyContractOneFunctionMC = <
  specificContract extends BaseContract,
  funcName extends keyof specificContract["functions"],
  specificFunction extends specificContract["functions"][funcName],
  Args extends {[key in string]: argsOrArgsAndValue<Parameters<specificFunction>>},
> (
  contract: specificContract,
  funcName: funcName,
  args: Args,
) => {
  return Object.fromEntries(Object.entries(args).map(([contractAddress, callArgs]) => {
    const id = contractAddress
    const specificContract = contract.attach(contractAddress)
    const { fragment, encoding } = getCallMetadata(specificContract, funcName.toString(), callArgs)

    return [id, {
      id,
      contract: specificContract,
      func: specificContract.functions[funcName.toString()],
      args: callArgs,
      fragment,
      encoding,
    } as unknown]
  })) as {[K in keyof Args]: Call<specificFunction>}
}

export const executeMulticalls = async <
  Multicalls extends {[key in string]: {[key in string]: Call<ContractFunction<unknown>>}}
>(
  tcpMulticall: TrustlessMulticallViewOnly,
  multicalls: Multicalls,
  interactionType: MulticallInteractionType = MulticallInteractionType.View
) => {
  try {
    return executeMulticallsImpl(tcpMulticall, multicalls, interactionType)
  } catch (multicallExcepetion) {
    console.error({multicallExcepetion})
    throw multicallExcepetion
  }
}

type stringObject<valueType> = {[key in string]: valueType}

const executeMulticallsImpl = async <
  Multicalls extends stringObject<stringObject<Call<ContractFunction<unknown>>>>,
>(
  tcpMulticall: TrustlessMulticallViewOnly,
  multicalls: Multicalls,
  interactionType: MulticallInteractionType,
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
  
  Object.values(calls).map(call => {
    checkCallMetadata(call.fragment, interactionType)
  })

  const abiCoder = new ethersUtils.AbiCoder()

  const rawCalls = Object.values(calls).map(
    call => ({ target: call.contract.address, callData: call.encoding })
  )

  const fetchResults = async () => {
    try {
      const rawResult = await tcpMulticall.multicallNoRevertOnError(rawCalls)

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

          const resultsArray = Object.values(abiCoder.decode(call.fragment.outputs!, rawResult.returnData))

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
      [FunctionID in keyof Multicalls[Multicall]]:
        PromiseType<ReturnType<Multicalls[Multicall][FunctionID]['func']>> extends Array<unknown>
        ? PromiseType<ReturnType<Multicalls[Multicall][FunctionID]['func']>>[0]
        : PromiseType<ReturnType<Multicalls[Multicall][FunctionID]['func']>>
    }
  }
}

const checkCallMetadata = (fragment: FunctionFragment, interactionType: MulticallInteractionType) => {
  const stateMutability = fragment.stateMutability
  if (interactionType === MulticallInteractionType.View) {
    multicallEnforce(!fragment.payable, `Function ${fragment.name} is payable.`)
    multicallEnforce(stateMutability === 'view' || stateMutability === 'pure', `Function ${fragment.name} updates state.`)
  } else {
    multicallEnforce(stateMutability !== 'view' && stateMutability !== 'pure', `Function ${fragment.name} does not update state.`)
  }
}

const getCallMetadata = <T extends Parameters<any>>(
  contract: BaseContract, 
  func: string, 
  rawArgs: argsOrArgsAndValue<T>
) => {
  const args =
    isArgumentsAndValue(rawArgs)
      ? rawArgs.args as T
      : rawArgs

  const fragment = getFunctionFragment(contract, func)

  multicallEnforce(
    fragment.inputs.length === args.length,
    `Incorrect args sent to function ${func}: ${fragment.inputs.length} required, ${args.length} given.`)

  const encoding = contract.interface.encodeFunctionData(func, args)

  return {fragment, encoding}
}

const getFunctionFragment = (contract: BaseContract, func: string) => {
  const matchingFunctions = Object.values(contract.interface.functions).filter(interfaceFunction => interfaceFunction.name === func)
  multicallEnforce(matchingFunctions.length >= 1, `No matching functions found for ${func}`)
  multicallEnforce(matchingFunctions.length <= 1, `Multiple matching functions found for ${func}`)
  return first(matchingFunctions)
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
