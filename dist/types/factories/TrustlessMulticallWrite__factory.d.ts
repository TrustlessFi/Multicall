import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { TrustlessMulticallWrite, TrustlessMulticallWriteInterface } from "../TrustlessMulticallWrite";
export declare class TrustlessMulticallWrite__factory {
    static readonly abi: {
        inputs: ({
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        } | {
            internalType: string;
            name: string;
            type: string;
            components?: undefined;
        })[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): TrustlessMulticallWriteInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): TrustlessMulticallWrite;
}
