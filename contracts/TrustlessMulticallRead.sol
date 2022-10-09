// Copyright (c) 2020-2022. All Rights Reserved
// SPDX-License-Identifier: MIT

pragma solidity =0.8.17;

abstract contract TrustlessMulticallRead {
    struct ReadCall { 
        address target; 
        bytes callData; 
    }

    struct ReadResult { 
        bool success; 
        bytes returnData; 
    }

    function read(ReadCall[] calldata calls) external returns (
        uint256 blockNumber,
        ReadResult[] memory results
    ) {
        results = new ReadResult[](calls.length);

        for(uint256 i = 0; i < calls.length; i++) {
            (results[i].success, results[i].returnData) = calls[i].target.call(calls[i].callData);
        }

        return (block.number, results);
    }
}