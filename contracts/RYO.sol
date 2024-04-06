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
    constructor() ERC20("RYO Token", "RYO") {
      _mint(msg.sender, TOTAL_RYO_SUPPLY * 10 ** decimals());
    }

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }
}
