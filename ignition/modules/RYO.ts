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
