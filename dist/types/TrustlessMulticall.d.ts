import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
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
export declare namespace TrustlessMulticallWrite {
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
}
export interface TrustlessMulticallInterface extends utils.Interface {
    functions: {
        "read((address,bytes)[])": FunctionFragment;
        "write((address,bytes,uint256)[],bool)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "read" | "write"): FunctionFragment;
    encodeFunctionData(functionFragment: "read", values: [TrustlessMulticallRead.ReadCallStruct[]]): string;
    encodeFunctionData(functionFragment: "write", values: [TrustlessMulticallWrite.WriteCallStruct[], PromiseOrValue<boolean>]): string;
    decodeFunctionResult(functionFragment: "read", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "write", data: BytesLike): Result;
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
        read(calls: TrustlessMulticallRead.ReadCallStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        write(calls: TrustlessMulticallWrite.WriteCallStruct[], revertOnCallFailure: PromiseOrValue<boolean>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    read(calls: TrustlessMulticallRead.ReadCallStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    write(calls: TrustlessMulticallWrite.WriteCallStruct[], revertOnCallFailure: PromiseOrValue<boolean>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        read(calls: TrustlessMulticallRead.ReadCallStruct[], overrides?: CallOverrides): Promise<[
            BigNumber,
            TrustlessMulticallRead.ReadResultStructOutput[]
        ] & {
            blockNumber: BigNumber;
            results: TrustlessMulticallRead.ReadResultStructOutput[];
        }>;
        write(calls: TrustlessMulticallWrite.WriteCallStruct[], revertOnCallFailure: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<string[]>;
    };
    filters: {};
    estimateGas: {
        read(calls: TrustlessMulticallRead.ReadCallStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        write(calls: TrustlessMulticallWrite.WriteCallStruct[], revertOnCallFailure: PromiseOrValue<boolean>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        read(calls: TrustlessMulticallRead.ReadCallStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        write(calls: TrustlessMulticallWrite.WriteCallStruct[], revertOnCallFailure: PromiseOrValue<boolean>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
