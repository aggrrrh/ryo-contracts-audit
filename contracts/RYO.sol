// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "./constants.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title RYO Token
 * @notice Smart contract implements token for RYO
 */
contract RYO is ERC20, ERC20Burnable {
    constructor(
        address privateSaleSchedule,
        address investorsSchedule,
        address teamSchedule,
        address earlyContributorsSchedule,
        address advisorsSchedule,
        address ecosystemSchedule,
        address validatorSchedule,
        address marketingSchedule,
        address liquiditySchedule,
        address treasurySchedule
    ) ERC20("RYO Token", "RYO") {
        uint256 scale =  10 ** decimals();
        _mint(privateSaleSchedule, 30_000_000 * scale);
        _mint(investorsSchedule, 200_000_000 * scale);
        _mint(teamSchedule, 300_000_000 * scale);
        _mint(earlyContributorsSchedule, 120_000_000 * scale);
        _mint(advisorsSchedule, 120_000_000 * scale);
        _mint(ecosystemSchedule, 250_000_000 * scale);
        _mint(validatorSchedule, 300_000_000 * scale);
        _mint(marketingSchedule, 200_000_000 * scale);
        _mint(liquiditySchedule, 240_000_000 * scale);
        _mint(treasurySchedule, 240_000_000 * scale);
    }

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }
}
