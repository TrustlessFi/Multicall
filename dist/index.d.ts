import { BaseContract, ContractFunction, BigNumberish } from 'ethers';
import { PromiseType } from '@trustlessfi/utils';
import { TrustlessMulticall } from './types';
import { FunctionFragment } from 'ethers/lib/utils';
interface Call<specificFunction extends ContractFunction> {
    id: string;
    contract: BaseContract;
    func: specificFunction;
    args: any[];
    value: BigNumberish;
    fragment: FunctionFragment;
    encoding: string;
}
interface ArgumentsAndValue<parameters> {
    args: parameters;
    value: BigNumberish;
}
declare type argsOrArgsAndValue<parameters> = parameters | ArgumentsAndValue<parameters>;
export declare const oneContractOneFunctionMC: <specificContract extends BaseContract, funcName extends keyof specificContract["functions"], SpecificCallArgs extends {
    [x: string]: argsOrArgsAndValue<Parameters<specificContract["functions"][funcName]>>;
}>(contract: specificContract, funcName: funcName, calls: SpecificCallArgs) => { [K in keyof SpecificCallArgs]: Call<specificContract["functions"][funcName]>; };
export declare const oneContractManyFunctionMC: <specificContract extends BaseContract, contractFunctions extends specificContract["functions"], functionName extends keyof contractFunctions, specificFunctions extends Pick<contractFunctions, functionName>>(contract: specificContract, funcs: { [funcName in functionName]: argsOrArgsAndValue<Parameters<specificFunctions[funcName]>>; }) => { [funcName_1 in keyof specificFunctions]: Call<specificFunctions[funcName_1]>; };
export declare const manyContractOneFunctionMC: <specificContract extends BaseContract, funcName extends keyof specificContract["functions"], specificFunction extends specificContract["functions"][funcName], Args extends {
    [x: string]: argsOrArgsAndValue<Parameters<specificFunction>>;
}>(contract: specificContract, funcName: funcName, args: Args) => { [K in keyof Args]: Call<specificFunction>; };
export declare const executeMulticalls: <Multicalls_1 extends {
    [x: string]: {
        [x: string]: Call<ContractFunction<unknown>>;
    };
}>(tcpMulticall: TrustlessMulticall, multicalls: Multicalls_1) => Promise<{ [Multicall in keyof Multicalls_1]: Multicalls_1[Multicall] extends infer T ? { [FunctionID in keyof T]: PromiseType<ReturnType<Multicalls_1[Multicall][FunctionID]["func"]>> extends unknown[] ? (unknown[] & PromiseType<ReturnType<Multicalls_1[Multicall][FunctionID]["func"]>>)[0] : PromiseType<ReturnType<Multicalls_1[Multicall][FunctionID]["func"]>>; } : never; }>;
export declare const executeWriteMulticalls: <Multicalls_1 extends {
    [x: string]: {
        [x: string]: Call<ContractFunction<unknown>>;
    };
}>(tcpMulticall: TrustlessMulticall, multicalls: Multicalls_1) => Promise<import("ethers").ContractTransaction>;
export declare const idsToIds: (ids: string[]) => {
    [k: string]: [string];
};
export declare const idsToArg: <argsType extends unknown>(idArgs: string[], args: argsType) => {
    [k: string]: argsType;
};
export declare const idsToNoArg: (ids: string[]) => {
    [k: string]: [];
};
export {};
