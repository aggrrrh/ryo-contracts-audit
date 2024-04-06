import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import GovernanceTimeLockModule from './GovernanceTimeLock'

const TokenModule = buildModule("TokenModule", (m) => {
    const token = m.contract("RYO")

    return { token }
})

export default TokenModule
