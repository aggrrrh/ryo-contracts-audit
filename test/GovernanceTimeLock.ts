import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('GovernanceTimeLock', function () {
    it('test deployment', async function () {
        const [owner, controller] = await ethers.getSigners()

        const schedule = await ethers.deployContract('GovernanceTimeLock', [3600, [controller], [owner]], owner)
    })
})
