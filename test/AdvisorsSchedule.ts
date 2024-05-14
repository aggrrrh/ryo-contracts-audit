import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('AdvisorsSchedule', function () {
    it('test deployment', async function () {
        const [owner, controller] = await ethers.getSigners()

        const schedule = await ethers.deployContract('AdvisorsSchedule', [controller], owner)
    })
})
