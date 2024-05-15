import { expect } from 'chai'
import { ethers } from 'hardhat'
import {
    ADVISORS_SALE_SUPPLY, DECIMALS,
    EARLY_CONTRIBUTORS_SALE_SUPPLY, ECOSYSTEM_SALE_SUPPLY,
    INVESTOR_SALE_SUPPLY, LIQUIDITY_SALE_SUPPLY, MARKETING_SALE_SUPPLY,
    PRIVATE_SALE_SUPPLY,
    TEAM_SALE_SUPPLY, TOTAL_RYO_SUPPLY, TREASURE_SALE_SUPPLY, VALIDATOR_SALE_SUPPLY
} from './constants'

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

describe('Token contract', function () {
  beforeEach(async function () {
      const [
        owner, account, round1, round2, round3, round4, round5, round6, round7, round8, round9, round10
      ] = await ethers.getSigners()

      this.token = await ethers.deployContract("RYO", [
          round1, round2, round3, round4, round5, round6, round7, round8, round9, round10
      ])
  })

  describe('test token initialization', async function () {

    it('token name', async function () {
      expect(await this.token.name()).to.be.equal('RYO Token')
    })

    it('token symbol', async function () {
      expect(await this.token.symbol()).to.be.equal('RYO')
    })

    it('token decimals', async function () {
      expect(await this.token.decimals()).to.be.equal(DECIMALS)
    })

    it('totalSupply is set', async function () {
      expect(await this.token.totalSupply()).to.be.equal(TOTAL_RYO_SUPPLY)
    })

    it('balanceOf returns distributed amounts', async function () {
        const [
            owner, account, round1, round2, round3, round4, round5, round6, round7, round8, round9, round10
        ] = await ethers.getSigners()

      expect(await this.token.balanceOf(round1)).to.be.equal(PRIVATE_SALE_SUPPLY)
      expect(await this.token.balanceOf(round2)).to.be.equal(INVESTOR_SALE_SUPPLY)
      expect(await this.token.balanceOf(round3)).to.be.equal(TEAM_SALE_SUPPLY)
      expect(await this.token.balanceOf(round4)).to.be.equal(EARLY_CONTRIBUTORS_SALE_SUPPLY)
      expect(await this.token.balanceOf(round5)).to.be.equal(ADVISORS_SALE_SUPPLY)
      expect(await this.token.balanceOf(round6)).to.be.equal(ECOSYSTEM_SALE_SUPPLY)
      expect(await this.token.balanceOf(round7)).to.be.equal(VALIDATOR_SALE_SUPPLY)
      expect(await this.token.balanceOf(round8)).to.be.equal(MARKETING_SALE_SUPPLY)
      expect(await this.token.balanceOf(round9)).to.be.equal(LIQUIDITY_SALE_SUPPLY)
      expect(await this.token.balanceOf(round10)).to.be.equal(TREASURE_SALE_SUPPLY)
      expect(await this.token.balanceOf(owner)).to.be.equal(0)
      expect(await this.token.balanceOf(account)).to.be.equal(0)
    })

    it('allowance returns zeros', async function () {
      const [owner, account] = await ethers.getSigners()

      expect(await this.token.allowance(owner, account)).to.be.equal(0)
      expect(await this.token.allowance(account, owner)).to.be.equal(0)
    })
  })

  describe('test token burning', function () {
    it('burn some tokens', async function () {
      const [owner, account, round1] = await ethers.getSigners()

      const initialTotalSupply = await this.token.totalSupply()
      const initialBalance = await this.token.balanceOf(round1)
      const amountToBurn = BigInt(4)

      await this.token.connect(round1).burn(amountToBurn)
      expect(await this.token.totalSupply()).to.be.equal(initialTotalSupply - amountToBurn)
      expect(await this.token.balanceOf(round1)).to.be.equal(initialBalance - amountToBurn)
    })
  })

  describe('test burnFrom', function () {
    it('burn some shared tokens', async function () {
      const [owner, account, round1] = await ethers.getSigners()

      const initialBalance = await this.token.balanceOf(round1)

      await expect(this.token.connect(round1).approve(account, initialBalance))
        .to.emit(this.token, 'Approval')
        .withArgs(round1, account, initialBalance)

      const tx = await this.token.connect(account).burnFrom(round1, initialBalance)
      expect(tx).to.emit(this.token, 'Transfer').withArgs(round1, ZERO_ADDRESS, initialBalance)
      expect(tx).to.emit(this.token, 'Approval').withArgs(round1, account, 0)

      expect(await this.token.balanceOf(round1)).to.be.equal(0)
      expect(await this.token.allowance(round1, account)).to.be.equal(0)
    })
  })
})
