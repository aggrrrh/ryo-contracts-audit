import { expect } from 'chai'
import { ethers } from 'hardhat'
import { SnapshotRestorer, takeSnapshot, time } from '@nomicfoundation/hardhat-network-helpers'
import { CONTROLLER_ROLE, DEFAULT_ADMIN_ROLE, ZERO_ADDRESS } from './constants'

const PRIVATE_TOKEN_SALE_CAP = BigInt('12000000000000000')

describe('PrivateSaleSchedule', function () {
  beforeEach(async function () {
    const [owner, controller] = await ethers.getSigners()

    this.token = await ethers.deployContract('RYO')
    this.tokenSale = await ethers.deployContract('PrivateSaleSchedule', [this.token, controller], owner)

    await this.token.connect(owner).transfer(this.tokenSale.target, PRIVATE_TOKEN_SALE_CAP)
  })

  describe('test initial state', async function () {
    it('balanceOf equals zero', async function () {
      const [owner, controller, account] = await ethers.getSigners()

      expect(await this.tokenSale.balanceOf(owner)).to.be.equal(0)
      expect(await this.tokenSale.balanceOf(account)).to.be.equal(0)
    });

    it('unlockedOf equals zero', async function () {
      const [owner, controller, account] = await ethers.getSigners()

      expect(await this.tokenSale.unlockedOf(owner)).to.be.equal(0)
      expect(await this.tokenSale.unlockedOf(account)).to.be.equal(0)
    })


    it('totalBalance equals zero', async function () {
      expect(await this.tokenSale.totalBalance()).to.be.equal(0)
    })

    it('scheduleStartTimestamp equals zero', async function () {
      expect(await this.tokenSale.scheduleStartTimestamp()).to.be.equal(0)
    })

    it('scheduleStartTimestamp equals zero', async function () {
      expect(await this.tokenSale.scheduleStartTimestamp()).to.be.equal(0)
    })

    it('unable to withdraw before schedule launch', async function () {
      const [owner, controller, account] = await ethers.getSigners()
      await this.tokenSale.connect(controller).addBalance(account, 100);

      await expect(this.tokenSale.connect(account).withdraw(account, 10))
        .to.be.revertedWith('TokenUnlockSchedule: Unlock schedule not started yet')
    })

    it('unlockedOf equals zero before schedule launch', async function () {
      const [owner, controller, account] = await ethers.getSigners()

      await this.tokenSale.connect(controller).addBalance(account, 100)
      expect(await this.tokenSale.unlockedOf(owner)).to.be.equal(0)
    })
  })

  describe('test access control', async function () {
    it('controller has controller role by default', async function () {
      const [owner, controller] = await ethers.getSigners()
      expect(await this.tokenSale.hasRole(CONTROLLER_ROLE, controller)).to.be.equal(true);
    })

    it('controller role\'s admin is the default admin role', async function () {
      expect(await this.tokenSale.getRoleAdmin(CONTROLLER_ROLE)).to.be.equal(DEFAULT_ADMIN_ROLE);
    });

    it('only controller role can call addBalance', async function () {
      const [owner, controller, account] = await ethers.getSigners()

      await expect(this.tokenSale.connect(account).addBalance(account, 100))
        .to.be.revertedWithCustomError(this.tokenSale, 'AccessControlUnauthorizedAccount')

      await this.tokenSale.connect(controller).addBalance(account, 100)
    })

    it('only controller role can call launchSale', async function () {
      const [owner, controller, account] = await ethers.getSigners()

      await expect(this.tokenSale.connect(account).launchSale())
        .to.be.revertedWithCustomError(this.tokenSale, 'AccessControlUnauthorizedAccount')

      await this.tokenSale.connect(controller).launchSale();
    })
  })

  describe('#addBalance', async function () {
    it('recipient address cannot be null', async function () {
      const [owner, controller, account] = await ethers.getSigners()

      await expect(this.tokenSale.connect(controller).addBalance(ZERO_ADDRESS, 100))
        .to.be.revertedWith('TokenUnlockSchedule: Recipient address cannot be null')
    })

    it('balance amount must be greater than zero', async function () {
      const [owner, controller, account] = await ethers.getSigners()
      await expect(this.tokenSale.connect(controller).addBalance(account, 0))
        .to.be.revertedWith('TokenUnlockSchedule: Balance amount must be greater than zero',)
    })

    it('total balance should not exceeds available balance', async function () {
      const [owner, controller, account] = await ethers.getSigners()

      const availableBalance = await this.token.balanceOf(owner)

      await expect(this.tokenSale.connect(controller).addBalance(account, availableBalance + BigInt(100)))
        .to.be.revertedWith('TokenUnlockSchedule: Total balance exceeds available balance')
    })

    it('addBalance should update totalBalance', async function () {
      const [owner, controller, account] = await ethers.getSigners()

      const amount = BigInt(100)
      await this.tokenSale.connect(controller).addBalance(account, amount)
      expect(await this.tokenSale.totalBalance()).to.be.equal(amount)
    })
  })

  describe('#unlockedOf schedule', async function () {

    const amount = BigInt(100)

    let snapshot: SnapshotRestorer
    beforeEach(async function () {
      const [owner, controller, account] = await ethers.getSigners()

      snapshot = await takeSnapshot()
      await this.tokenSale.connect(controller).launchSale({ from: controller })
    })

    afterEach(async function () {
      await snapshot.restore()
    })

    it('balanceOf returns available balance', async function () {
      const [owner, controller, account] = await ethers.getSigners()

      await this.tokenSale.connect(controller).addBalance(account, amount)
      expect(await this.tokenSale.balanceOf(account)).to.be.equal(amount)
    })

    it('unlockedOf returns zero on start', async function () {
      const [owner, controller, account] = await ethers.getSigners()

      await this.tokenSale.connect(controller).addBalance(account, amount)
      expect(await this.tokenSale.balanceOf(account)).to.be.equal(amount)
      expect(await this.tokenSale.unlockedOf(account)).to.be.equal(0)
    });

    it('25% unlocked after 270 days', async function () {
      const [owner, controller, account] = await ethers.getSigners()

      await this.tokenSale.connect(controller).addBalance(account, amount)
      await time.increase(time.duration.days(270))
      expect(await this.tokenSale.unlockedOf(account)).to.be.equal(BigInt(25))
    })

    it('50% unlocked after 360 days', async function () {
      const [owner, controller, account] = await ethers.getSigners()

      await this.tokenSale.connect(controller).addBalance(account, amount)
      await time.increase(time.duration.days(360))
      expect(await this.tokenSale.unlockedOf(account)).to.be.equal(BigInt(50))
    })

    it('75% unlocked after 450 days', async function () {
      const [owner, controller, account] = await ethers.getSigners()

      await this.tokenSale.connect(controller).addBalance(account, amount)
      await time.increase(time.duration.days(450))
      expect(await this.tokenSale.unlockedOf(account)).to.be.equal(BigInt(75))
    })

    it('92% unlocked after 510 days', async function () {
      const [owner, controller, account] = await ethers.getSigners()

      await this.tokenSale.connect(controller).addBalance(account, amount)

      await time.increase(time.duration.days(510))
      expect(await this.tokenSale.unlockedOf(account)).to.be.equal(BigInt(91))
    })

    it('100% unlocked after 540 days', async function () {
      const [owner, controller, account] = await ethers.getSigners()

      await this.tokenSale.connect(controller).addBalance(account, amount)

      await time.increase(time.duration.days(720))
      expect(await this.tokenSale.unlockedOf(account)).to.be.equal(BigInt(100))
    })
  })

  describe('#withdraw', async function () {
    const amount = BigInt(100)

    let snapshot: SnapshotRestorer
    beforeEach(async function () {
      const [owner, controller, account] = await ethers.getSigners()

      snapshot = await takeSnapshot()
      await this.tokenSale.connect(controller).launchSale({ from: controller })
    })

    afterEach(async function () {
      await snapshot.restore()
    })

    it('recipient address cannot be null', async function () {
      const [owner, controller, account] = await ethers.getSigners()

      await this.tokenSale.connect(controller).addBalance(account, amount)
      await expect(this.tokenSale.withdraw(ZERO_ADDRESS, amount))
        .to.be.rejectedWith('TokenUnlockSchedule: Recipient address cannot be null')
    })

    it('amount must be greater than zero', async function () {
      const [owner, controller, account] = await ethers.getSigners()

      await this.tokenSale.connect(controller).addBalance(account, amount)

      await expect(this.tokenSale.withdraw(account, 0))
        .to.be.rejectedWith('TokenUnlockSchedule: Withdraw amount must be greater than zero')
    })

    // todo
    it.skip('unlock schedule not started yet', async function () {
      const [owner, controller, account] = await ethers.getSigners()

      await this.tokenSale.connect(controller).addBalance(account, amount)

      await expect(this.tokenSale.withdraw(account, 0))
        .to.be.rejectedWith('TokenUnlockSchedule: Unlock schedule not started yet')
    })

    it('25% withdraw after 270 days', async function () {
      const [owner, controller, account] = await ethers.getSigners()

      const withdrawAmount = BigInt(20)

      await this.tokenSale.connect(controller).addBalance(account, amount)

      await time.increase(time.duration.minutes(1))
      await expect(this.tokenSale.connect(account).withdraw(account, withdrawAmount))
        .to.be.rejectedWith('TokenUnlockSchedule: Amount to withdraw is greater than unlocked amount')

      // Withdraw all unlocked funds after 270 days
      await time.increase(time.duration.days(270))
      await this.tokenSale.connect(account).withdraw(account, withdrawAmount)
      expect(await this.tokenSale.balanceOf(account)).to.be.equal(BigInt(80))
      expect(await this.tokenSale.unlockedOf(account)).to.be.equal(5)

      // Check available funds after next phase
      await time.increase(time.duration.days(30))
      expect(await this.tokenSale.balanceOf(account)).to.be.equal(BigInt(80))
      expect(await this.tokenSale.unlockedOf(account)).to.be.equal(BigInt(13))
    })

    it('75% withdraw after 450 days', async function () {
      const [owner, controller, account] = await ethers.getSigners()

      const withdrawAmount = BigInt(75)

      await this.tokenSale.connect(controller).addBalance(account, amount)

      // Withdraw all unlocked funds after 450 days
      await time.increase(time.duration.days(450))
      await this.tokenSale.connect(account).withdraw(account, withdrawAmount)
      expect(await this.tokenSale.balanceOf(account)).to.be.equal(BigInt(25))
      expect(await this.tokenSale.unlockedOf(account)).to.be.equal(BigInt(0))

      // Check available funds after next phase
      await time.increase(time.duration.days(30))
      expect(await this.tokenSale.balanceOf(account)).to.be.equal(BigInt(25))
      expect(await this.tokenSale.unlockedOf(account)).to.be.equal(BigInt(8))
    })

    it('100% withdraw after 720 days', async function () {
      const [owner, controller, account] = await ethers.getSigners()

      const withdrawAmount = BigInt(100)

      await this.tokenSale.connect(controller).addBalance(account, amount)

      // Withdraw all unlocked funds after 720 days
      await time.increase(time.duration.days(720))
      await this.tokenSale.connect(account).withdraw(account, withdrawAmount)
      expect(await this.tokenSale.balanceOf(account)).to.be.equal(BigInt(0))
      expect(await this.tokenSale.unlockedOf(account)).to.be.equal(BigInt(0))

      // Check available funds after next phase
      await time.increase(time.duration.days(1))
      expect(await this.tokenSale.balanceOf(account)).to.be.equal(BigInt(0))
      expect(await this.tokenSale.unlockedOf(account)).to.be.equal(BigInt(0))

      await expect(this.tokenSale.connect(account).withdraw(account, withdrawAmount))
      .to.be.rejectedWith('TokenUnlockSchedule: Amount to withdraw is greater than unlocked amount')
    })
  })
})
