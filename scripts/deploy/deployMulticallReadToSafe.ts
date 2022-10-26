import { LedgerSigner } from '@ethersproject/hardware-wallets'
import { SafeService, SafeEthersSigner } from '@gnosis.pm/safe-ethers-adapters'
import Safe from '@gnosis.pm/safe-core-sdk/dist/src'
import { exit } from 'process'
import ethers from 'ethers'
import { setupSafeDeployer } from './hardhatSafeDeployer'














/*
const safeTransactionServiceUrl = 'https://safe-transaction.gnosis.io/'
const safeAddress = '0xA4cB5c8651D7Cbf2506e00941b2a4202FEC2De2E'

const main = async () => {
  const defaultProvider = ethers.getDefaultProvider()
  const ledgerSigner = new LedgerSigner(defaultProvider)
  const service = new SafeService(safeTransactionServiceUrl)

  const safeSigner = new SafeEthersSigner(await Safe.create({ethAdapter: defaultProvider, safeAddress}), service, defaultProvider)

}
*/


const run = async () => {
  try {
    await main()
  } catch(e) {
    console.error(e)
    exit()
  }
}

(async () => await run())()
