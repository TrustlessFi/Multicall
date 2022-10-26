// Copyright (c) 2020-2022. All Rights Reserved
// SPDX-License-Identifier: MIT

pragma solidity =0.8.17;

import './TrustlessMulticallRead.sol';

/**
  * @title TrustlessMulticallViewOnly
  * @notice Used in typescript to signal to Ethers that the user is making a view only call.
  */ 
abstract contract TrustlessMulticallViewOnly {
    function read(
        TrustlessMulticallRead.ReadCall[] calldata calls
    ) external view virtual returns (
        uint256 blockNumber,
        TrustlessMulticallRead.ReadResult[] memory results
    );
}