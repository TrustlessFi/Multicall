// Copyright (c) 2020. All Rights Reserved
// SPDX-License-Identifier: UNLICENSED

export { 
  oneContractManyFunctionMC,
  oneContractOneFunctionMC,
  manyContractOneFunctionMC,
  executeMulticalls,
  executeWriteMulticalls,
  idsToIds,
  idsToArg,
  idsToNoArg,
} from './multicall'

export type { 
  TrustlessMulticall, 
  TrustlessMulticallViewOnly, 
  factories, 
  TrustlessMulticall__factory, 
  TrustlessMulticallViewOnly__factory 
} from "./types"

export { default as TrustlessMulticallArtifact } from "./artifacts/contracts/TrustlessMulticall.sol/TrustlessMulticall.json"
export { default as TrustlessMulticallViewOnlyArtifact } from "./artifacts/contracts/TrustlessMulticallViewOnly.sol/TrustlessMulticallViewOnly.json"

