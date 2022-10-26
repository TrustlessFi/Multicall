"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrustlessMulticallRead__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
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
                internalType: "struct TrustlessMulticallRead.ReadCall[]",
                name: "calls",
                type: "tuple[]",
            },
        ],
        name: "read",
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
                internalType: "struct TrustlessMulticallRead.ReadResult[]",
                name: "results",
                type: "tuple[]",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b50610758806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063762eaab314610030575b600080fd5b61004a60048036038101906100459190610290565b610061565b6040516100589291906104a0565b60405180910390f35b600060608383905067ffffffffffffffff811115610082576100816104d0565b5b6040519080825280602002602001820160405280156100bb57816020015b6100a8610205565b8152602001906001900390816100a05790505b50905060005b848490508110156101fa578484828181106100df576100de6104ff565b5b90506020028101906100f1919061053d565b600001602081019061010391906105c3565b73ffffffffffffffffffffffffffffffffffffffff1685858381811061012c5761012b6104ff565b5b905060200281019061013e919061053d565b806020019061014d91906105f0565b60405161015b929190610692565b6000604051808303816000865af19150503d8060008114610198576040519150601f19603f3d011682016040523d82523d6000602084013e61019d565b606091505b508383815181106101b1576101b06104ff565b5b60200260200101516000018484815181106101cf576101ce6104ff565b5b60200260200101516020018290528215151515815250505080806101f2906106da565b9150506100c1565b504391509250929050565b6040518060400160405280600015158152602001606081525090565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b60008083601f8401126102505761024f61022b565b5b8235905067ffffffffffffffff81111561026d5761026c610230565b5b60208301915083602082028301111561028957610288610235565b5b9250929050565b600080602083850312156102a7576102a6610221565b5b600083013567ffffffffffffffff8111156102c5576102c4610226565b5b6102d18582860161023a565b92509250509250929050565b6000819050919050565b6102f0816102dd565b82525050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b60008115159050919050565b61033781610322565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561037757808201518184015260208101905061035c565b60008484015250505050565b6000601f19601f8301169050919050565b600061039f8261033d565b6103a98185610348565b93506103b9818560208601610359565b6103c281610383565b840191505092915050565b60006040830160008301516103e5600086018261032e565b50602083015184820360208601526103fd8282610394565b9150508091505092915050565b600061041683836103cd565b905092915050565b6000602082019050919050565b6000610436826102f6565b6104408185610301565b93508360208202850161045285610312565b8060005b8581101561048e578484038952815161046f858261040a565b945061047a8361041e565b925060208a01995050600181019050610456565b50829750879550505050505092915050565b60006040820190506104b560008301856102e7565b81810360208301526104c7818461042b565b90509392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600080fd5b600080fd5b600080fd5b6000823560016040038336030381126105595761055861052e565b5b80830191505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061059082610565565b9050919050565b6105a081610585565b81146105ab57600080fd5b50565b6000813590506105bd81610597565b92915050565b6000602082840312156105d9576105d8610221565b5b60006105e7848285016105ae565b91505092915050565b6000808335600160200384360303811261060d5761060c61052e565b5b80840192508235915067ffffffffffffffff82111561062f5761062e610533565b5b60208301925060018202360383131561064b5761064a610538565b5b509250929050565b600081905092915050565b82818337600083830152505050565b60006106798385610653565b935061068683858461065e565b82840190509392505050565b600061069f82848661066d565b91508190509392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006106e5826102dd565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610717576107166106ab565b5b60018201905091905056fea2646970667358221220a7fcaca6063fafbc78fb6df43ca9d04605998a8b0475b90a1865c648bf8c714a64736f6c63430008110033";
const isSuperArgs = (xs) => xs.length > 1;
class TrustlessMulticallRead__factory extends ethers_1.ContractFactory {
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
exports.TrustlessMulticallRead__factory = TrustlessMulticallRead__factory;
TrustlessMulticallRead__factory.bytecode = _bytecode;
TrustlessMulticallRead__factory.abi = _abi;
