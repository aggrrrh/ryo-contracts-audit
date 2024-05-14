import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('InvestorsSchedule', function () {
    it('test deployment', async function () {
        const [owner, controller] = await ethers.getSigners()

        const schedule = await ethers.deployContract('InvestorsSchedule', [controller], owner)
    })
})
