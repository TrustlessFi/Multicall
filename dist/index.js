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
import { enforce, first, zeroAddress } from '@trustlessfi/utils';
export const oneContractOneFunctionMC = (contract, funcName, calls) => {
    return Object.fromEntries(Object.entries(calls).map(([id, args]) => {
        multicallEnforce(contract.address !== zeroAddress, 'oneContractOneFunctionMC called with contract with no address.');
        const { inputs, outputs, encoding } = getCallMetadata(contract, funcName.toString(), args);
        return [id, {
                id,
                contract,
                func: contract.functions[funcName.toString()],
                args,
                inputs,
                outputs,
                encoding,
            }];
    }));
};
export const oneContractManyFunctionMC = (contract, funcs) => {
    return Object.fromEntries(Object.entries(funcs).map(([funcName, args]) => {
        const { inputs, outputs, encoding } = getCallMetadata(contract, funcName, args);
        return [funcName, {
                id: funcName,
                contract,
                func: contract.functions[funcName],
                args,
                inputs,
                outputs,
                encoding
            }];
    }));
};
export const manyContractOneFunctionMC = (contract, funcName, args) => {
    return Object.fromEntries(Object.entries(args).map(([contractAddress, callArgs]) => {
        const id = contractAddress;
        const specificContract = contract.attach(contractAddress);
        const { inputs, outputs, encoding } = getCallMetadata(specificContract, funcName.toString(), callArgs);
        return [id, {
                id,
                contract: specificContract,
                func: specificContract.functions[funcName.toString()],
                args: callArgs,
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
    const fetchResults = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const rawResult = yield tcpMulticall.all(rawCalls);
            return (Object.fromEntries(rawResult.results.map((rawResult, index) => {
                const call = Object.values(calls)[index];
                multicallEnforce(rawResult.success, `Failed: ${JSON.stringify({
                    contract: call.contract.address,
                    func: call.func,
                    args: call.args,
                })}`);
                const resultsArray = Object.values(abiCoder.decode(call.outputs, rawResult.returnData));
                // TODO as needed: support more than one result
                return [Object.keys(calls)[index], first(resultsArray)];
            })));
        }
        catch (error) {
            throw new Error(prefixMulticallMessage(JSON.stringify({ error, calls })));
        }
    });
    const results = Object.values(calls).length === 0 ? {} : yield fetchResults();
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
    multicallEnforce(matchingFunctions.length >= 1, `No matching functions found for ${func}`);
    multicallEnforce(matchingFunctions.length <= 1, `Multiple matching functions found for ${func}`);
    return first(matchingFunctions);
};
const getCallMetadata = (contract, func, args) => {
    const fragment = getFunctionFragment(contract, func);
    const stateMutability = fragment.stateMutability;
    const inputs = fragment.inputs;
    const outputs = fragment.outputs;
    multicallEnforce(!fragment.payable, `Function ${func} is payable`);
    multicallEnforce(stateMutability === 'view' || stateMutability === 'pure', `Function ${func} mutates state`);
    multicallEnforce(inputs.length === args.length, `Incorrect args sent to function ${func}: ${inputs.length} required, ${args.length} given.`);
    const encoding = contract.interface.encodeFunctionData(func, args);
    return { inputs, outputs, encoding };
};
const prefixMulticallMessage = (message) => `[Multicall]: ${message}`;
const multicallEnforce = (conditional, errorMessage) => enforce(conditional, prefixMulticallMessage(errorMessage));
export const idsToIds = (ids) => Object.fromEntries(ids.map(id => [id, [id]]));
export const idsToArg = (idArgs, args) => Object.fromEntries(idArgs.map(idArg => [idArg, args]));
export const idsToNoArg = (ids) => Object.fromEntries(ids.map(id => [id, []]));
