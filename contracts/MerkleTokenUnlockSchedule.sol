// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

/**
 * @title Abstract TokenUnlockSchedule
 * @dev TokenUnlockSchedule implements unlocking schedule for early investors.
 */
abstract contract MerkleTokenUnlockSchedule is AccessControl {
    using SafeERC20 for IERC20;

    event ClaimRootSet(bytes32 _newClaimRoot);
    event SaleLaunch(address sender);

    struct UnlockScheduleItem {
        uint256 unlockTimePass;
        uint16 totalPercentageUnlocked;
    }

    mapping(address => uint256) private _withdrawnBalances;
    UnlockScheduleItem[] internal unlockSchedule;

    uint256 public scheduleStartTimestamp = 0;
    bytes32 private claimRoot;

    IERC20 public immutable token;

    bytes32 public constant CONTROLLER_ROLE = keccak256("CONTROLLER_ROLE");
    uint16 private constant PERCENT_DENOMINATOR = 10_000;

    function _initUnlockSchedule() internal virtual;

    constructor(IERC20 token_, address _timelockController) {
        require(
            address(token_) != address(0),
            "MerkleTokenUnlockSchedule: New token address cannot be null"
        );
        require(
            _timelockController != address(0), 
            "MerkleTokenUnlockSchedule: Timelock controller address cannot be null"
        );

        _grantRole(CONTROLLER_ROLE, _timelockController);

        token = token_;

        _initUnlockSchedule();
        _validateUnlockSchedule();
    }

    function setClaimRoot(bytes32 _root) external onlyRole(CONTROLLER_ROLE) {
        require(_root != bytes32(0), "MerkleTokenUnlockSchedule: Claim root cannot be null");
        claimRoot = _root;
        emit ClaimRootSet(_root);
    }

    function launchSale() external onlyRole(CONTROLLER_ROLE) {
        require(scheduleStartTimestamp == 0, "MerkleTokenUnlockSchedule: Sale already launched");
        require(
            claimRoot != bytes32(0), 
            "MerkleTokenUnlockSchedule: Cannot launch - Claim root is not set"
        );
        // solhint-disable-next-line not-rely-on-time
        scheduleStartTimestamp = block.timestamp;

        emit SaleLaunch(msg.sender);
    }

    function withdraw(
        address to,
        uint256 amountToWithdraw,
        uint256 lockedAmount,
        bytes32[] calldata proof
    ) external returns (bool) {
        require(
            to != address(0),
            "MerkleTokenUnlockSchedule: Recipient address cannot be null"
        );
        require(
            amountToWithdraw > 0,
            "MerkleTokenUnlockSchedule: Withdraw amount must be greater than zero"
        );
        require(
            scheduleStartTimestamp > 0 && scheduleStartTimestamp < block.timestamp, // solhint-disable-line not-rely-on-time
            "MerkleTokenUnlockSchedule: Unlock schedule not started yet"
        );
        require(
            unlockedOf(msg.sender, lockedAmount) >= amountToWithdraw,
            "MerkleTokenUnlockSchedule: Amount to withdraw is greater than unlocked amount"
        );

        /* Verify proof */

        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(msg.sender, lockedAmount))));
        require(
            MerkleProof.verifyCalldata(proof, claimRoot, leaf),
            "MerkleTokenUnlockSchedule: Invalid claim proof"
        );

        _withdrawnBalances[msg.sender] += amountToWithdraw;
        token.safeTransfer(to, amountToWithdraw);
        return true;
    }

    function unlockedOf(
        address account,
        uint256 lockedAmount
    ) public view returns (uint256) {
        if (scheduleStartTimestamp > 0) {
            uint256 totalUnlocked = Math.mulDiv(
                lockedAmount,
                getUnlockedPercent(block.timestamp - scheduleStartTimestamp), // solhint-disable-line not-rely-on-time
                PERCENT_DENOMINATOR
            );

            if (totalUnlocked <= _withdrawnBalances[account]) {
                return 0;
            }

            return totalUnlocked - _withdrawnBalances[account];
        }

        return 0;
    }

    function getUnlockedPercent(
        uint256 secondsPassed
    ) internal view returns (uint16) {
        uint8 index = 0;
        while(index < unlockSchedule.length && unlockSchedule[index].unlockTimePass < secondsPassed) { index++; }

        return index > 0 ? unlockSchedule[index - 1].totalPercentageUnlocked : 0;
    }

    function _validateUnlockSchedule() private view {
        uint256 steps = unlockSchedule.length;
        assert(steps > 1);
        assert(unlockSchedule[steps - 1].totalPercentageUnlocked == PERCENT_DENOMINATOR);

        for (uint8 i = 1; i < steps; ++i) {
            assert(
                unlockSchedule[i - 1].unlockTimePass <
                    unlockSchedule[i].unlockTimePass
            );
            assert(
                unlockSchedule[i - 1].totalPercentageUnlocked <
                    unlockSchedule[i].totalPercentageUnlocked
            );
        }
    }
}