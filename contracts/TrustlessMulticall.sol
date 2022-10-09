// Copyright (c) 2020-2022. All Rights Reserved
// SPDX-License-Identifier: MIT

pragma solidity =0.8.17;

import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

contract TrustlessMulticall is ReentrancyGuard {
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

    struct WriteCall { 
        address target; 
        bytes callData; 
        uint256 value;
    } 

    function write(
        WriteCall[] calldata calls,
        bool revertOnCallFailure
    ) external payable nonReentrant returns (
        bytes[] memory results
    ) {
        WriteCall memory call;
        results = new bytes[](calls.length);

        for(uint256 i = 0; i < calls.length; i++) {
            call = calls[i];
            (bool success, bytes memory result) = 
                call.value > 0
                    ? payable(call.target).call{value: call.value}(call.callData)
                    : call.target.call(call.callData);

            if (revertOnCallFailure && !success) {
                // Next 6 lines from https://ethereum.stackexchange.com/a/83577
                if (result.length < 68) revert();
                assembly {
                    result := add(result, 0x04)
                }
                // All that remains is the revert string
                revert(abi.decode(result, (string))); 
            }

            results[i] = result;
        }

        return results;
    }
}