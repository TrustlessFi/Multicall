// Copyright (c) 2020-2022. All Rights Reserved
// SPDX-License-Identifier: MIT

pragma solidity =0.8.17;


import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

/**
  * @title TrustlessMulicallRead
  * @notice Allows the caller to bundle many chain write calls into a single atomic call.
  */ 
abstract contract TrustlessMulticallWrite is ReentrancyGuard {

    struct WriteCall { 
        address target; 
        bytes callData; 
        uint256 value;
    } 

    /**
      * @notice Whether or not the caller is allowed to execute a write multicall. 
      *   must be overriden by the extending contract, else this contract cannot make 
      *   write multicalls
      * @return Whether or not the called is authorized to have this contract execute 
      *   a write multicall.
      */ 
    function _callerCanMakeWriteMulticall(address) internal view virtual returns (bool) {
        return false;
    }

    /**
      * @notice Executes a write multicall.
      * @param calls The structured calls, including eth value to send
      * @param revertOnCallFailure Whether or not to revert the entire transaction if any underlying call fails.
      * @return results The results of each call
      */ 
    function write(
        WriteCall[] calldata calls,
        bool revertOnCallFailure
    ) external payable nonReentrant returns (
        bytes[] memory results
    ) {
        require(_callerCanMakeWriteMulticall(msg.sender), 'Not Authorized.');

        WriteCall memory call;
        results = new bytes[](calls.length);

        bool success;
        bytes memory result;

        for(uint256 i = 0; i < calls.length; i++) {
            call = calls[i];
            (success, result) = 
                call.value > 0
                    ? payable(call.target).call{value: call.value}(call.callData)
                    : call.target.call(call.callData);

            if (revertOnCallFailure && !success) {
                // Next 6 lines from https://ethereum.stackexchange.com/a/83577
                if (result.length < 68) revert();
                assembly {
                    result := add(result, 0x04)
                }
                // All that remains is the revert string. Revert with that message.
                revert(abi.decode(result, (string))); 
            }

            results[i] = result;
        }

        return results;
    }
}