import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { TrustlessMulticallRead, TrustlessMulticallReadInterface } from "../TrustlessMulticallRead";
export declare class TrustlessMulticallRead__factory {
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
    static createInterface(): TrustlessMulticallReadInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): TrustlessMulticallRead;
}
