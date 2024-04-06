// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;


import "./TokenUnlockSchedule.sol";

contract PrivateSaleSchedule is TokenUnlockSchedule {
    // solhint-disable-next-line no-empty-blocks
    constructor(
      IERC20 token,
      address timelockController
    ) TokenUnlockSchedule(token, timelockController) {}

    function _initUnlockSchedule() internal override {
        unlockSchedule.push(UnlockScheduleItem(210 days, 830));
        unlockSchedule.push(UnlockScheduleItem(240 days, 1670));
        unlockSchedule.push(UnlockScheduleItem(270 days, 2500));
        unlockSchedule.push(UnlockScheduleItem(300 days, 3329));
        unlockSchedule.push(UnlockScheduleItem(330 days, 4170));
        unlockSchedule.push(UnlockScheduleItem(360 days, 5000));
        unlockSchedule.push(UnlockScheduleItem(390 days, 5830));
        unlockSchedule.push(UnlockScheduleItem(420 days, 6670));
        unlockSchedule.push(UnlockScheduleItem(450 days, 7500));
        unlockSchedule.push(UnlockScheduleItem(480 days, 8330));
        unlockSchedule.push(UnlockScheduleItem(510 days, 9170));
        unlockSchedule.push(UnlockScheduleItem(540 days, 10000));
    }
}
