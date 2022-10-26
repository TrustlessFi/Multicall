import { BigNumberish, BigNumber } from "ethers"
import { expect } from 'chai'

export const bnf = (val: BigNumberish) => BigNumber.from(val)

export const expectEqual = (a: BigNumberish, e: BigNumberish) => expect(bnf(a).eq(bnf(e))).to.be.true

export const expectNotEqual = (a: BigNumberish, e: BigNumberish) => expect(bnf(a)).to.not.eq(bnf(e))

export const expectZero = (a: BigNumberish) => expect(bnf(a)).equal(0)

export const expectNotZero = (a: BigNumberish) => expect(bnf(a)).to.be.not.equal(0)
