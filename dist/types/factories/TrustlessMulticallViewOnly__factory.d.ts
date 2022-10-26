import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { TrustlessMulticallViewOnly, TrustlessMulticallViewOnlyInterface } from "../TrustlessMulticallViewOnly";
export declare class TrustlessMulticallViewOnly__factory {
    static readonly abi: {
        inputs: {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: ({
            internalType: string;
            name: string;
            type: string;
            components?: undefined;
        } | {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        })[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): TrustlessMulticallViewOnlyInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): TrustlessMulticallViewOnly;
}
