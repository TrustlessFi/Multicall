import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { TrustlessMulticall, TrustlessMulticallInterface } from "../TrustlessMulticall";
declare type TrustlessMulticallConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class TrustlessMulticall__factory extends ContractFactory {
    constructor(...args: TrustlessMulticallConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<TrustlessMulticall>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): TrustlessMulticall;
    connect(signer: Signer): TrustlessMulticall__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5061128b806100206000396000f3fe60806040526004361061009c5760003560e01c80634d2301cc116100645780634d2301cc1461017d57806372425d9d146101ba57806386d516e8146101e55780638f7cddb114610210578063a8b0574e1461024e578063ee82ac5e146102795761009c565b80630f28c97d146100a15780632729482b146100cc57806327e86d6e146100fc5780633408e4701461012757806342cbb15c14610152575b600080fd5b3480156100ad57600080fd5b506100b66102b6565b6040516100c39190610776565b60405180910390f35b6100e660048036038101906100e1919061080a565b6102be565b6040516100f391906109a9565b60405180910390f35b34801561010857600080fd5b506101116104fd565b60405161011e91906109e4565b60405180910390f35b34801561013357600080fd5b5061013c610512565b6040516101499190610776565b60405180910390f35b34801561015e57600080fd5b5061016761051a565b6040516101749190610776565b60405180910390f35b34801561018957600080fd5b506101a4600480360381019061019f9190610a5d565b610522565b6040516101b19190610776565b60405180910390f35b3480156101c657600080fd5b506101cf610543565b6040516101dc9190610776565b60405180910390f35b3480156101f157600080fd5b506101fa61054b565b6040516102079190610776565b60405180910390f35b34801561021c57600080fd5b5061023760048036038101906102329190610ae0565b610553565b604051610245929190610c47565b60405180910390f35b34801561025a57600080fd5b506102636106f7565b6040516102709190610c86565b60405180910390f35b34801561028557600080fd5b506102a0600480360381019061029b9190610ccd565b6106ff565b6040516102ad91906109e4565b60405180910390f35b600042905090565b60606102c861070a565b8383905067ffffffffffffffff8111156102e5576102e4610cfa565b5b60405190808252806020026020018201604052801561031857816020015b60608152602001906001900390816103035790505b50915060005b848490508110156104f55784848281811061033c5761033b610d29565b5b905060200281019061034e9190610d67565b61035790610f1a565b915060008060008460400151116103dd57836000015173ffffffffffffffffffffffffffffffffffffffff1684602001516040516103959190610f69565b6000604051808303816000865af19150503d80600081146103d2576040519150601f19603f3d011682016040523d82523d6000602084013e6103d7565b606091505b50610453565b836000015173ffffffffffffffffffffffffffffffffffffffff168460400151856020015160405161040f9190610f69565b60006040518083038185875af1925050503d806000811461044c576040519150601f19603f3d011682016040523d82523d6000602084013e610451565b606091505b505b91509150816104c15760448151101561046b57600080fd5b600481019050808060200190518101906104859190611021565b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104b891906110bf565b60405180910390fd5b808584815181106104d5576104d4610d29565b5b6020026020010181905250505080806104ed90611110565b91505061031e565b505092915050565b600060014361050c9190611158565b40905090565b600046905090565b600043905090565b60008173ffffffffffffffffffffffffffffffffffffffff16319050919050565b600044905090565b600045905090565b600060608383905067ffffffffffffffff81111561057457610573610cfa565b5b6040519080825280602002602001820160405280156105ad57816020015b61059a610741565b8152602001906001900390816105925790505b50905060005b848490508110156106ec578484828181106105d1576105d0610d29565b5b90506020028101906105e3919061118c565b60000160208101906105f59190610a5d565b73ffffffffffffffffffffffffffffffffffffffff1685858381811061061e5761061d610d29565b5b9050602002810190610630919061118c565b806020019061063f91906111b4565b60405161064d92919061123c565b6000604051808303816000865af19150503d806000811461068a576040519150601f19603f3d011682016040523d82523d6000602084013e61068f565b606091505b508383815181106106a3576106a2610d29565b5b60200260200101516000018484815181106106c1576106c0610d29565b5b60200260200101516020018290528215151515815250505080806106e490611110565b9150506105b3565b504391509250929050565b600041905090565b600081409050919050565b6040518060600160405280600073ffffffffffffffffffffffffffffffffffffffff16815260200160608152602001600081525090565b6040518060400160405280600015158152602001606081525090565b6000819050919050565b6107708161075d565b82525050565b600060208201905061078b6000830184610767565b92915050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b60008083601f8401126107ca576107c96107a5565b5b8235905067ffffffffffffffff8111156107e7576107e66107aa565b5b602083019150836020820283011115610803576108026107af565b5b9250929050565b600080602083850312156108215761082061079b565b5b600083013567ffffffffffffffff81111561083f5761083e6107a0565b5b61084b858286016107b4565b92509250509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600081519050919050565b600082825260208201905092915050565b60005b838110156108bd5780820151818401526020810190506108a2565b60008484015250505050565b6000601f19601f8301169050919050565b60006108e582610883565b6108ef818561088e565b93506108ff81856020860161089f565b610908816108c9565b840191505092915050565b600061091f83836108da565b905092915050565b6000602082019050919050565b600061093f82610857565b6109498185610862565b93508360208202850161095b85610873565b8060005b8581101561099757848403895281516109788582610913565b945061098383610927565b925060208a0199505060018101905061095f565b50829750879550505050505092915050565b600060208201905081810360008301526109c38184610934565b905092915050565b6000819050919050565b6109de816109cb565b82525050565b60006020820190506109f960008301846109d5565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610a2a826109ff565b9050919050565b610a3a81610a1f565b8114610a4557600080fd5b50565b600081359050610a5781610a31565b92915050565b600060208284031215610a7357610a7261079b565b5b6000610a8184828501610a48565b91505092915050565b60008083601f840112610aa057610a9f6107a5565b5b8235905067ffffffffffffffff811115610abd57610abc6107aa565b5b602083019150836020820283011115610ad957610ad86107af565b5b9250929050565b60008060208385031215610af757610af661079b565b5b600083013567ffffffffffffffff811115610b1557610b146107a0565b5b610b2185828601610a8a565b92509250509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b60008115159050919050565b610b6e81610b59565b82525050565b6000604083016000830151610b8c6000860182610b65565b5060208301518482036020860152610ba482826108da565b9150508091505092915050565b6000610bbd8383610b74565b905092915050565b6000602082019050919050565b6000610bdd82610b2d565b610be78185610b38565b935083602082028501610bf985610b49565b8060005b85811015610c355784840389528151610c168582610bb1565b9450610c2183610bc5565b925060208a01995050600181019050610bfd565b50829750879550505050505092915050565b6000604082019050610c5c6000830185610767565b8181036020830152610c6e8184610bd2565b90509392505050565b610c8081610a1f565b82525050565b6000602082019050610c9b6000830184610c77565b92915050565b610caa8161075d565b8114610cb557600080fd5b50565b600081359050610cc781610ca1565b92915050565b600060208284031215610ce357610ce261079b565b5b6000610cf184828501610cb8565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600080fd5b600080fd5b600080fd5b600082356001606003833603038112610d8357610d82610d58565b5b80830191505092915050565b600080fd5b610d9d826108c9565b810181811067ffffffffffffffff82111715610dbc57610dbb610cfa565b5b80604052505050565b6000610dcf610791565b9050610ddb8282610d94565b919050565b600080fd5b600080fd5b600067ffffffffffffffff821115610e0557610e04610cfa565b5b610e0e826108c9565b9050602081019050919050565b82818337600083830152505050565b6000610e3d610e3884610dea565b610dc5565b905082815260208101848484011115610e5957610e58610de5565b5b610e64848285610e1b565b509392505050565b600082601f830112610e8157610e806107a5565b5b8135610e91848260208601610e2a565b91505092915050565b600060608284031215610eb057610eaf610d8f565b5b610eba6060610dc5565b90506000610eca84828501610a48565b600083015250602082013567ffffffffffffffff811115610eee57610eed610de0565b5b610efa84828501610e6c565b6020830152506040610f0e84828501610cb8565b60408301525092915050565b6000610f263683610e9a565b9050919050565b600081905092915050565b6000610f4382610883565b610f4d8185610f2d565b9350610f5d81856020860161089f565b80840191505092915050565b6000610f758284610f38565b915081905092915050565b600067ffffffffffffffff821115610f9b57610f9a610cfa565b5b610fa4826108c9565b9050602081019050919050565b6000610fc4610fbf84610f80565b610dc5565b905082815260208101848484011115610fe057610fdf610de5565b5b610feb84828561089f565b509392505050565b600082601f830112611008576110076107a5565b5b8151611018848260208601610fb1565b91505092915050565b6000602082840312156110375761103661079b565b5b600082015167ffffffffffffffff811115611055576110546107a0565b5b61106184828501610ff3565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60006110918261106a565b61109b8185611075565b93506110ab81856020860161089f565b6110b4816108c9565b840191505092915050565b600060208201905081810360008301526110d98184611086565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061111b8261075d565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361114d5761114c6110e1565b5b600182019050919050565b60006111638261075d565b915061116e8361075d565b9250828203905081811115611186576111856110e1565b5b92915050565b6000823560016040038336030381126111a8576111a7610d58565b5b80830191505092915050565b600080833560016020038436030381126111d1576111d0610d58565b5b80840192508235915067ffffffffffffffff8211156111f3576111f2610d5d565b5b60208301925060018202360383131561120f5761120e610d62565b5b509250929050565b60006112238385610f2d565b9350611230838584610e1b565b82840190509392505050565b6000611249828486611217565b9150819050939250505056fea2646970667358221220255cbfd3ad0790c0ef532f0faffdff2fa0c47e3a40735fc74e81c8b03c525f9964736f6c63430008110033";
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    } | {
        inputs: {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: ({
            internalType: string;
            name: string;
            type: string;
            components?: undefined;
        } | {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        })[];
        stateMutability: string;
        type: string;
    })[];
    static createInterface(): TrustlessMulticallInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): TrustlessMulticall;
}
export {};
