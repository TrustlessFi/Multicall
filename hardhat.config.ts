import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'


const config = {
  solidity: '0.8.17',
  typechain: {
    outDir: 'src/types',
    target: 'ethers-v5'
  }
}

export default config
