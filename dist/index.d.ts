import { BaseContract, utils as ethersUtils, ethers } from 'ethers';
import { TrustlessMulticallViewOnly } from './typechain/TrustlessMulticallViewOnly';
export declare const rc: {
    Number: (result: any) => number;
    Boolean: (result: any) => boolean;
    Address: (result: any) => string;
    String: (result: any) => string;
    StringArray: (result: any) => string[];
    BigNumber: (result: any) => ethers.BigNumber;
    BigNumberToNumber: (result: any) => number;
    BigNumberToString: (result: any) => string;
    BigNumberUnscale: (result: any) => number;
};
export declare const rcDecimals: (decimals: number) => (result: unknown) => number;
export declare type genericResultConverter = (result: unknown) => unknown;
declare type resultConverter<customConverters extends genericResultConverter> = (typeof rc)[keyof typeof rc] | customConverters;
interface Call<customConverters extends (result: any) => any, CallType extends resultConverter<customConverters>> {
    id: string;
    contract: BaseContract;
    func: string;
    args: any[];
    converter: CallType;
    inputs: ethersUtils.ParamType[];
    outputs?: ethersUtils.ParamType[];
    encoding: string;
}
export declare const oneContractOneFunctionMC: <customConverters extends (result: any) => any, specificContract extends BaseContract, funcName extends keyof specificContract["functions"], SpecificCallArgs extends {
    [x: string]: Parameters<specificContract["functions"][funcName]>;
}, ConverterType extends resultConverter<customConverters>>(contract: specificContract, func: funcName, converter: ConverterType, calls: SpecificCallArgs) => { [K in keyof SpecificCallArgs]: Call<customConverters, ConverterType>; };
export declare const oneContractManyFunctionMC: <specificContract extends BaseContract, customConverters extends (result: any) => any, Functions extends { [funcName in keyof specificContract["functions"]]?: resultConverter<customConverters> | undefined; }>(contract: specificContract, funcs: Functions, args?: { [funcName_1 in keyof Functions]?: any[] | undefined; } | undefined) => { [K in keyof Functions]: Call<customConverters, NonNullable<Functions[K]>>; };
export declare const manyContractOneFunctionMC: <specificContract extends BaseContract, funcName extends keyof specificContract["functions"], customConverters extends (result: any) => any, ConverterType extends resultConverter<customConverters>, Args extends {
    [x: string]: Parameters<specificContract["functions"][funcName]>;
}>(contract: specificContract, args: Args, func: funcName, converter: ConverterType) => { [K in keyof Args]: Call<customConverters, ConverterType>; };
export declare const executeMulticalls: <customConverters extends (result: any) => any, ConverterType extends resultConverter<customConverters>, Multicalls extends {
    [x: string]: {
        [x: string]: Call<customConverters, ConverterType>;
    };
}>(tcpMulticall: TrustlessMulticallViewOnly, multicalls: Multicalls) => Promise<{ [Multicall in keyof Multicalls]: { [FunctionID in keyof Multicalls[Multicall]]: ReturnType<Multicalls[Multicall][FunctionID]["converter"]>; }; }>;
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
