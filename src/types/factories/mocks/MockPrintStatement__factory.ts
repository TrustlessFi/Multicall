/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  MockPrintStatement,
  MockPrintStatementInterface,
} from "../../mocks/MockPrintStatement";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "q",
        type: "uint256",
      },
    ],
    name: "quote",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506102ef806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063ed1bd76c14610030575b600080fd5b61004a600480360381019061004591906101da565b610060565b6040516100579190610297565b60405180910390f35b60606100a06040518060400160405280600e81526020017f66756e6374696f6e43616c6c65640000000000000000000000000000000000008152506100dd565b6040518060400160405280600481526020017f6c656574000000000000000000000000000000000000000000000000000000008152509050919050565b610173816040516024016100f19190610297565b6040516020818303038152906040527f41304fac000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610176565b50565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b600080fd5b6000819050919050565b6101b7816101a4565b81146101c257600080fd5b50565b6000813590506101d4816101ae565b92915050565b6000602082840312156101f0576101ef61019f565b5b60006101fe848285016101c5565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610241578082015181840152602081019050610226565b60008484015250505050565b6000601f19601f8301169050919050565b600061026982610207565b6102738185610212565b9350610283818560208601610223565b61028c8161024d565b840191505092915050565b600060208201905081810360008301526102b1818461025e565b90509291505056fea26469706673582212202126f53dc972b3547e5c0d6a1888ab433a29b11fb20566779f18ff44b546415164736f6c63430008110033";

type MockPrintStatementConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockPrintStatementConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockPrintStatement__factory extends ContractFactory {
  constructor(...args: MockPrintStatementConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MockPrintStatement> {
    return super.deploy(overrides || {}) as Promise<MockPrintStatement>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MockPrintStatement {
    return super.attach(address) as MockPrintStatement;
  }
  override connect(signer: Signer): MockPrintStatement__factory {
    return super.connect(signer) as MockPrintStatement__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockPrintStatementInterface {
    return new utils.Interface(_abi) as MockPrintStatementInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockPrintStatement {
    return new Contract(address, _abi, signerOrProvider) as MockPrintStatement;
  }
}
