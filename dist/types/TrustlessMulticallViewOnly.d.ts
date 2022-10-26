import type { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "./common";
export declare namespace TrustlessMulticallRead {
    type ReadCallStruct = {
        target: PromiseOrValue<string>;
        callData: PromiseOrValue<BytesLike>;
    };
    type ReadCallStructOutput = [string, string] & {
        target: string;
        callData: string;
    };
    type ReadResultStruct = {
        success: PromiseOrValue<boolean>;
        returnData: PromiseOrValue<BytesLike>;
    };
    type ReadResultStructOutput = [boolean, string] & {
        success: boolean;
        returnData: string;
    };
}
export interface TrustlessMulticallViewOnlyInterface extends utils.Interface {
    functions: {
        "read((address,bytes)[])": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "read"): FunctionFragment;
    encodeFunctionData(functionFragment: "read", values: [TrustlessMulticallRead.ReadCallStruct[]]): string;
    decodeFunctionResult(functionFragment: "read", data: BytesLike): Result;
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
        read(calls: TrustlessMulticallRead.ReadCallStruct[], overrides?: CallOverrides): Promise<[
            BigNumber,
            TrustlessMulticallRead.ReadResultStructOutput[]
        ] & {
            blockNumber: BigNumber;
            results: TrustlessMulticallRead.ReadResultStructOutput[];
        }>;
    };
    read(calls: TrustlessMulticallRead.ReadCallStruct[], overrides?: CallOverrides): Promise<[
        BigNumber,
        TrustlessMulticallRead.ReadResultStructOutput[]
    ] & {
        blockNumber: BigNumber;
        results: TrustlessMulticallRead.ReadResultStructOutput[];
    }>;
    callStatic: {
        read(calls: TrustlessMulticallRead.ReadCallStruct[], overrides?: CallOverrides): Promise<[
            BigNumber,
            TrustlessMulticallRead.ReadResultStructOutput[]
        ] & {
            blockNumber: BigNumber;
            results: TrustlessMulticallRead.ReadResultStructOutput[];
        }>;
    };
    filters: {};
    estimateGas: {
        read(calls: TrustlessMulticallRead.ReadCallStruct[], overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        read(calls: TrustlessMulticallRead.ReadCallStruct[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
