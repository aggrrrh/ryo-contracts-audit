import { expect } from 'chai'
import { ethers } from 'hardhat'
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers'
import { StandardMerkleTree } from '@openzeppelin/merkle-tree'
import { time } from '@nomicfoundation/hardhat-network-helpers'
import { CONTROLLER_ROLE, DEFAULT_ADMIN_ROLE } from './constants'

const EARLY_CONTRIBUTORS_TOKEN_SALE_CAP = BigInt('12000000000000000')
describe('EarlyContributorsSchedule', function () {
  beforeEach(async function () {
    const [owner, controller] = await ethers.getSigners()

    this.token = await ethers.deployContract('RYO')
    this.tokenSale = await ethers.deployContract('EarlyContributorsSchedule', [this.token, controller], owner)

    await this.token.connect(owner).transfer(this.tokenSale.target, EARLY_CONTRIBUTORS_TOKEN_SALE_CAP)
  })

  describe('test access control', async function () {
    it('controller has controller role by default', async function () {
        const [owner, controller] = await ethers.getSigners()
        expect(await this.tokenSale.hasRole(CONTROLLER_ROLE, controller)).to.be.equal(true);
    })

    it('controller role\'s admin is the default admin role', async function () {
      expect(await this.tokenSale.getRoleAdmin(CONTROLLER_ROLE)).to.be.equal(DEFAULT_ADMIN_ROLE);
    });

    it('only controller role can call launchSale', async function () {
        const [owner, controller, account] = await ethers.getSigners()

        const tree = buildTree(account, 500)
        await this.tokenSale.connect(controller).setClaimRoot(tree.root)

        await expect(this.tokenSale.connect(account).launchSale())
            .to.be.revertedWithCustomError(this.tokenSale, 'AccessControlUnauthorizedAccount')

        await expect(this.tokenSale.connect(controller).launchSale())
            .to.emit(this.tokenSale, 'SaleLaunch');
    })

    it('setClaimRoot must be called by controller', async function () {
        const [owner, controller, account] = await ethers.getSigners()

        const tree = buildTree(account, 500)

        await expect(this.tokenSale.connect(owner).setClaimRoot(tree.root))
            .to.be.revertedWithCustomError(this.tokenSale, 'AccessControlUnauthorizedAccount')

        await expect(this.tokenSale.connect(controller).setClaimRoot(tree.root))
            .to.not.be.reverted
    })
  })

  describe('test claim', async function () {
    it('vesting must be started', async function () {
      const [owner, controller, account] = await ethers.getSigners()

      await expect(this.tokenSale.connect(account).withdraw(account, 20, 500, []))
        .to.be.rejectedWith('MerkleTokenUnlockSchedule: Unlock schedule not started yet')
    })

    it('proof must be valid', async function () {
      const [owner, controller, account] = await ethers.getSigners()

      const decimals = 8;
      const PERCENT_DENOMINATOR = 10000;
      const allocation_percent = 417;
      const allocation_days = 210;
      const amount = ethers.parseUnits("500", decimals);
      const amount_to_withdraw = amount * BigInt(allocation_percent) / 
        BigInt(PERCENT_DENOMINATOR); 

      const tree = buildTree(account, Number(amount))
      const proof = getProof(tree, account)

      await expect(this.tokenSale.connect(controller).setClaimRoot(tree.root))
        .to.not.be.reverted

      await this.tokenSale.connect(controller).launchSale()
 
      // Wait until the first tokens are unlocked
      await time.increase(time.duration.days(allocation_days))

      await expect(this.tokenSale.connect(account).withdraw(
        account,
        amount_to_withdraw, 
        amount, 
        []
      )).to.be.rejectedWith('MerkleTokenUnlockSchedule: Invalid claim proof')

      await expect(this.tokenSale.connect(account).withdraw(
        account,
        amount_to_withdraw,
        amount + BigInt(100), 
        proof
      )).to.be.rejectedWith('MerkleTokenUnlockSchedule: Invalid claim proof')

      const tx = await this.tokenSale.connect(account).withdraw(
        account,
        amount_to_withdraw,
        amount,
        proof
      );

      expect(tx).to.not.be.reverted
    })

    it('claim amount must not be exceeded', async function () {
      const [owner, controller, account] = await ethers.getSigners()

      const decimals = 8;
      const PERCENT_DENOMINATOR = 10000;
      const allocation_percent = 417;
      const allocation_days = 210;
      const amount = ethers.parseUnits("500", decimals);
      const amount_to_withdraw = amount * BigInt(allocation_percent) / 
        BigInt(PERCENT_DENOMINATOR); 

      const tree = buildTree(account, Number(amount))
      const proof = getProof(tree, account)

      await expect(this.tokenSale.connect(controller).setClaimRoot(tree.root))
        .to.not.be.reverted

      await this.tokenSale.connect(controller).launchSale()

      // Wait until the first tokens are unlocked
      await time.increase(time.duration.days(allocation_days))

      await expect(this.tokenSale.connect(account).withdraw(
        account,
        amount_to_withdraw,
        amount, 
        proof
      )).to.not.be.reverted

      await expect(this.tokenSale.connect(account).withdraw(
        account,
        amount_to_withdraw,
        amount, 
        proof
      )).to.be.rejectedWith('MerkleTokenUnlockSchedule: Amount to withdraw is greater than unlocked amount')
    })

    it('claim amount may be increased', async function () {
      const [owner, controller, account] = await ethers.getSigners()

      const decimals = 8;
      const PERCENT_DENOMINATOR = 10000;
      const allocation_percent = 417;
      const allocation_days = 210;
      const amount = ethers.parseUnits("500", decimals);
      const amount_to_withdraw = amount * BigInt(allocation_percent) / 
        BigInt(PERCENT_DENOMINATOR); 

      const tree = buildTree(account, Number(amount))
      const proof = getProof(tree, account)

      await expect(this.tokenSale.connect(controller).setClaimRoot(tree.root))
        .to.not.be.reverted

      await this.tokenSale.connect(controller).launchSale()

      // Wait until the first tokens are unlocked
      await time.increase(time.duration.days(allocation_days))

      await expect(this.tokenSale.connect(account).withdraw(
        account,
        amount_to_withdraw,
        amount, 
        proof
      )).to.not.be.reverted

      /* 
        Updating allocation amount by setting a new tree root
       */
      const new_amount = ethers.parseUnits("1000", decimals);
      const new_amount_to_withdraw = new_amount * BigInt(allocation_percent) / 
        BigInt(PERCENT_DENOMINATOR) - amount_to_withdraw; 
      const new_tree = buildTree(account, Number(new_amount))
      const new_proof = getProof(tree, account)

      await expect(this.tokenSale.connect(controller).setClaimRoot(new_tree.root))
        .to.not.be.reverted

      await expect(this.tokenSale.connect(account).withdraw(
        account,
        new_amount_to_withdraw,
        new_amount, 
        new_proof
      )).to.not.be.reverted

      /* 
        Claim second distribution (month 2)
       */
      const total_withdrawn = amount_to_withdraw + new_amount_to_withdraw;
      const second_allocation_days = 30;
      const second_allocation_percent = 833;
      const amount_to_withdraw_second_allocation = new_amount * 
        BigInt(second_allocation_percent) / BigInt(PERCENT_DENOMINATOR) - total_withdrawn;

      await time.increase(time.duration.days(second_allocation_days))

      await expect(this.tokenSale.connect(account).withdraw(
        account,
        amount_to_withdraw_second_allocation,
        new_amount, 
        new_proof
      )).to.not.be.reverted
    })
  })
})

function buildTree(account: HardhatEthersSigner, amount: number) {
  const values = [
    [account.address, amount.toString()],
    ["0x2222222222222222222222222222222222222222", "100"],
  ]

  return StandardMerkleTree.of(values, ["address", "uint256"])
}

function getProof(tree: any, account: HardhatEthersSigner) {
  for (const [i, v] of tree.entries()) {
    if (v[0] === account.address) {
      return tree.getProof(i)
    }
  }

  return null
}