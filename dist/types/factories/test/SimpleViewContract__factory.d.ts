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
    static readonly bytecode = "0x60806040526001600055600260015534801561001a57600080fd5b506102d38061002a6000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80630db11850146100675780632cfed611146100865780637b94ce29146100a4578063a708edc2146100c2578063b5ad5550146100de578063eee97206146100fa575b600080fd5b61006f61012a565b60405161007d92919061018a565b60405180910390f35b61008e61013b565b60405161009b91906101b3565b60405180910390f35b6100ac610141565b6040516100b991906101b3565b60405180910390f35b6100dc60048036038101906100d791906101ff565b610147565b005b6100f860048036038101906100f391906101ff565b610151565b005b610114600480360381019061010f91906101ff565b61015b565b60405161012191906101b3565b60405180910390f35b600080600054915060015490509091565b60015481565b60005481565b8060008190555050565b8060008190555050565b600060028261016a919061025b565b9050919050565b6000819050919050565b61018481610171565b82525050565b600060408201905061019f600083018561017b565b6101ac602083018461017b565b9392505050565b60006020820190506101c8600083018461017b565b92915050565b600080fd5b6101dc81610171565b81146101e757600080fd5b50565b6000813590506101f9816101d3565b92915050565b600060208284031215610215576102146101ce565b5b6000610223848285016101ea565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061026682610171565b915061027183610171565b925082820261027f81610171565b915082820484148315176102965761029561022c565b5b509291505056fea264697066735822122082d217bdba9ce89748cd4f6c6f3676a9f49fbe652d1e0295ad1d669f9badc7b964736f6c63430008110033";
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): SimpleViewContractInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): SimpleViewContract;
}
export {};
