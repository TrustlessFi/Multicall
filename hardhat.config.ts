import '@typechain/hardhat'
import '@nomiclabs/hardhat-waffle'
import { HardhatUserConfig, HardhatNetworkAccountUserConfig } from "hardhat/types"
import '@nomiclabs/hardhat-ethers'
import 'hardhat-deploy'



const config: HardhatUserConfig = {
  solidity: '0.8.17',
  typechain: {
    outDir: 'src/types',
    target: 'ethers-v5'
  },
  paths: {
    artifacts: "./src/artifacts"
  }
}

export default config
