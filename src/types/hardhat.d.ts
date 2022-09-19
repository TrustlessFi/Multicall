/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "TrustlessMulticall",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TrustlessMulticall__factory>;
    getContractFactory(
      name: "TrustlessMulticallViewOnly",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TrustlessMulticallViewOnly__factory>;

    getContractAt(
      name: "TrustlessMulticall",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TrustlessMulticall>;
    getContractAt(
      name: "TrustlessMulticallViewOnly",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TrustlessMulticallViewOnly>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}