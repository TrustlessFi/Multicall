/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  TrustlessMulticallWrite,
  TrustlessMulticallWriteInterface,
} from "../TrustlessMulticallWrite";

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        internalType: "struct TrustlessMulticallWrite.WriteCall[]",
        name: "calls",
        type: "tuple[]",
      },
      {
        internalType: "bool",
        name: "revertOnCallFailure",
        type: "bool",
      },
    ],
    name: "write",
    outputs: [
      {
        internalType: "bytes[]",
        name: "results",
        type: "bytes[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];

export class TrustlessMulticallWrite__factory {
  static readonly abi = _abi;
  static createInterface(): TrustlessMulticallWriteInterface {
    return new utils.Interface(_abi) as TrustlessMulticallWriteInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TrustlessMulticallWrite {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as TrustlessMulticallWrite;
  }
}
