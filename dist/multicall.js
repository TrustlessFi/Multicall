"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.idsToNoArg = exports.idsToArg = exports.idsToIds = exports.executeWriteMulticalls = exports.executeMulticalls = exports.manyContractOneFunctionMC = exports.oneContractManyFunctionMC = exports.oneContractOneFunctionMC = void 0;
const ethers_1 = require("ethers");
const utils_1 = require("./utils");
const bnf = (bn) => ethers_1.BigNumber.from(bn);
const isArgumentsAndValue = (rawArgs) => rawArgs.value !== undefined;
const oneContractOneFunctionMC = (contract, funcName, calls) => {
    return Object.fromEntries(Object.entries(calls).map(([id, args]) => {
        multicallEnforce(contract.address !== utils_1.zeroAddress, 'oneContractOneFunctionMC called with contract with no address.');
        const { fragment, encoding, value } = getCallMetadata(contract, funcName.toString(), args);
        return [id, {
                id,
                contract,
                func: contract.functions[funcName.toString()],
                args,
                value,
                fragment,
                encoding,
            }];
    }));
};
exports.oneContractOneFunctionMC = oneContractOneFunctionMC;
const oneContractManyFunctionMC = (contract, funcs) => {
    return Object.fromEntries(Object.entries(funcs).map(([funcName, args]) => {
        const { fragment, encoding, value } = getCallMetadata(contract, funcName, args);
        return [funcName, {
                id: funcName,
                contract,
                func: contract.functions[funcName],
                args,
                fragment,
                encoding,
                value,
            }];
    }));
};
exports.oneContractManyFunctionMC = oneContractManyFunctionMC;
const manyContractOneFunctionMC = (contract, funcName, args) => {
    return Object.fromEntries(Object.entries(args).map(([contractAddress, callArgs]) => {
        const id = contractAddress;
        const specificContract = contract.attach(contractAddress);
        const { fragment, encoding, value } = getCallMetadata(specificContract, funcName.toString(), callArgs);
        return [id, {
                id,
                contract: specificContract,
                func: specificContract.functions[funcName.toString()],
                args: callArgs,
                fragment,
                encoding,
                value,
            }];
    }));
};
exports.manyContractOneFunctionMC = manyContractOneFunctionMC;
const executeMulticalls = (tcpMulticall, multicalls) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return executeMulticallsImpl(tcpMulticall, multicalls);
    }
    catch (multicallExcepetion) {
        console.error({ multicallExcepetion });
        throw multicallExcepetion;
    }
});
exports.executeMulticalls = executeMulticalls;
const executeWriteMulticalls = (tcpMulticall, multicalls, revertOnCallFailure) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return executeWriteMulticallsImpl(tcpMulticall, multicalls, revertOnCallFailure);
    }
    catch (multicallException) {
        console.error({ multicallException });
        throw multicallException;
    }
});
exports.executeWriteMulticalls = executeWriteMulticalls;
const extractCallList = (multicalls) => {
    return (Object.fromEntries(Object.values(Object.fromEntries(Object.entries(multicalls)
        .map(([multicallName, innerMulticall]) => [
        multicallName,
        Object.fromEntries(Object.entries(innerMulticall).map(([innerName, innerCall]) => [[multicallName, innerName, innerCall.id].join(':'), innerCall]))
    ]))).map(obj => Object.entries(obj)).flat()));
};
const executeWriteMulticallsImpl = (tcpMulticall, multicalls, revertOnCallFailure) => __awaiter(void 0, void 0, void 0, function* () {
    const calls = extractCallList(multicalls);
    Object.values(calls).map(call => {
        const stateMutability = call.fragment.stateMutability;
        multicallEnforce(stateMutability !== 'view' && stateMutability !== 'pure', `Function ${call.fragment.name} does not update state.`);
        if (bnf(call.value).gt(0)) {
            multicallEnforce(call.fragment.payable, `Function ${call.fragment.name} is not payable, but value of ${bnf(call.value).toString()} was sent.`);
        }
    });
    return yield tcpMulticall.write(Object.values(calls).map(call => ({ target: call.contract.address, callData: call.encoding, value: call.value })), revertOnCallFailure, { value: Object.values(calls).map(call => call.value).reduce((a, b) => bnf(a).add(bnf(b))) });
});
const executeMulticallsImpl = (tcpMulticall, multicalls) => __awaiter(void 0, void 0, void 0, function* () {
    const calls = extractCallList(multicalls);
    Object.values(calls).map(call => {
        const stateMutability = call.fragment.stateMutability;
        multicallEnforce(!call.fragment.payable, `Function ${call.fragment.name} is payable.`);
        multicallEnforce(stateMutability === 'view' || stateMutability === 'pure', `Function ${call.fragment.name} updates state.`);
    });
    const abiCoder = new ethers_1.utils.AbiCoder();
    const fetchResults = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const rawResult = yield tcpMulticall.read(Object.values(calls).map(call => ({ target: call.contract.address, callData: call.encoding })));
            return (Object.fromEntries(rawResult.results.map((rawResult, index) => {
                const call = Object.values(calls)[index];
                multicallEnforce(rawResult.success, `Failed: ${JSON.stringify({
                    contract: call.contract.address,
                    func: call.func,
                    args: call.args,
                })}`);
                const resultsArray = abiCoder.decode(call.fragment.outputs, rawResult.returnData);
                // TODO as needed: support more than one result
                return [Object.keys(calls)[index], resultsArray.length === 1 ? resultsArray[0] : resultsArray];
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
const getCallMetadata = (contract, func, rawArgs) => {
    const args = isArgumentsAndValue(rawArgs)
        ? rawArgs.args
        : rawArgs;
    const value = isArgumentsAndValue(rawArgs) ? rawArgs.value : 0;
    const fragment = getFunctionFragment(contract, func);
    multicallEnforce(fragment.inputs.length === args.length, `Incorrect args sent to function ${func}: ${fragment.inputs.length} required, ${args.length} given.`);
    const encoding = contract.interface.encodeFunctionData(func, args);
    return { fragment, encoding, value };
};
const getFunctionFragment = (contract, func) => {
    const matchingFunctions = Object.values(contract.interface.functions).filter(interfaceFunction => interfaceFunction.name === func);
    multicallEnforce(matchingFunctions.length >= 1, `No matching functions found for ${func}`);
    multicallEnforce(matchingFunctions.length <= 1, `Multiple matching functions found for ${func}`);
    return (0, utils_1.first)(matchingFunctions);
};
const prefixMulticallMessage = (message) => `[Multicall]: ${message}`;
const multicallEnforce = (conditional, errorMessage) => (0, utils_1.enforce)(conditional, prefixMulticallMessage(errorMessage));
const idsToIds = (ids) => Object.fromEntries(ids.map(id => [id, [id]]));
exports.idsToIds = idsToIds;
const idsToArg = (idArgs, args) => Object.fromEntries(idArgs.map(idArg => [idArg, args]));
exports.idsToArg = idsToArg;
const idsToNoArg = (ids) => Object.fromEntries(ids.map(id => [id, []]));
exports.idsToNoArg = idsToNoArg;
