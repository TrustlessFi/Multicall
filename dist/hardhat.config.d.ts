import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
declare const config: {
    solidity: string;
    typechain: {
        outDir: string;
        target: string;
    };
};
export default config;
