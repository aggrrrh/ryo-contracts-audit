# RYO ERC20 Token

Solidity Smart Contract for RYO ERC20 Token.

## Contract list

### RYO.sol
The main token contract. All tokens are minted during deployment and transferred to vesting contracts.

### GovernanceTimeLock.sol
Auxiliary contract implementing TimelockController role. It owns RYO token and can control vesting contracts. 

### TokenUnlockSchedule.sol
This is abstract base contract for concrete vesting implementation.
It holds RYO tokens and unlock them according to implementation schedule.
GovernanceTimeLock can call `addBalance()` method to distribute tokens.
The `withdraw()` function can be called later to transfer unlocked funds.
Schedule launched by calling `launchSale()` method.

### MerkleTokenUnlockSchedule.sol
This is abstract base contract for vesting implementation that uses Merkle Tree algorithm to distribute tokens.
Owner of the tokens should provide MerkleProof in `withdraw()` method.
Schedule launched by calling `launchSale()` method.

### Vesting rounds
Different vesting schedules implemented according to RYO tokenomics.

## Deploy order
RYO uses a network of contract. The order in which they are deployed is very important.  Example deployments can be found in `ignition/modules/` folder.

Recommended order for deployment:
1. Create multi-sig wallet
2. Deploy GovernanceTimeLock with reasonable time delay and multi-sig as proposer and signers as executors
3. Deploy RYO token
4. Deploy vesting contracts
5. Set vesting contracts' token to deployed token address

## Development guide

Hardhat is used for tests and deployments.

Run `npm install` to install dependencies.

Use `npx hardhat test` to run tests for provided smart cntracts.

You can deploy to hardhat test network via ignition:
```
npx hardhat ignition deploy ignition/modules/RYO.ts --network hardhat --parameters ignition/parameters.json
```
