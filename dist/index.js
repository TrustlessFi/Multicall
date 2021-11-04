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
import { enforce, first, unscale } from '@trustlessfi/utils';
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
export const getMulticall = (contract, funcs, args) => {
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
export const getDuplicateFuncMulticall = (contract, func, converter, calls) => {
    return Object.fromEntries(Object.entries(calls).map(([id, args]) => {
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
export const contractFunctionSelector = (address, func) => address + ':' + func;
export const selectorToContractFunction = (selector) => {
    const parts = selector.split(':');
    enforce(parts.length === 2, 'invalid contract function selector');
    return { address: parts[0], func: parts[1] };
};
// TODO deprecate in favor of duplicate contracts and args below
export const getDuplicateContractMulticall = (contractObject, contractFunctionSelectors, args) => {
    return Object.fromEntries(Object.entries(contractFunctionSelectors).map(([selector, converter]) => {
        const id = selector;
        const { address, func } = selectorToContractFunction(selector);
        const contract = contractObject.attach(address);
        const args0 = args === undefined ? [] : args.hasOwnProperty(selector) ? args[selector] : [];
        const args1 = args0 === undefined ? [] : args0;
        const { inputs, outputs, encoding } = getCallMetadata(contract, func, args1);
        return [id, {
                id,
                contract,
                func,
                args: args1,
                converter,
                inputs,
                outputs,
                encoding,
            }];
    }));
};
export const getFullSelector = (contract, address, func, args) => {
    const abiCoder = new ethersUtils.AbiCoder();
    const fragment = getFunctionFragment(contract, func);
    const inputs = fragment.inputs;
    enforce(inputs.length === args.length, 'getFullSelector: inputs dont match args.');
    const encodedArgs = abiCoder.encode(inputs, args);
    return [address, func, encodedArgs].join(':');
};
const getDecodedArgs = (inputs, decodedResult) => inputs.map(input => decodedResult[input.name]);
export const decodeFullSelector = (selector, contract) => {
    const parts = selector.split(':');
    enforce(parts.length === 3, 'decodeFullSelector: invalid contract function args selector');
    const address = parts[0];
    const func = parts[1];
    const encodedArgs = parts[2];
    const fragment = getFunctionFragment(contract, func);
    const inputs = fragment.inputs;
    const decodedResult = (new ethersUtils.AbiCoder()).decode(inputs, encodedArgs);
    const args = getDecodedArgs(inputs, decodedResult);
    contract = contract.attach(address);
    return { contract, func, args };
};
export const getCustomMulticall = (contractObject, selectors) => {
    return Object.fromEntries(Object.entries(selectors).map(([id, converter]) => {
        const { contract, func, args } = decodeFullSelector(id, contractObject);
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
export const executeMulticall = (tcpMulticall, contract, funcs, args) => __awaiter(void 0, void 0, void 0, function* () {
    const multicall = getMulticall(contract, funcs, args);
    return (yield executeMulticalls(tcpMulticall, { aMulticall: multicall })).aMulticall;
});
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
    const calls = Object.values(multicalls).map(multicall => Object.values(multicall)).flat();
    const rawResults = yield tcpMulticall.all(calls.map(call => ({ target: call.contract.address, callData: call.encoding })));
    const abiCoder = new ethersUtils.AbiCoder();
    const results = Object.fromEntries(rawResults.returnData.map((rawResult, index) => {
        const call = calls[index];
        const resultsArray = Object.values(abiCoder.decode(call.outputs, rawResult));
        // TODO as needed: support more than one result
        const countResults = resultsArray.length;
        if (countResults > 1)
            console.warn('multicall ' + call.id + ' (' + call.func + ') has ' + countResults + ' results');
        return [call.id, call.converter(first(resultsArray))];
    }));
    return Object.fromEntries(Object.entries(multicalls).map(([multicallName, functions]) => [
        multicallName,
        Object.fromEntries(Object.keys(functions).map(id => [
            id,
            results[id]
        ]))
    ]));
});
const getFunctionFragment = (contract, func) => {
    const matchingFunctions = Object.values(contract.interface.functions).filter(interfaceFunction => interfaceFunction.name === func);
    enforce(matchingFunctions.length >= 1, 'No matching functions found for ' + func);
    enforce(matchingFunctions.length <= 1, 'Multiple matching functions found for ' + func);
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
