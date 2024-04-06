import { expect } from 'chai'
import { ethers } from 'hardhat'

const DECIMALS = 18
const TOTAL_RYO_SUPPLY = 2_000_000_000n * BigInt(10 ** DECIMALS)
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

describe('Token contract', function () {
  beforeEach(async function () {
      this.token = await ethers.deployContract("RYO")
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

    it('balanceOf returns totalSupply', async function () {
      const [owner, account] = await ethers.getSigners()

      expect(await this.token.balanceOf(owner)).to.be.equal(TOTAL_RYO_SUPPLY)
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
      const [owner] = await ethers.getSigners()

      const initialTotalSupply = await this.token.totalSupply()
      const amountToBurn = BigInt(4)

      await this.token.burn(amountToBurn)
      expect(await this.token.totalSupply()).to.be.equal(initialTotalSupply - amountToBurn)
      expect(await this.token.balanceOf(owner)).to.be.equal(initialTotalSupply - amountToBurn)
    })
  })

  describe('test burnFrom', function () {
    it('burn some shared tokens', async function () {
      const [owner, account] = await ethers.getSigners()

      const initialTotalSupply = await this.token.totalSupply()

      await expect(this.token.approve(account, initialTotalSupply))
        .to.emit(this.token, 'Approval')
        .withArgs(owner, account, initialTotalSupply)

      const tx = await this.token.connect(account).burnFrom(owner, initialTotalSupply)
      expect(tx).to.emit(this.token, 'Transfer').withArgs(owner, ZERO_ADDRESS, initialTotalSupply)
      expect(tx).to.emit(this.token, 'Approval').withArgs(owner, account, 0)

      expect(await this.token.balanceOf(owner)).to.be.equal(0)
      expect(await this.token.allowance(owner, account)).to.be.equal(0)
    })
  })
})
