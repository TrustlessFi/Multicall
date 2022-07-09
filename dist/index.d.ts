import { BaseContract, ContractFunction, utils as ethersUtils } from 'ethers';
import { TrustlessMulticallViewOnly } from './typechain/TrustlessMulticallViewOnly';
interface Call {
    id: string;
    contract: BaseContract;
    func: ContractFunction;
    args: any[];
    inputs: ethersUtils.ParamType[];
    outputs?: ethersUtils.ParamType[];
    encoding: string;
}
export declare const oneContractOneFunctionMC: <specificContract extends BaseContract, funcName extends keyof specificContract["functions"], SpecificCallArgs extends {
    [x: string]: Parameters<specificContract["functions"][funcName]>;
}>(contract: specificContract, funcName: funcName, calls: SpecificCallArgs) => { [K in keyof SpecificCallArgs]: Call; };
export declare const oneContractManyFunctionMC: <specificContract extends BaseContract, Functions extends { [funcName in keyof specificContract["functions"]]?: Parameters<specificContract["functions"][funcName]> | undefined; }>(contract: specificContract, funcs: Functions) => { [K in keyof Functions]: Call; };
export declare const manyContractOneFunctionMC: <specificContract extends BaseContract, funcName extends keyof specificContract["functions"], params extends Parameters<specificContract["functions"][funcName]>, Args extends {
    [x: string]: params;
}>(contract: specificContract, funcName: funcName, args: Args) => { [K in keyof Args]: Call; };
export declare const executeMulticalls: <Multicalls extends {
    [x: string]: {
        [x: string]: Call;
    };
}>(tcpMulticall: TrustlessMulticallViewOnly, multicalls: Multicalls) => Promise<{ [Multicall in keyof Multicalls]: { [FunctionID in keyof Multicalls[Multicall]]: ReturnType<Multicalls[Multicall][FunctionID]["func"]>; }; }>;
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
