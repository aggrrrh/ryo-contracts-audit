import { ethers } from 'hardhat'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const DEFAULT_ADMIN_ROLE = '0x0000000000000000000000000000000000000000000000000000000000000000';
export const CONTROLLER_ROLE = web3.utils.soliditySha3('CONTROLLER_ROLE')

export const DECIMALS = 18

const scale = BigInt(10 ** DECIMALS)
export const TOTAL_RYO_SUPPLY = 2_000_000_000n * scale

export const PRIVATE_SALE_SUPPLY = 30_000_000n * scale
export const INVESTOR_SALE_SUPPLY = 200_000_000n * scale
export const TEAM_SALE_SUPPLY = 300_000_000n * scale
export const EARLY_CONTRIBUTORS_SALE_SUPPLY = 120_000_000n * scale
export const ADVISORS_SALE_SUPPLY = 120_000_000n * scale
export const ECOSYSTEM_SALE_SUPPLY = 250_000_000n * scale
export const VALIDATOR_SALE_SUPPLY = 300_000_000n * scale
export const MARKETING_SALE_SUPPLY = 200_000_000n * scale
export const LIQUIDITY_SALE_SUPPLY = 240_000_000n * scale
export const TREASURE_SALE_SUPPLY = 240_000_000n * scale
