import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('LiquiditySchedule', function () {
    it('test deployment', async function () {
        const [owner, controller] = await ethers.getSigners()

        const token = await ethers.deployContract('RYO')
        const schedule = await ethers.deployContract('LiquiditySchedule', [token, controller], owner)
    })
})