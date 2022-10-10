// Copyright (c) 2020-2022. All Rights Reserved
// SPDX-License-Identifier: MIT

pragma solidity =0.8.17;

import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

abstract contract TrustlessMulticallWrite is ReentrancyGuard {

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
        require(_callerCanMakeWriteMulticall(msg.sender), 'Not Authorized.');

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

    function _callerCanMakeWriteMulticall(address) internal view virtual returns (bool) {
        return true;
    }
}