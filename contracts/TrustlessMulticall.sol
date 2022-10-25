// Copyright (c) 2020-2022. All Rights Reserved
// SPDX-License-Identifier: MIT

pragma solidity =0.8.17;

import './TrustlessMulticallRead.sol';
import './TrustlessMulticallWrite.sol';

/**
  * @title TrustlessMulticall
  * @notice A simple multicall contract implementing both the Multicall read and write APIs. 
  */ 
contract TrustlessMulticall is TrustlessMulticallRead, TrustlessMulticallWrite {

    function _callerCanMakeWriteMulticall(address) internal view override returns (bool) {
        return true;
    }
}