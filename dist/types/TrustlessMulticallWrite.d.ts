import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "./common";
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
export interface TrustlessMulticallWriteInterface extends utils.Interface {
    functions: {
        "write((address,bytes,uint256)[],bool)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "write"): FunctionFragment;
    encodeFunctionData(functionFragment: "write", values: [TrustlessMulticallWrite.WriteCallStruct[], PromiseOrValue<boolean>]): string;
    decodeFunctionResult(functionFragment: "write", data: BytesLike): Result;
    events: {};
}
export interface TrustlessMulticallWrite extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: TrustlessMulticallWriteInterface;
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
        write(calls: TrustlessMulticallWrite.WriteCallStruct[], revertOnCallFailure: PromiseOrValue<boolean>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    write(calls: TrustlessMulticallWrite.WriteCallStruct[], revertOnCallFailure: PromiseOrValue<boolean>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        write(calls: TrustlessMulticallWrite.WriteCallStruct[], revertOnCallFailure: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<string[]>;
    };
    filters: {};
    estimateGas: {
        write(calls: TrustlessMulticallWrite.WriteCallStruct[], revertOnCallFailure: PromiseOrValue<boolean>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        write(calls: TrustlessMulticallWrite.WriteCallStruct[], revertOnCallFailure: PromiseOrValue<boolean>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
