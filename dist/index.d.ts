import { BaseContract, ContractFunction, utils as ethersUtils } from 'ethers';
import { PromiseType } from '@trustlessfi/utils';
import { TrustlessMulticallViewOnly } from './typechain/TrustlessMulticallViewOnly';
interface Call<specificFunction extends ContractFunction> {
    id: string;
    contract: BaseContract;
    func: specificFunction;
    args: any[];
    inputs: ethersUtils.ParamType[];
    outputs?: ethersUtils.ParamType[];
    encoding: string;
}
export declare const oneContractOneFunctionMC: <specificContract extends BaseContract, funcName extends keyof specificContract["functions"], SpecificCallArgs extends {
    [x: string]: Parameters<specificContract["functions"][funcName]>;
}>(contract: specificContract, funcName: funcName, calls: SpecificCallArgs) => { [K in keyof SpecificCallArgs]: Call<specificContract["functions"][funcName]>; };
export declare const oneContractManyFunctionMC: <specificContract extends BaseContract, contractFunctions extends specificContract["functions"], functionName extends keyof contractFunctions, specificFunctions extends Pick<contractFunctions, functionName>>(contract: specificContract, funcs: { [funcName in functionName]: Parameters<specificFunctions[funcName]>; }) => { [funcName_1 in keyof specificFunctions]: Call<specificFunctions[funcName_1]>; };
export declare const manyContractOneFunctionMC: <specificContract extends BaseContract, funcName extends keyof specificContract["functions"], specificFunction extends specificContract["functions"][funcName], Args extends {
    [x: string]: Parameters<specificFunction>;
}>(contract: specificContract, funcName: funcName, args: Args) => { [K in keyof Args]: Call<specificFunction>; };
export declare const executeMulticalls: <Multicalls extends {
    [x: string]: {
        [x: string]: Call<ContractFunction<unknown>>;
    };
}>(tcpMulticall: TrustlessMulticallViewOnly, multicalls: Multicalls) => Promise<{ [Multicall in keyof Multicalls]: { [FunctionID in keyof Multicalls[Multicall]]: PromiseType<ReturnType<Multicalls[Multicall][FunctionID]["func"]>> extends unknown[] ? (unknown[] & PromiseType<ReturnType<Multicalls[Multicall][FunctionID]["func"]>>)[0] : PromiseType<ReturnType<Multicalls[Multicall][FunctionID]["func"]>>; }; }>;
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
