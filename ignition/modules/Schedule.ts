import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"
import GovernanceTimeLockModule from './GovernanceTimeLock'

const ScheduleModule = buildModule("ScheduleModule", (m) => {
    const { timelock } = m.useModule(GovernanceTimeLockModule)

    const privateSaleSchedule       = m.contract("PrivateSaleSchedule", [timelock])
    const investorsSchedule         = m.contract("InvestorsSchedule", [timelock])
    const teamSchedule              = m.contract("TeamSchedule", [timelock])
    const earlyContributorsSchedule = m.contract("EarlyContributorsSchedule", [timelock])
    const advisorsSchedule          = m.contract("AdvisorsSchedule", [timelock])
    const ecosystemSchedule         = m.contract("EcosystemSchedule", [timelock])
    const validatorSchedule         = m.contract("ValidatorSchedule", [timelock])
    const marketingSchedule         = m.contract("MarketingSchedule", [timelock])
    const liquiditySchedule         = m.contract("LiquiditySchedule", [timelock])
    const treasurySchedule          = m.contract("TreasurySchedule", [timelock])

    return {
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
    }
})

export default ScheduleModule