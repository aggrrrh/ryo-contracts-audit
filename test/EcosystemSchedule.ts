import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('EcosystemSchedule', function () {
    it('test deployment', async function () {
        const [owner, controller] = await ethers.getSigners()

        const schedule = await ethers.deployContract('EcosystemSchedule', [controller], owner)
    })
})
