import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { SimpleViewContract, SimpleViewContractInterface } from "../../test/SimpleViewContract";
declare type SimpleViewContractConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class SimpleViewContract__factory extends ContractFactory {
    constructor(...args: SimpleViewContractConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<SimpleViewContract>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): SimpleViewContract;
    connect(signer: Signer): SimpleViewContract__factory;
    static readonly bytecode = "0x60806040526001600055600260015534801561001a57600080fd5b506102118061002a6000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80630db118501461005c5780632cfed6111461007b5780637b94ce2914610099578063a708edc2146100b7578063b5ad5550146100d3575b600080fd5b6100646100ef565b604051610072929190610139565b60405180910390f35b610083610100565b6040516100909190610162565b60405180910390f35b6100a1610106565b6040516100ae9190610162565b60405180910390f35b6100d160048036038101906100cc91906101ae565b61010c565b005b6100ed60048036038101906100e891906101ae565b610116565b005b600080600054915060015490509091565b60015481565b60005481565b8060008190555050565b8060008190555050565b6000819050919050565b61013381610120565b82525050565b600060408201905061014e600083018561012a565b61015b602083018461012a565b9392505050565b6000602082019050610177600083018461012a565b92915050565b600080fd5b61018b81610120565b811461019657600080fd5b50565b6000813590506101a881610182565b92915050565b6000602082840312156101c4576101c361017d565b5b60006101d284828501610199565b9150509291505056fea26469706673582212204270d4bc75e834a1558adf15b2bd23fefe21aa3fbcde85fcbeccd5458898b65964736f6c63430008110033";
    static readonly abi: ({
        inputs: any[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: any[];
        stateMutability: string;
        type: string;
    })[];
    static createInterface(): SimpleViewContractInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): SimpleViewContract;
}
export {};
