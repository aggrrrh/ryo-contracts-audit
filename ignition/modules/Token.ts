import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import ScheduleModule from './Schedule'
import GovernanceTimeLockModule from './GovernanceTimeLock'

const TokenModule = buildModule("TokenModule", (m) => {
    const { timelock } = m.useModule(GovernanceTimeLockModule)

    const {
        privateSaleSchedule,
        investorsSchedule,
        teamSchedule,
        earlyContributorsSchedule,
        advisorsSchedule,
        ecosystemSchedule,
        validatorSchedule,
        marketingSchedule,
        liquiditySchedule,
        treasurySchedule,
    } = m.useModule(ScheduleModule)

    const token = m.contract("RYO", [
        privateSaleSchedule,
        investorsSchedule,
        teamSchedule,
        earlyContributorsSchedule,
        advisorsSchedule,
        ecosystemSchedule,
        validatorSchedule,
        marketingSchedule,
        liquiditySchedule,
        treasurySchedule,
    ])

    return { token }
})

export default TokenModule
