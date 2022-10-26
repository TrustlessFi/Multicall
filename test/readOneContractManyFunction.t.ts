import hre from 'hardhat'
import '@nomiclabs/hardhat-ethers'
import { TrustlessMulticallViewOnly, SimpleViewContract, TrustlessMulticallRead, } from "../src/types"

const e = hre.ethers
import { Contract } from 'ethers'

import { expect } from 'chai';
import { executeMulticalls, oneContractManyFunctionMC } from '../src/multicall'
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


describe('readOneContractManyFunction', () => {
  let contracts: multicallReadContracts

  beforeEach(async () => {
    contracts = await deployMulticallReadContracts()
  })

  it("Can grab multiple values from the same contract at once", async () => {
    const firstValue0 = await contracts.simpleViewContract.firstValue()
    const secondValue0 = await contracts.simpleViewContract.secondValue()

    const { simpleContractValues } = await executeMulticalls(
      contracts.readMulticall, 
      {
        simpleContractValues: 
          oneContractManyFunctionMC(
            contracts.simpleViewContract,
            {
              firstValue: [],
              secondValue: [],
            }
          )
      }
    )

    expectEqual(firstValue0, 1)
    expectEqual(secondValue0, 2)
    expectEqual(firstValue0, simpleContractValues.firstValue)
    expectEqual(secondValue0, simpleContractValues.secondValue)
  })

  it("Can handle multiple return values for a function", async () => {
    const firstValue0 = await contracts.simpleViewContract.firstValue()
    const secondValue0 = await contracts.simpleViewContract.secondValue()

    const { simpleContractValues } = await executeMulticalls(
      contracts.readMulticall, 
      {
        simpleContractValues: 
          oneContractManyFunctionMC(
            contracts.simpleViewContract,
            {
              firstValue: [],
              secondValue: [],
              bothValues: [],
            }
          )
      }
    )

    expectEqual(firstValue0, 1)
    expectEqual(secondValue0, 2)

    expectEqual(firstValue0, simpleContractValues.firstValue)
    expectEqual(secondValue0, simpleContractValues.secondValue)

    expectEqual(firstValue0, simpleContractValues.bothValues.first)
    expectEqual(secondValue0, simpleContractValues.bothValues.second)
  })

  it("Can handle value updates", async () => {
    const result1 = await executeMulticalls(
      contracts.readMulticall, 
      {
        simpleContractValues: 
          oneContractManyFunctionMC(
            contracts.simpleViewContract,
            {
              firstValue: [],
              secondValue: [],
              bothValues: [],
            }
          )
      }
    )

    expectEqual(result1.simpleContractValues.firstValue, 1)
    expectEqual(result1.simpleContractValues.secondValue, 2)

    await contracts.simpleViewContract.setFirstValue(3)

    const result2 = await executeMulticalls(
      contracts.readMulticall, 
      {
        simpleContractValues: 
          oneContractManyFunctionMC(
            contracts.simpleViewContract,
            {
              firstValue: [],
              secondValue: [],
              bothValues: [],
            }
          )
      }
    )

    expectEqual(result2.simpleContractValues.firstValue, 3)
    expectEqual(result2.simpleContractValues.secondValue, 2)

  })
})