import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export interface SimpleViewContractInterface extends utils.Interface {
    functions: {
        "bothValues()": FunctionFragment;
        "double(uint256)": FunctionFragment;
        "firstValue()": FunctionFragment;
        "secondValue()": FunctionFragment;
        "setFirstValue(uint256)": FunctionFragment;
        "setSecondValue(uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "bothValues" | "double" | "firstValue" | "secondValue" | "setFirstValue" | "setSecondValue"): FunctionFragment;
    encodeFunctionData(functionFragment: "bothValues", values?: undefined): string;
    encodeFunctionData(functionFragment: "double", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "firstValue", values?: undefined): string;
    encodeFunctionData(functionFragment: "secondValue", values?: undefined): string;
    encodeFunctionData(functionFragment: "setFirstValue", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "setSecondValue", values: [PromiseOrValue<BigNumberish>]): string;
    decodeFunctionResult(functionFragment: "bothValues", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "double", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "firstValue", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "secondValue", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setFirstValue", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSecondValue", data: BytesLike): Result;
    events: {};
}
export interface SimpleViewContract extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: SimpleViewContractInterface;
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
        bothValues(overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            first: BigNumber;
            second: BigNumber;
        }>;
        double(value: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber] & {
            returnValue: BigNumber;
        }>;
        firstValue(overrides?: CallOverrides): Promise<[BigNumber]>;
        secondValue(overrides?: CallOverrides): Promise<[BigNumber]>;
        setFirstValue(_firstValue: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setSecondValue(_secondValue: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    bothValues(overrides?: CallOverrides): Promise<[BigNumber, BigNumber] & {
        first: BigNumber;
        second: BigNumber;
    }>;
    double(value: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    firstValue(overrides?: CallOverrides): Promise<BigNumber>;
    secondValue(overrides?: CallOverrides): Promise<BigNumber>;
    setFirstValue(_firstValue: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setSecondValue(_secondValue: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        bothValues(overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            first: BigNumber;
            second: BigNumber;
        }>;
        double(value: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        firstValue(overrides?: CallOverrides): Promise<BigNumber>;
        secondValue(overrides?: CallOverrides): Promise<BigNumber>;
        setFirstValue(_firstValue: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        setSecondValue(_secondValue: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        bothValues(overrides?: CallOverrides): Promise<BigNumber>;
        double(value: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        firstValue(overrides?: CallOverrides): Promise<BigNumber>;
        secondValue(overrides?: CallOverrides): Promise<BigNumber>;
        setFirstValue(_firstValue: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setSecondValue(_secondValue: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        bothValues(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        double(value: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        firstValue(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        secondValue(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setFirstValue(_firstValue: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setSecondValue(_secondValue: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
