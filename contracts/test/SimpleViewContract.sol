// Copyright (c) 2020-2022. All Rights Reserved
// SPDX-License-Identifier: MIT

pragma solidity =0.8.17;

contract SimpleViewContract{
    uint public firstValue = 1;
    uint public secondValue = 2;

    function setFirstValue(uint _firstValue) external {
        firstValue = _firstValue;
    }

    function setSecondValue(uint _secondValue) external {
        firstValue = _secondValue;
    }

    function double(uint value) external pure returns (uint returnValue) {
        returnValue = value * 2;
    }

    function bothValues() external view returns (uint first, uint second) {
        first = firstValue;
        second = secondValue;
    }
}