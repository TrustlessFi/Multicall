import { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare type CallStruct = {
    target: string;
    callData: BytesLike;
};
export declare type CallStructOutput = [string, string] & {
    target: string;
    callData: string;
};
export declare type ResultStruct = {
    success: boolean;
    returnData: BytesLike;
};
export declare type ResultStructOutput = [boolean, string] & {
    success: boolean;
    returnData: string;
};
export interface TrustlessMulticallViewOnlyInterface extends utils.Interface {
    functions: {
        "all((address,bytes)[])": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "all", values: [CallStruct[]]): string;
    decodeFunctionResult(functionFragment: "all", data: BytesLike): Result;
    events: {};
}
export interface TrustlessMulticallViewOnly extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: TrustlessMulticallViewOnlyInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        all(calls: CallStruct[], overrides?: CallOverrides): Promise<[
            BigNumber,
            ResultStructOutput[]
        ] & {
            blockNumber: BigNumber;
            results: ResultStructOutput[];
        }>;
    };
    all(calls: CallStruct[], overrides?: CallOverrides): Promise<[
        BigNumber,
        ResultStructOutput[]
    ] & {
        blockNumber: BigNumber;
        results: ResultStructOutput[];
    }>;
    callStatic: {
        all(calls: CallStruct[], overrides?: CallOverrides): Promise<[
            BigNumber,
            ResultStructOutput[]
        ] & {
            blockNumber: BigNumber;
            results: ResultStructOutput[];
        }>;
    };
    filters: {};
    estimateGas: {
        all(calls: CallStruct[], overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        all(calls: CallStruct[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
