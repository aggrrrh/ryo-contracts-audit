import { task, types } from 'hardhat/config'
import { isAddress, isHexString } from 'web3-validator'

task('payload:launch-sale', 'Calculate TokenUnlockSchedule::launchSale for TimeLockController')
  .setAction(async (taskArgs, env) => {
    const Round = await env.ethers.getContractFactory('PrivateSaleSchedule')
    const launchSaleData = Round.interface.encodeFunctionData(Round.interface.getFunction('launchSale')!)
    console.log(`💾: "${launchSaleData}"`)
  })

task('payload:set-token', 'Calculate TokenUnlockSchedule::setToken for TimeLockController')
  .addParam('tokenAddress', 'Token contract address', undefined, types.string)
  .setAction(async (taskArgs, env) => {
    if (!isAddress(taskArgs.tokenAddress)) {
      throw new Error('Token address is invalid')
    }

    const Round = await env.ethers.getContractFactory('PrivateSaleSchedule')
    const setTokenData = Round.interface.encodeFunctionData(Round.interface.getFunction('setToken')!, [taskArgs.tokenAddress])
    console.log(`💾: "${setTokenData}"`)
  })

task('payload:set-claim-root', 'Calculate EarlyContributorsSchedule::setClaimRoot for TimeLockController')
  .addParam('claimRoot', 'New claim root', undefined, types.string)
  .setAction(async (taskArgs, env) => {
    if (!isHexString(taskArgs.claimRoot)) {
      throw new Error('Token address is invalid')
    }

    const Round = await env.ethers.getContractFactory('EarlyContributorsSchedule')
    const setClaimRoot = Round.interface.encodeFunctionData(Round.interface.getFunction('setClaimRoot')!, [taskArgs.claimRoot])
    console.log(`💾: "${setClaimRoot}"`)
  })

task('payload:add-balance', 'Calculate TokenUnlockSchedule::addBalance for TimeLockController')
  .addParam('receiverAddress', 'Address of a receiver', undefined, types.string)
  .addParam('amount', 'Amount of tokens to add in smallest unit', undefined, types.string)
  .setAction(async (taskArgs, env) => {
    if (!isAddress(taskArgs.receiverAddress)) {
      throw new Error('Receiver address is invalid')
    }

    const amount = BigInt(taskArgs.amount)

    const Round = await env.ethers.getContractFactory('PrivateSaleSchedule')
    const addBalanceData = Round.interface.encodeFunctionData(
      Round.interface.getFunction('addBalance')!,
      [
        taskArgs.receiverAddress,
        amount
      ]
    )

    console.log(`💾: "${addBalanceData}"`)
  })
