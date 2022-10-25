/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  TrustlessMulticallViewOnly,
  TrustlessMulticallViewOnlyInterface,
} from "../TrustlessMulticallViewOnly";

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
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610351806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063762eaab314610030575b600080fd5b61004a600480360381019061004591906100db565b610061565b6040516100589291906102eb565b60405180910390f35b600060609250929050565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b60008083601f84011261009b5761009a610076565b5b8235905067ffffffffffffffff8111156100b8576100b761007b565b5b6020830191508360208202830111156100d4576100d3610080565b5b9250929050565b600080602083850312156100f2576100f161006c565b5b600083013567ffffffffffffffff8111156101105761010f610071565b5b61011c85828601610085565b92509250509250929050565b6000819050919050565b61013b81610128565b82525050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b60008115159050919050565b6101828161016d565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b838110156101c25780820151818401526020810190506101a7565b60008484015250505050565b6000601f19601f8301169050919050565b60006101ea82610188565b6101f48185610193565b93506102048185602086016101a4565b61020d816101ce565b840191505092915050565b60006040830160008301516102306000860182610179565b506020830151848203602086015261024882826101df565b9150508091505092915050565b60006102618383610218565b905092915050565b6000602082019050919050565b600061028182610141565b61028b818561014c565b93508360208202850161029d8561015d565b8060005b858110156102d957848403895281516102ba8582610255565b94506102c583610269565b925060208a019950506001810190506102a1565b50829750879550505050505092915050565b60006040820190506103006000830185610132565b81810360208301526103128184610276565b9050939250505056fea2646970667358221220214b25e207ae0626075fe6c4b16b43cad42db49687ce541ae7c36f5ea8f7067b64736f6c63430008110033";

type TrustlessMulticallViewOnlyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TrustlessMulticallViewOnlyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TrustlessMulticallViewOnly__factory extends ContractFactory {
  constructor(...args: TrustlessMulticallViewOnlyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TrustlessMulticallViewOnly> {
    return super.deploy(overrides || {}) as Promise<TrustlessMulticallViewOnly>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TrustlessMulticallViewOnly {
    return super.attach(address) as TrustlessMulticallViewOnly;
  }
  override connect(signer: Signer): TrustlessMulticallViewOnly__factory {
    return super.connect(signer) as TrustlessMulticallViewOnly__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TrustlessMulticallViewOnlyInterface {
    return new utils.Interface(_abi) as TrustlessMulticallViewOnlyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TrustlessMulticallViewOnly {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as TrustlessMulticallViewOnly;
  }
}
