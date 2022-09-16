"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_network_helpers_1 = require("@nomicfoundation/hardhat-network-helpers");
const withArgs_1 = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
describe("Lock", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    function deployOneYearLockFixture() {
        return __awaiter(this, void 0, void 0, function* () {
            const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
            const ONE_GWEI = 1000000000;
            const lockedAmount = ONE_GWEI;
            const unlockTime = (yield hardhat_network_helpers_1.time.latest()) + ONE_YEAR_IN_SECS;
            // Contracts are deployed using the first signer/account by default
            const [owner, otherAccount] = yield hardhat_1.ethers.getSigners();
            const Lock = yield hardhat_1.ethers.getContractFactory("Lock");
            const lock = yield Lock.deploy(unlockTime, { value: lockedAmount });
            return { lock, unlockTime, lockedAmount, owner, otherAccount };
        });
    }
    describe("Deployment", function () {
        it("Should set the right unlockTime", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const { lock, unlockTime } = yield (0, hardhat_network_helpers_1.loadFixture)(deployOneYearLockFixture);
                (0, chai_1.expect)(yield lock.unlockTime()).to.equal(unlockTime);
            });
        });
        it("Should set the right owner", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const { lock, owner } = yield (0, hardhat_network_helpers_1.loadFixture)(deployOneYearLockFixture);
                (0, chai_1.expect)(yield lock.owner()).to.equal(owner.address);
            });
        });
        it("Should receive and store the funds to lock", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const { lock, lockedAmount } = yield (0, hardhat_network_helpers_1.loadFixture)(deployOneYearLockFixture);
                (0, chai_1.expect)(yield hardhat_1.ethers.provider.getBalance(lock.address)).to.equal(lockedAmount);
            });
        });
        it("Should fail if the unlockTime is not in the future", function () {
            return __awaiter(this, void 0, void 0, function* () {
                // We don't use the fixture here because we want a different deployment
                const latestTime = yield hardhat_network_helpers_1.time.latest();
                const Lock = yield hardhat_1.ethers.getContractFactory("Lock");
                yield (0, chai_1.expect)(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith("Unlock time should be in the future");
            });
        });
    });
    describe("Withdrawals", function () {
        describe("Validations", function () {
            it("Should revert with the right error if called too soon", function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const { lock } = yield (0, hardhat_network_helpers_1.loadFixture)(deployOneYearLockFixture);
                    yield (0, chai_1.expect)(lock.withdraw()).to.be.revertedWith("You can't withdraw yet");
                });
            });
            it("Should revert with the right error if called from another account", function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const { lock, unlockTime, otherAccount } = yield (0, hardhat_network_helpers_1.loadFixture)(deployOneYearLockFixture);
                    // We can increase the time in Hardhat Network
                    yield hardhat_network_helpers_1.time.increaseTo(unlockTime);
                    // We use lock.connect() to send a transaction from another account
                    yield (0, chai_1.expect)(lock.connect(otherAccount).withdraw()).to.be.revertedWith("You aren't the owner");
                });
            });
            it("Shouldn't fail if the unlockTime has arrived and the owner calls it", function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const { lock, unlockTime } = yield (0, hardhat_network_helpers_1.loadFixture)(deployOneYearLockFixture);
                    // Transactions are sent using the first signer by default
                    yield hardhat_network_helpers_1.time.increaseTo(unlockTime);
                    yield (0, chai_1.expect)(lock.withdraw()).not.to.be.reverted;
                });
            });
        });
        describe("Events", function () {
            it("Should emit an event on withdrawals", function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const { lock, unlockTime, lockedAmount } = yield (0, hardhat_network_helpers_1.loadFixture)(deployOneYearLockFixture);
                    yield hardhat_network_helpers_1.time.increaseTo(unlockTime);
                    yield (0, chai_1.expect)(lock.withdraw())
                        .to.emit(lock, "Withdrawal")
                        .withArgs(lockedAmount, withArgs_1.anyValue); // We accept any value as `when` arg
                });
            });
        });
        describe("Transfers", function () {
            it("Should transfer the funds to the owner", function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const { lock, unlockTime, lockedAmount, owner } = yield (0, hardhat_network_helpers_1.loadFixture)(deployOneYearLockFixture);
                    yield hardhat_network_helpers_1.time.increaseTo(unlockTime);
                    yield (0, chai_1.expect)(lock.withdraw()).to.changeEtherBalances([owner, lock], [lockedAmount, -lockedAmount]);
                });
            });
        });
    });
});
