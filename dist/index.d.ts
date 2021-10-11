import { Contract, utils as ethersUtils, ethers, BigNumberish } from 'ethers';
import { TrustlessMulticallViewOnly } from './typechain/TrustlessMulticallViewOnly';
import { TrustlessMulticall } from './typechain/TrustlessMulticall';
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
export declare const rcDecimals: (decimals: number) => (result: any) => number;
declare type resultConverter = (typeof rc)[keyof typeof rc];
interface Call<CallType extends resultConverter> {
    id: string;
    contract: Contract;
    func: string;
    args: any[];
    converter: CallType;
    inputs: ethersUtils.ParamType[];
    outputs?: ethersUtils.ParamType[];
    encoding: string;
}
export declare const getMulticall: <Functions extends {
    [x: string]: resultConverter;
}>(contract: Contract, funcs: Functions, args?: { [key in keyof Functions]?: any[] | undefined; } | undefined) => { [K in keyof Functions]: Call<Functions[K]>; };
export declare const getDuplicateFuncMulticall: <ConverterType extends resultConverter, SpecificCalls extends {
    [x: string]: any[];
}>(contract: Contract, func: string, converter: ConverterType, calls: SpecificCalls) => { [K in keyof SpecificCalls]: Call<ConverterType>; };
export declare const executeMulticall: <Functions extends {
    [x: string]: resultConverter;
}>(tcpMulticall: TrustlessMulticallViewOnly, contract: Contract, funcs: Functions, args?: { [key in keyof Functions]?: any[] | undefined; } | undefined) => Promise<{ [FunctionID in keyof { [K in keyof Functions]: Call<Functions[K]>; }]: ReturnType<{ [K in keyof Functions]: Call<Functions[K]>; }[FunctionID]["converter"]>; }>;
export declare const executeMulticalls: <Multicalls extends {
    [x: string]: {
        [x: string]: Call<resultConverter>;
    };
}>(tcpMulticall: TrustlessMulticallViewOnly, multicalls: Multicalls) => Promise<{ [Multicall in keyof Multicalls]: { [FunctionID in keyof Multicalls[Multicall]]: ReturnType<Multicalls[Multicall][FunctionID]["converter"]>; }; }>;
export declare const getCurrentBlockDifficulty: (multicall: TrustlessMulticall) => Promise<ethers.BigNumber>;
export declare const getCurrentBlockGasLimit: (multicall: TrustlessMulticall) => Promise<ethers.BigNumber>;
export declare const getCurrentBlockTimestamp: (multicall: TrustlessMulticall) => Promise<ethers.BigNumber>;
export declare const getEthBalance: (multicall: TrustlessMulticall, address: string) => Promise<ethers.BigNumber>;
export declare const getBlockNumber: (multicall: TrustlessMulticall) => Promise<ethers.BigNumber>;
export declare const getBlockHash: (multicall: TrustlessMulticall, blockNumber: BigNumberish) => Promise<string>;
export declare const getLastBlockHash: (multicall: TrustlessMulticall) => Promise<string>;
export declare const getCurrentBlockCoinbase: (multicall: TrustlessMulticall) => Promise<string>;
export {};
