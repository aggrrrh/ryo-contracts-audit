import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('EcosystemSchedule', function () {
    it('test deployment', async function () {
        const [owner, controller] = await ethers.getSigners()

        const token = await ethers.deployContract('RYO')
        const schedule = await ethers.deployContract('EcosystemSchedule', [token, controller], owner)
    })
})
