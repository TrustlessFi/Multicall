// Copyright (c) 2020. All Rights Reserved
// SPDX-License-Identifier: UNLICENSED
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { utils as ethersUtils } from 'ethers';
import { enforce, first, unscale, zeroAddress } from '@trustlessfi/utils';
export const rc = {
    Number: (result) => result,
    Boolean: (result) => result,
    Address: (result) => result,
    String: (result) => result,
    StringArray: (result) => result,
    BigNumber: (result) => result,
    BigNumberToNumber: (result) => result.toNumber(),
    BigNumberToString: (result) => result.toString(),
    BigNumberUnscale: (result) => unscale(result),
};
export const rcDecimals = (decimals) => (result) => unscale(result, decimals);
export const oneContractOneFunctionMC = (contract, func, converter, calls) => {
    return Object.fromEntries(Object.entries(calls).map(([id, args]) => {
        if (contract.address === zeroAddress) {
            throw new Error('Multicall: oneContractOneFunctionMC called with contract with no address.');
        }
        const { inputs, outputs, encoding } = getCallMetadata(contract, func, args);
        return [id, {
                id,
                contract,
                func,
                args,
                converter,
                inputs,
                outputs,
                encoding,
            }];
    }));
};
export const oneContractManyFunctionMC = (contract, funcs, args) => {
    return Object.fromEntries(Object.entries(funcs).map(([func, converter]) => {
        const args0 = args === undefined ? [] : args.hasOwnProperty(func) ? args[func] : [];
        const args1 = args0 === undefined ? [] : args0;
        const { inputs, outputs, encoding } = getCallMetadata(contract, func, args1);
        return [func, {
                id: func,
                contract,
                func,
                args: args1,
                converter,
                inputs,
                outputs,
                encoding
            }];
    }));
};
export const manyContractOneFunctionMC = (contract, inputArgs, func, converter) => {
    const args = (Array.isArray(inputArgs)
        ? Object.fromEntries(inputArgs.map(address => [address, []]))
        : inputArgs);
    return Object.fromEntries(Object.entries(args).map(([contractAddress, callArgs]) => {
        const id = contractAddress;
        const specificContract = contract.attach(contractAddress);
        const { inputs, outputs, encoding } = getCallMetadata(specificContract, func, callArgs);
        return [id, {
                id,
                contract: specificContract,
                func,
                args: callArgs,
                converter,
                inputs,
                outputs,
                encoding,
            }];
    }));
};
export const executeMulticalls = (tcpMulticall, multicalls) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return executeMulticallsImpl(tcpMulticall, multicalls);
    }
    catch (exception) {
        console.error('Caught Multicall Execution Error:');
        console.error({ exception });
        throw exception;
    }
});
const executeMulticallsImpl = (tcpMulticall, multicalls) => __awaiter(void 0, void 0, void 0, function* () {
    const calls = Object.fromEntries(Object.values(Object.fromEntries(Object.entries(multicalls)
        .map(([multicallName, innerMulticall]) => [
        multicallName,
        Object.fromEntries(Object.entries(innerMulticall).map(([innerName, innerCall]) => [[multicallName, innerName, innerCall.id].join(':'), innerCall]))
    ]))).map(obj => Object.entries(obj)).flat());
    const abiCoder = new ethersUtils.AbiCoder();
    const rawCalls = Object.values(calls).map(call => ({ target: call.contract.address, callData: call.encoding }));
    const results = Object.values(calls).length === 0
        ? {}
        : Object.fromEntries((yield tcpMulticall.all(rawCalls)).results.map((rawResult, index) => {
            const call = Object.values(calls)[index];
            if (!rawResult.success) {
                throw new Error('Multicall Failed: ' + JSON.stringify({
                    contract: call.contract.address,
                    func: call.func,
                    args: call.args,
                }));
            }
            const resultsArray = Object.values(abiCoder.decode(call.outputs, rawResult.returnData));
            // TODO as needed: support more than one result
            const countResults = resultsArray.length;
            if (countResults > 1)
                console.warn(`multicall ${call.id} (${call.func}) has ${countResults} results.`);
            return [Object.keys(calls)[index], call.converter(first(resultsArray))];
        }));
    return Object.fromEntries(Object.entries(multicalls).map(([multicallName, innerMulticall]) => [
        multicallName,
        Object.fromEntries(Object.entries(innerMulticall).map(([innerMulticallName, innerCall]) => [
            innerMulticallName,
            results[[multicallName, innerMulticallName, innerCall.id].join(':')]
        ]))
    ]));
});
const getFunctionFragment = (contract, func) => {
    const matchingFunctions = Object.values(contract.interface.functions).filter(interfaceFunction => interfaceFunction.name === func);
    enforce(matchingFunctions.length >= 1, 'Multicall: No matching functions found for ' + func);
    enforce(matchingFunctions.length <= 1, 'Multicall: Multiple matching functions found for ' + func);
    return first(matchingFunctions);
};
const getCallMetadata = (contract, func, args) => {
    const fragment = getFunctionFragment(contract, func);
    const stateMutability = fragment.stateMutability;
    const inputs = fragment.inputs;
    const outputs = fragment.outputs;
    enforce(!fragment.payable, 'function ' + func + ' is payable');
    enforce(stateMutability === 'view' || stateMutability === 'pure', 'function ' + func + ' mutates state');
    enforce(inputs.length === args.length, 'Incorrect args sent to function ' + func + ': ' + inputs.length + ' required, ' + args.length + ' given.');
    const encoding = contract.interface.encodeFunctionData(func, args);
    return { inputs, outputs, encoding };
};
export const idToIdAndArg = (idArgs) => Object.fromEntries(idArgs.map(idArg => [idArg, [idArg]]));
export const idToIdAndNoArg = (idArgs) => Object.fromEntries(idArgs.map(idArg => [idArg, []]));
