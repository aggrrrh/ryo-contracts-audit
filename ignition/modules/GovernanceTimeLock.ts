import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"

const GovernanceTimeLockModule = buildModule("GovernanceTimeLock", (m) => {
    const timelock = m.contract("GovernanceTimeLock", [
        m.getParameter("minDelay", 48 * 3600),
        m.getParameter("proposers"),
        m.getParameter("executors")
    ])

    return { timelock }
})

export default GovernanceTimeLockModule