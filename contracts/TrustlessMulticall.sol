// Copyright (c) 2020-2022. All Rights Reserved
// SPDX-License-Identifier: MIT

pragma solidity =0.8.17;

import './TrustlessMulticallRead.sol';
import './TrustlessMulticallWrite.sol';

contract TrustlessMulticall is TrustlessMulticallRead, TrustlessMulticallWrite {}