// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;


import "./TokenUnlockSchedule.sol";

contract InvestorsSchedule is TokenUnlockSchedule {
    // solhint-disable-next-line no-empty-blocks
    constructor(
      IERC20 token,
      address timelockController
    ) TokenUnlockSchedule(token, timelockController) {}

    function _initUnlockSchedule() internal override {
        unlockSchedule.push(UnlockScheduleItem(390 days, 417));
        unlockSchedule.push(UnlockScheduleItem(420 days, 833));
        unlockSchedule.push(UnlockScheduleItem(450 days, 1250));
        unlockSchedule.push(UnlockScheduleItem(480 days, 1667));
        unlockSchedule.push(UnlockScheduleItem(510 days, 2083));
        unlockSchedule.push(UnlockScheduleItem(540 days, 2500));
        unlockSchedule.push(UnlockScheduleItem(570 days, 2917));
        unlockSchedule.push(UnlockScheduleItem(600 days, 3333));
        unlockSchedule.push(UnlockScheduleItem(630 days, 3750));
        unlockSchedule.push(UnlockScheduleItem(660 days, 4167));
        unlockSchedule.push(UnlockScheduleItem(690 days, 4583));
        unlockSchedule.push(UnlockScheduleItem(720 days, 5000));
        unlockSchedule.push(UnlockScheduleItem(750 days, 5417));
        unlockSchedule.push(UnlockScheduleItem(780 days, 5833));
        unlockSchedule.push(UnlockScheduleItem(810 days, 6250));
        unlockSchedule.push(UnlockScheduleItem(840 days, 6667));
        unlockSchedule.push(UnlockScheduleItem(870 days, 7083));
        unlockSchedule.push(UnlockScheduleItem(900 days, 7500));
        unlockSchedule.push(UnlockScheduleItem(930 days, 7917));
        unlockSchedule.push(UnlockScheduleItem(960 days, 8333));
        unlockSchedule.push(UnlockScheduleItem(990 days, 8750));
        unlockSchedule.push(UnlockScheduleItem(1020 days, 9167));
        unlockSchedule.push(UnlockScheduleItem(1050 days, 9583));
        unlockSchedule.push(UnlockScheduleItem(1080 days, 10000));
    }
}
