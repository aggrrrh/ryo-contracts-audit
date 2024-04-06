import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'
import TokenModule from './Token'
import ScheduleModule from './Schedule'
import GovernanceTimeLockModule from './GovernanceTimeLock'

const RyoModule = buildModule('RyoModule', (m) => {  
  const { token } = m.useModule(TokenModule)
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

  m.call(token, 'transfer', [privateSaleSchedule, 30_000_000], { id: 'PrivateSaleScheduleAllocation' })
  m.call(token, 'transfer', [investorsSchedule, 200_000_000], { id: 'InvestorsScheduleAllocation' })
  m.call(token, 'transfer', [teamSchedule, 300_000_000], { id: 'TeamScheduleAllocation' })
  m.call(token, 'transfer', [earlyContributorsSchedule, 120_000_000], { id: 'EarlyContributorsScheduleAllocation' })
  m.call(token, 'transfer', [advisorsSchedule, 120_000_000], { id: 'AdvisorsScheduleAllocation' })
  m.call(token, 'transfer', [ecosystemSchedule, 250_000_000], { id: 'EcosystemScheduleAllocation' })
  m.call(token, 'transfer', [validatorSchedule, 500_000_000], { id: 'ValidatorScheduleAllocation' })
  m.call(token, 'transfer', [marketingSchedule, 100_000_000], { id: 'MarketingScheduleAllocation' })
  m.call(token, 'transfer', [liquiditySchedule, 240_000_000], { id: 'LiquidityScheduleAllocation' })
  m.call(token, 'transfer', [treasurySchedule, 140_000_000], { id: 'TreasuryScheduleAllocation' })

  return {
    token,
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
    timelock,
  }
})
  
export default RyoModule
