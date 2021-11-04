import { Contract, utils as ethersUtils, ethers } from 'ethers';
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
declare type resultConverter<customConverters extends (result: unknown) => unknown> = (typeof rc)[keyof typeof rc] | customConverters;
interface Call<customConverters extends (result: any) => any, CallType extends resultConverter<customConverters>> {
    id: string;
    contract: Contract;
    func: string;
    args: any[];
    converter: CallType;
    inputs: ethersUtils.ParamType[];
    outputs?: ethersUtils.ParamType[];
    encoding: string;
}
export declare const getMulticall: <customConverters extends (result: any) => any, Functions extends {
    [x: string]: resultConverter<customConverters>;
}>(contract: Contract, funcs: Functions, args?: { [key in keyof Functions]?: any[] | undefined; } | undefined) => { [K in keyof Functions]: Call<customConverters, Functions[K]>; };
export declare const getDuplicateFuncMulticall: <customConverters extends (result: any) => any, ConverterType extends resultConverter<customConverters>, SpecificCallArgs extends {
    [x: string]: any[];
}>(contract: Contract, func: string, converter: ConverterType, calls: SpecificCallArgs) => { [K in keyof SpecificCallArgs]: Call<customConverters, ConverterType>; };
export declare const contractFunctionSelector: (address: string, func: string) => string;
export declare const selectorToContractFunction: (selector: string) => {
    address: string;
    func: string;
};
export declare const getDuplicateContractMulticall: <customConverters extends (result: any) => any, Functions extends {
    [x: string]: resultConverter<customConverters>;
}>(contractObject: Contract, contractFunctionSelectors: Functions, args?: { [key in keyof Functions]?: any[] | undefined; } | undefined) => { [K in keyof Functions]: Call<customConverters, Functions[K]>; };
export declare const getFullSelector: (contract: Contract, address: string, func: string, args: any[]) => string;
export declare const decodeFullSelector: (selector: string, contract: Contract) => {
    contract: Contract;
    func: string;
    args: any[];
};
export declare const getCustomMulticall: <customConverters extends (result: any) => any, Functions extends {
    [x: string]: resultConverter<customConverters>;
}>(contractObject: Contract, selectors: Functions) => { [K in keyof Functions]: Call<customConverters, Functions[K]>; };
export declare const executeMulticall: <customConverters extends (result: any) => any, Functions extends {
    [x: string]: resultConverter<customConverters>;
}>(tcpMulticall: TrustlessMulticallViewOnly, contract: Contract, funcs: Functions, args?: { [key in keyof Functions]?: any[] | undefined; } | undefined) => Promise<{ [FunctionID in keyof { [K in keyof Functions]: Call<(result: any) => any, Functions[K]>; }]: ReturnType<{ [K in keyof Functions]: Call<(result: any) => any, Functions[K]>; }[FunctionID]["converter"]>; }>;
export declare const executeMulticalls: <customConverters extends (result: any) => any, ConverterType extends resultConverter<customConverters>, Multicalls extends {
    [x: string]: {
        [x: string]: Call<customConverters, ConverterType>;
    };
}>(tcpMulticall: TrustlessMulticallViewOnly, multicalls: Multicalls) => Promise<{ [Multicall in keyof Multicalls]: { [FunctionID in keyof Multicalls[Multicall]]: ReturnType<Multicalls[Multicall][FunctionID]["converter"]>; }; }>;
export {};
