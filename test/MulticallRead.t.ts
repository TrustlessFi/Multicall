import hre from 'hardhat'
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import '@nomiclabs/hardhat-ethers';
import TrustlessMulticallViewOnlyArtifact from "../src/artifacts/contracts/TrustlessMulticallViewOnly.sol/TrustlessMulticallViewOnly.json";
import { TrustlessMulticallViewOnly } from "../src/types/TrustlessMulticallViewOnly";
import MockPrintStatementArtifact from "../src/artifacts/contracts/mocks/MockPrintStatement.sol/MockPrintStatement.json";
import { MockPrintStatement } from "../src/types/mocks/MockPrintStatement";

const ethers = hre.ethers;

import { expect } from 'chai';


describe("MulticallTests", () => {

  async function deployAll(): Promise< { multicall: TrustlessMulticallViewOnly } > {
    const signers = await ethers.getSigners();

    const TrustlessMulticallViewOnlyFactory = new ethers.ContractFactory(
      TrustlessMulticallViewOnlyArtifact.abi,
      TrustlessMulticallViewOnlyArtifact.bytecode,
      signers[0]
    );
    const multicallContract = await TrustlessMulticallViewOnlyFactory.deploy();
    const multicall: TrustlessMulticallViewOnly = multicallContract as TrustlessMulticallViewOnly;
    
    return { multicall: multicall };
  }

  describe("MulticallViewOnly", () => {
    it("Can retrieve batch list via multicall", async () => {
      const { multicall } = await loadFixture(deployAll);
      const s = await ethers.getSigners();
      const MockPrintStatement = new ethers.ContractFactory(MockPrintStatementArtifact.abi, MockPrintStatementArtifact.bytecode, s[0]);
      const mockPrintStatementContract = await MockPrintStatement.deploy() as MockPrintStatement;
      const mockPrintStatementInterface = new ethers.utils.Interface(MockPrintStatementArtifact.abi);
      const callData = mockPrintStatementInterface.encodeFunctionData("quote", ["1"]);
      console.log(callData);
      const ret = await multicall.read([{target: mockPrintStatementContract.address, callData: callData}]);
      console.log(ret)

      return ret;
    });

  });

});