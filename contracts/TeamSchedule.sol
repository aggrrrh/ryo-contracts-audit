// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;


import "./TokenUnlockSchedule.sol";

contract TeamSchedule is TokenUnlockSchedule {
    // solhint-disable-next-line no-empty-blocks
    constructor(
      address timelockController
    ) TokenUnlockSchedule(timelockController) {}

    function _initUnlockSchedule() internal override {
        unlockSchedule.push(UnlockScheduleItem(390 days, 208));
        unlockSchedule.push(UnlockScheduleItem(420 days, 417));
        unlockSchedule.push(UnlockScheduleItem(450 days, 625));
        unlockSchedule.push(UnlockScheduleItem(480 days, 833));
        unlockSchedule.push(UnlockScheduleItem(510 days, 1042));
        unlockSchedule.push(UnlockScheduleItem(540 days, 1250));
        unlockSchedule.push(UnlockScheduleItem(570 days, 1458));
        unlockSchedule.push(UnlockScheduleItem(600 days, 1667));
        unlockSchedule.push(UnlockScheduleItem(630 days, 1875));
        unlockSchedule.push(UnlockScheduleItem(660 days, 2083));
        unlockSchedule.push(UnlockScheduleItem(690 days, 2292));
        unlockSchedule.push(UnlockScheduleItem(720 days, 2500));
        unlockSchedule.push(UnlockScheduleItem(750 days, 2708));
        unlockSchedule.push(UnlockScheduleItem(780 days, 2917));
        unlockSchedule.push(UnlockScheduleItem(810 days, 3125));
        unlockSchedule.push(UnlockScheduleItem(840 days, 3333));
        unlockSchedule.push(UnlockScheduleItem(870 days, 3542));
        unlockSchedule.push(UnlockScheduleItem(900 days, 3750));
        unlockSchedule.push(UnlockScheduleItem(930 days, 3958));
        unlockSchedule.push(UnlockScheduleItem(960 days, 4167));
        unlockSchedule.push(UnlockScheduleItem(990 days, 4375));
        unlockSchedule.push(UnlockScheduleItem(1020 days, 4583));
        unlockSchedule.push(UnlockScheduleItem(1050 days, 4792));
        unlockSchedule.push(UnlockScheduleItem(1080 days, 5000));
        unlockSchedule.push(UnlockScheduleItem(1110 days, 5208));
        unlockSchedule.push(UnlockScheduleItem(1140 days, 5417));
        unlockSchedule.push(UnlockScheduleItem(1170 days, 5625));
        unlockSchedule.push(UnlockScheduleItem(1200 days, 5833));
        unlockSchedule.push(UnlockScheduleItem(1230 days, 6042));
        unlockSchedule.push(UnlockScheduleItem(1260 days, 6250));
        unlockSchedule.push(UnlockScheduleItem(1290 days, 6458));
        unlockSchedule.push(UnlockScheduleItem(1320 days, 6667));
        unlockSchedule.push(UnlockScheduleItem(1350 days, 6875));
        unlockSchedule.push(UnlockScheduleItem(1380 days, 7083));
        unlockSchedule.push(UnlockScheduleItem(1410 days, 7292));
        unlockSchedule.push(UnlockScheduleItem(1440 days, 7500));
        unlockSchedule.push(UnlockScheduleItem(1470 days, 7708));
        unlockSchedule.push(UnlockScheduleItem(1500 days, 7917));
        unlockSchedule.push(UnlockScheduleItem(1530 days, 8125));
        unlockSchedule.push(UnlockScheduleItem(1560 days, 8333));
        unlockSchedule.push(UnlockScheduleItem(1590 days, 8542));
        unlockSchedule.push(UnlockScheduleItem(1620 days, 8750));
        unlockSchedule.push(UnlockScheduleItem(1650 days, 8958));
        unlockSchedule.push(UnlockScheduleItem(1680 days, 9167));
        unlockSchedule.push(UnlockScheduleItem(1710 days, 9375));
        unlockSchedule.push(UnlockScheduleItem(1740 days, 9583));
        unlockSchedule.push(UnlockScheduleItem(1770 days, 9792));
        unlockSchedule.push(UnlockScheduleItem(1800 days, 10000));
    }
}
