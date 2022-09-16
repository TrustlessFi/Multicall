import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "./common";
export declare namespace TrustlessMulticall {
    type WriteCallStruct = {
        target: PromiseOrValue<string>;
        callData: PromiseOrValue<BytesLike>;
        value: PromiseOrValue<BigNumberish>;
    };
    type WriteCallStructOutput = [string, string, BigNumber] & {
        target: string;
        callData: string;
        value: BigNumber;
    };
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
export interface TrustlessMulticallInterface extends utils.Interface {
    functions: {
        "allRevertOnError((address,bytes,uint256)[])": FunctionFragment;
        "getBlockHash(uint256)": FunctionFragment;
        "getBlockNumber()": FunctionFragment;
        "getChainId()": FunctionFragment;
        "getCurrentBlockCoinbase()": FunctionFragment;
        "getCurrentBlockDifficulty()": FunctionFragment;
        "getCurrentBlockGasLimit()": FunctionFragment;
        "getCurrentBlockTimestamp()": FunctionFragment;
        "getEthBalance(address)": FunctionFragment;
        "getLastBlockHash()": FunctionFragment;
        "multicallNoRevertOnError((address,bytes)[])": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "allRevertOnError" | "getBlockHash" | "getBlockNumber" | "getChainId" | "getCurrentBlockCoinbase" | "getCurrentBlockDifficulty" | "getCurrentBlockGasLimit" | "getCurrentBlockTimestamp" | "getEthBalance" | "getLastBlockHash" | "multicallNoRevertOnError"): FunctionFragment;
    encodeFunctionData(functionFragment: "allRevertOnError", values: [TrustlessMulticall.WriteCallStruct[]]): string;
    encodeFunctionData(functionFragment: "getBlockHash", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getBlockNumber", values?: undefined): string;
    encodeFunctionData(functionFragment: "getChainId", values?: undefined): string;
    encodeFunctionData(functionFragment: "getCurrentBlockCoinbase", values?: undefined): string;
    encodeFunctionData(functionFragment: "getCurrentBlockDifficulty", values?: undefined): string;
    encodeFunctionData(functionFragment: "getCurrentBlockGasLimit", values?: undefined): string;
    encodeFunctionData(functionFragment: "getCurrentBlockTimestamp", values?: undefined): string;
    encodeFunctionData(functionFragment: "getEthBalance", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "getLastBlockHash", values?: undefined): string;
    encodeFunctionData(functionFragment: "multicallNoRevertOnError", values: [TrustlessMulticall.ReadCallStruct[]]): string;
    decodeFunctionResult(functionFragment: "allRevertOnError", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getBlockHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getBlockNumber", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getChainId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getCurrentBlockCoinbase", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getCurrentBlockDifficulty", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getCurrentBlockGasLimit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getCurrentBlockTimestamp", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getEthBalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getLastBlockHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "multicallNoRevertOnError", data: BytesLike): Result;
    events: {};
}
export interface TrustlessMulticall extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: TrustlessMulticallInterface;
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
        allRevertOnError(calls: TrustlessMulticall.WriteCallStruct[], overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        getBlockHash(blockNumber: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        getBlockNumber(overrides?: CallOverrides): Promise<[BigNumber]>;
        getChainId(overrides?: CallOverrides): Promise<[BigNumber]>;
        getCurrentBlockCoinbase(overrides?: CallOverrides): Promise<[string]>;
        getCurrentBlockDifficulty(overrides?: CallOverrides): Promise<[BigNumber]>;
        getCurrentBlockGasLimit(overrides?: CallOverrides): Promise<[BigNumber]>;
        getCurrentBlockTimestamp(overrides?: CallOverrides): Promise<[BigNumber]>;
        getEthBalance(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        getLastBlockHash(overrides?: CallOverrides): Promise<[string]>;
        multicallNoRevertOnError(calls: TrustlessMulticall.ReadCallStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    allRevertOnError(calls: TrustlessMulticall.WriteCallStruct[], overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    getBlockHash(blockNumber: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    getBlockNumber(overrides?: CallOverrides): Promise<BigNumber>;
    getChainId(overrides?: CallOverrides): Promise<BigNumber>;
    getCurrentBlockCoinbase(overrides?: CallOverrides): Promise<string>;
    getCurrentBlockDifficulty(overrides?: CallOverrides): Promise<BigNumber>;
    getCurrentBlockGasLimit(overrides?: CallOverrides): Promise<BigNumber>;
    getCurrentBlockTimestamp(overrides?: CallOverrides): Promise<BigNumber>;
    getEthBalance(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    getLastBlockHash(overrides?: CallOverrides): Promise<string>;
    multicallNoRevertOnError(calls: TrustlessMulticall.ReadCallStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        allRevertOnError(calls: TrustlessMulticall.WriteCallStruct[], overrides?: CallOverrides): Promise<string[]>;
        getBlockHash(blockNumber: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        getBlockNumber(overrides?: CallOverrides): Promise<BigNumber>;
        getChainId(overrides?: CallOverrides): Promise<BigNumber>;
        getCurrentBlockCoinbase(overrides?: CallOverrides): Promise<string>;
        getCurrentBlockDifficulty(overrides?: CallOverrides): Promise<BigNumber>;
        getCurrentBlockGasLimit(overrides?: CallOverrides): Promise<BigNumber>;
        getCurrentBlockTimestamp(overrides?: CallOverrides): Promise<BigNumber>;
        getEthBalance(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        getLastBlockHash(overrides?: CallOverrides): Promise<string>;
        multicallNoRevertOnError(calls: TrustlessMulticall.ReadCallStruct[], overrides?: CallOverrides): Promise<[
            BigNumber,
            TrustlessMulticall.ReadResultStructOutput[]
        ] & {
            blockNumber: BigNumber;
            results: TrustlessMulticall.ReadResultStructOutput[];
        }>;
    };
    filters: {};
    estimateGas: {
        allRevertOnError(calls: TrustlessMulticall.WriteCallStruct[], overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        getBlockHash(blockNumber: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getBlockNumber(overrides?: CallOverrides): Promise<BigNumber>;
        getChainId(overrides?: CallOverrides): Promise<BigNumber>;
        getCurrentBlockCoinbase(overrides?: CallOverrides): Promise<BigNumber>;
        getCurrentBlockDifficulty(overrides?: CallOverrides): Promise<BigNumber>;
        getCurrentBlockGasLimit(overrides?: CallOverrides): Promise<BigNumber>;
        getCurrentBlockTimestamp(overrides?: CallOverrides): Promise<BigNumber>;
        getEthBalance(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        getLastBlockHash(overrides?: CallOverrides): Promise<BigNumber>;
        multicallNoRevertOnError(calls: TrustlessMulticall.ReadCallStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        allRevertOnError(calls: TrustlessMulticall.WriteCallStruct[], overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        getBlockHash(blockNumber: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getBlockNumber(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getChainId(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getCurrentBlockCoinbase(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getCurrentBlockDifficulty(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getCurrentBlockGasLimit(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getCurrentBlockTimestamp(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getEthBalance(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getLastBlockHash(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        multicallNoRevertOnError(calls: TrustlessMulticall.ReadCallStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
