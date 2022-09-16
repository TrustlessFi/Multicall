"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrustlessMulticallViewOnly__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "blockNumber",
                type: "uint256",
            },
        ],
        name: "getBlockHash",
        outputs: [
            {
                internalType: "bytes32",
                name: "blockHash",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getBlockNumber",
        outputs: [
            {
                internalType: "uint256",
                name: "blockNumber",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getChainId",
        outputs: [
            {
                internalType: "uint256",
                name: "chainId",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getCurrentBlockCoinbase",
        outputs: [
            {
                internalType: "address",
                name: "blockCoinbase",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getCurrentBlockDifficulty",
        outputs: [
            {
                internalType: "uint256",
                name: "blockDifficulty",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getCurrentBlockGasLimit",
        outputs: [
            {
                internalType: "uint256",
                name: "blockGasLimit",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getCurrentBlockTimestamp",
        outputs: [
            {
                internalType: "uint256",
                name: "blockTimestamp",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "addr",
                type: "address",
            },
        ],
        name: "getEthBalance",
        outputs: [
            {
                internalType: "uint256",
                name: "ethBalances",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getLastBlockHash",
        outputs: [
            {
                internalType: "bytes32",
                name: "blockHash",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "target",
                        type: "address",
                    },
                    {
                        internalType: "bytes",
                        name: "callData",
                        type: "bytes",
                    },
                ],
                internalType: "struct TrustlessMulticall.ReadCall[]",
                name: "calls",
                type: "tuple[]",
            },
        ],
        name: "multicallNoRevertOnError",
        outputs: [
            {
                internalType: "uint256",
                name: "blockNumber",
                type: "uint256",
            },
            {
                components: [
                    {
                        internalType: "bool",
                        name: "success",
                        type: "bool",
                    },
                    {
                        internalType: "bytes",
                        name: "returnData",
                        type: "bytes",
                    },
                ],
                internalType: "struct TrustlessMulticall.ReadResult[]",
                name: "results",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b50610684806100206000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c806372425d9d1161006657806372425d9d1461014b57806386d516e8146101695780638f7cddb114610187578063a8b0574e146101b8578063ee82ac5e146101d65761009e565b80630f28c97d146100a357806327e86d6e146100c15780633408e470146100df57806342cbb15c146100fd5780634d2301cc1461011b575b600080fd5b6100ab610206565b6040516100b8919061025b565b60405180910390f35b6100c961020b565b6040516100d6919061028f565b60405180910390f35b6100e7610210565b6040516100f4919061025b565b60405180910390f35b610105610215565b604051610112919061025b565b60405180910390f35b61013560048036038101906101309190610312565b61021a565b604051610142919061025b565b60405180910390f35b610153610221565b604051610160919061025b565b60405180910390f35b610171610226565b60405161017e919061025b565b60405180910390f35b6101a1600480360381019061019c91906103a4565b61022b565b6040516101af92919061059b565b60405180910390f35b6101c0610236565b6040516101cd91906105da565b60405180910390f35b6101f060048036038101906101eb9190610621565b61023b565b6040516101fd919061028f565b60405180910390f35b600090565b600090565b600090565b600090565b6000919050565b600090565b600090565b600060609250929050565b600090565b6000919050565b6000819050919050565b61025581610242565b82525050565b6000602082019050610270600083018461024c565b92915050565b6000819050919050565b61028981610276565b82525050565b60006020820190506102a46000830184610280565b92915050565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006102df826102b4565b9050919050565b6102ef816102d4565b81146102fa57600080fd5b50565b60008135905061030c816102e6565b92915050565b600060208284031215610328576103276102aa565b5b6000610336848285016102fd565b91505092915050565b600080fd5b600080fd5b600080fd5b60008083601f8401126103645761036361033f565b5b8235905067ffffffffffffffff81111561038157610380610344565b5b60208301915083602082028301111561039d5761039c610349565b5b9250929050565b600080602083850312156103bb576103ba6102aa565b5b600083013567ffffffffffffffff8111156103d9576103d86102af565b5b6103e58582860161034e565b92509250509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b60008115159050919050565b6104328161041d565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610472578082015181840152602081019050610457565b60008484015250505050565b6000601f19601f8301169050919050565b600061049a82610438565b6104a48185610443565b93506104b4818560208601610454565b6104bd8161047e565b840191505092915050565b60006040830160008301516104e06000860182610429565b50602083015184820360208601526104f8828261048f565b9150508091505092915050565b600061051183836104c8565b905092915050565b6000602082019050919050565b6000610531826103f1565b61053b81856103fc565b93508360208202850161054d8561040d565b8060005b85811015610589578484038952815161056a8582610505565b945061057583610519565b925060208a01995050600181019050610551565b50829750879550505050505092915050565b60006040820190506105b0600083018561024c565b81810360208301526105c28184610526565b90509392505050565b6105d4816102d4565b82525050565b60006020820190506105ef60008301846105cb565b92915050565b6105fe81610242565b811461060957600080fd5b50565b60008135905061061b816105f5565b92915050565b600060208284031215610637576106366102aa565b5b60006106458482850161060c565b9150509291505056fea26469706673582212200d94e276962903e4e18c7434744eb2b21e8616a28e25078797169be6dc01f06964736f6c63430008110033";
const isSuperArgs = (xs) => xs.length > 1;
class TrustlessMulticallViewOnly__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.TrustlessMulticallViewOnly__factory = TrustlessMulticallViewOnly__factory;
TrustlessMulticallViewOnly__factory.bytecode = _bytecode;
TrustlessMulticallViewOnly__factory.abi = _abi;
