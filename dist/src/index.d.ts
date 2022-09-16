import { BaseContract, ContractFunction, BigNumberish } from 'ethers';
import { PromiseType } from '@trustlessfi/utils';
import { TrustlessMulticallViewOnly } from './types/TrustlessMulticallViewOnly';
import { FunctionFragment } from 'ethers/lib/utils';
declare enum MulticallInteractionType {
    View = "View",
    WriteTransaction = "WriteTransaction"
}
interface Call<specificFunction extends ContractFunction> {
    id: string;
    contract: BaseContract;
    func: specificFunction;
    args: any[];
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
export declare const executeMulticalls: <Multicalls extends {
    [x: string]: {
        [x: string]: Call<ContractFunction<unknown>>;
    };
}>(tcpMulticall: TrustlessMulticallViewOnly, multicalls: Multicalls, interactionType?: MulticallInteractionType) => Promise<{ [Multicall in keyof Multicalls]: Multicalls[Multicall] extends infer T ? { [FunctionID in keyof T]: PromiseType<ReturnType<Multicalls[Multicall][FunctionID]["func"]>> extends unknown[] ? (unknown[] & PromiseType<ReturnType<Multicalls[Multicall][FunctionID]["func"]>>)[0] : PromiseType<ReturnType<Multicalls[Multicall][FunctionID]["func"]>>; } : never; }>;
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
