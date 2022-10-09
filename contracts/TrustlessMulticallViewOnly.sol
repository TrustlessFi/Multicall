// Copyright (c) 2020-2022. All Rights Reserved
// SPDX-License-Identifier: MIT

pragma solidity =0.8.17;

import './TrustlessMulticall.sol';


contract TrustlessMulticallViewOnly {
    function read(
        TrustlessMulticall.ReadCall[] calldata calls
    ) external view virtual returns (
        uint256 blockNumber,
        TrustlessMulticall.ReadResult[] memory results
    ) {}
}