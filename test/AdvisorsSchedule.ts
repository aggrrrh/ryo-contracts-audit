import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('AdvisorsSchedule', function () {
    it('test deployment', async function () {
        const [owner, controller] = await ethers.getSigners()

        const token = await ethers.deployContract('RYO')
        const schedule = await ethers.deployContract('AdvisorsSchedule', [token, controller], owner)
    })
})
