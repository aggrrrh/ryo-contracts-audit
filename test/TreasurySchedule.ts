import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('TreasurySchedule', function () {
    it('test deployment', async function () {
        const [owner, controller] = await ethers.getSigners()

        const schedule = await ethers.deployContract('TreasurySchedule', [controller], owner)
    })
})
