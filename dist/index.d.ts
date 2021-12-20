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
export declare type genericResultConverter = (result: unknown) => unknown;
declare type resultConverter<customConverters extends genericResultConverter> = (typeof rc)[keyof typeof rc] | customConverters;
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
export declare const oneContractOneFunctionMC: <customConverters extends (result: any) => any, ConverterType extends resultConverter<customConverters>, SpecificCallArgs extends {
    [x: string]: any[];
}>(contract: Contract, func: string, converter: ConverterType, calls: SpecificCallArgs) => { [K in keyof SpecificCallArgs]: Call<customConverters, ConverterType>; };
export declare const oneContractManyFunctionMC: <customConverters extends (result: any) => any, Functions extends {
    [x: string]: resultConverter<customConverters>;
}>(contract: Contract, funcs: Functions, args?: { [key in keyof Functions]?: any[] | undefined; } | undefined) => { [K in keyof Functions]: Call<customConverters, Functions[K]>; };
export declare const manyContractOneFunctionMC: <customConverters extends (result: any) => any, ConverterType extends resultConverter<customConverters>, ArgsArray extends string[], ArgsObject extends {
    [x: string]: any[];
}>(contract: Contract, inputArgs: ArgsArray | ArgsObject, func: string, converter: ConverterType) => { [K in keyof ArgsObject]: Call<customConverters, ConverterType>; };
export declare const executeMulticalls: <customConverters extends (result: any) => any, ConverterType extends resultConverter<customConverters>, Multicalls extends {
    [x: string]: {
        [x: string]: Call<customConverters, ConverterType>;
    };
}>(tcpMulticall: TrustlessMulticallViewOnly, multicalls: Multicalls) => Promise<{ [Multicall in keyof Multicalls]: { [FunctionID in keyof Multicalls[Multicall]]: ReturnType<Multicalls[Multicall][FunctionID]["converter"]>; }; }>;
export declare const idToIdAndArg: (idArgs: string[]) => {
    [k: string]: string[];
};
export declare const idToIdAndNoArg: (idArgs: string[]) => {
    [k: string]: never[];
};
export {};
