import hre from 'hardhat'
import '@nomiclabs/hardhat-ethers'
import { TrustlessMulticallViewOnly, SimpleViewContract, TrustlessMulticallRead, } from "../src/types"

const e = hre.ethers
import { Contract } from 'ethers'

import { expect } from 'chai';
import { executeMulticalls, oneContractManyFunctionMC, oneContractOneFunctionMC } from '../src/multicall'
import { expectEqual } from '../utils/testUtils'
import { BigNumber } from 'ethers'


const deployContract = async <SpecificContract extends Contract>(contractName: string): Promise<SpecificContract> => {
  const deployer = (await e.getSigners())[0]
  const factory = await e.getContractFactory(contractName)
  const contract = (await factory.connect(deployer).deploy()) as SpecificContract
  await contract.deployed()
  return contract
}

interface multicallReadContracts {
  readMulticall: TrustlessMulticallViewOnly
  simpleViewContract: SimpleViewContract
}

const deployMulticallReadContracts = async (): Promise<multicallReadContracts> => {
  const signers = await e.getSigners()
  const deployer = signers[0]

  const readMulticallNotViewOnly = await deployContract<TrustlessMulticallRead>('TrustlessMulticallRead')

  const readMulticall = await e.getContractAt(
    'TrustlessMulticallViewOnly', 
    readMulticallNotViewOnly.address, 
    deployer
  ) as TrustlessMulticallViewOnly

  const simpleViewContract = await deployContract<SimpleViewContract>('SimpleViewContract')

  return { readMulticall, simpleViewContract }
}


describe('readOneContractOneFunction', () => {
  let contracts: multicallReadContracts

  beforeEach(async () => {
    contracts = await deployMulticallReadContracts()
  })

  it("Can call same view function on multiple identical contracts", async () => {
    const { simpleContractIdentityValues } = await executeMulticalls(
      contracts.readMulticall, 
      { 
        simpleContractIdentityValues: oneContractOneFunctionMC(
          contracts.simpleViewContract,
          'double',
          {
            'one': [1],
            'two': [2],
          }
        )
      }
    )

    expectEqual(simpleContractIdentityValues['one'], 2)
    expectEqual(simpleContractIdentityValues['two'], 4)
  })

})