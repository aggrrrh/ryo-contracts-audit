import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"
import TokenModule from './Token'
import GovernanceTimeLockModule from './GovernanceTimeLock'

const ScheduleModule = buildModule("ScheduleModule", (m) => {
    const { token } = m.useModule(TokenModule)
    const { timelock } = m.useModule(GovernanceTimeLockModule)

    const privateSaleSchedule       = m.contract("PrivateSaleSchedule", [token, timelock])
    const investorsSchedule         = m.contract("InvestorsSchedule", [token, timelock])
    const teamSchedule              = m.contract("TeamSchedule", [token, timelock])
    const earlyContributorsSchedule = m.contract("EarlyContributorsSchedule", [token, timelock])
    const advisorsSchedule          = m.contract("AdvisorsSchedule", [token, timelock])
    const ecosystemSchedule         = m.contract("EcosystemSchedule", [token, timelock])
    const validatorSchedule         = m.contract("ValidatorSchedule", [token, timelock])
    const marketingSchedule         = m.contract("MarketingSchedule", [token, timelock])
    const liquiditySchedule         = m.contract("LiquiditySchedule", [token, timelock])
    const treasurySchedule          = m.contract("TreasurySchedule", [token, timelock])

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