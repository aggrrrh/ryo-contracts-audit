// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;


import "./TokenUnlockSchedule.sol";

contract ValidatorSchedule is TokenUnlockSchedule {
    // solhint-disable-next-line no-empty-blocks
    constructor(
      address timelockController
    ) TokenUnlockSchedule(timelockController) {}

    function _initUnlockSchedule() internal override {
        unlockSchedule.push(UnlockScheduleItem(30 days, 167));
        unlockSchedule.push(UnlockScheduleItem(60 days, 333));
        unlockSchedule.push(UnlockScheduleItem(90 days, 500));
        unlockSchedule.push(UnlockScheduleItem(120 days, 667));
        unlockSchedule.push(UnlockScheduleItem(150 days, 833));
        unlockSchedule.push(UnlockScheduleItem(180 days, 1000));
        unlockSchedule.push(UnlockScheduleItem(210 days, 1167));
        unlockSchedule.push(UnlockScheduleItem(240 days, 1333));
        unlockSchedule.push(UnlockScheduleItem(270 days, 1500));
        unlockSchedule.push(UnlockScheduleItem(300 days, 1667));
        unlockSchedule.push(UnlockScheduleItem(330 days, 1832));
        unlockSchedule.push(UnlockScheduleItem(360 days, 2000));
        unlockSchedule.push(UnlockScheduleItem(390 days, 2167));
        unlockSchedule.push(UnlockScheduleItem(420 days, 2333));
        unlockSchedule.push(UnlockScheduleItem(450 days, 2500));
        unlockSchedule.push(UnlockScheduleItem(480 days, 2667));
        unlockSchedule.push(UnlockScheduleItem(510 days, 2833));
        unlockSchedule.push(UnlockScheduleItem(540 days, 3000));
        unlockSchedule.push(UnlockScheduleItem(570 days, 3167));
        unlockSchedule.push(UnlockScheduleItem(600 days, 3333));
        unlockSchedule.push(UnlockScheduleItem(630 days, 3500));
        unlockSchedule.push(UnlockScheduleItem(660 days, 3667));
        unlockSchedule.push(UnlockScheduleItem(690 days, 3833));
        unlockSchedule.push(UnlockScheduleItem(720 days, 4000));
        unlockSchedule.push(UnlockScheduleItem(750 days, 4167));
        unlockSchedule.push(UnlockScheduleItem(780 days, 4333));
        unlockSchedule.push(UnlockScheduleItem(810 days, 4500));
        unlockSchedule.push(UnlockScheduleItem(840 days, 4667));
        unlockSchedule.push(UnlockScheduleItem(870 days, 4833));
        unlockSchedule.push(UnlockScheduleItem(900 days, 5000));
        unlockSchedule.push(UnlockScheduleItem(930 days, 5167));
        unlockSchedule.push(UnlockScheduleItem(960 days, 5333));
        unlockSchedule.push(UnlockScheduleItem(990 days, 5500));
        unlockSchedule.push(UnlockScheduleItem(1020 days, 5667));
        unlockSchedule.push(UnlockScheduleItem(1050 days, 5833));
        unlockSchedule.push(UnlockScheduleItem(1080 days, 6000));
        unlockSchedule.push(UnlockScheduleItem(1110 days, 6167));
        unlockSchedule.push(UnlockScheduleItem(1140 days, 6333));
        unlockSchedule.push(UnlockScheduleItem(1170 days, 6500));
        unlockSchedule.push(UnlockScheduleItem(1200 days, 6667));
        unlockSchedule.push(UnlockScheduleItem(1230 days, 6833));
        unlockSchedule.push(UnlockScheduleItem(1260 days, 7000));
        unlockSchedule.push(UnlockScheduleItem(1290 days, 7167));
        unlockSchedule.push(UnlockScheduleItem(1320 days, 7333));
        unlockSchedule.push(UnlockScheduleItem(1350 days, 7500));
        unlockSchedule.push(UnlockScheduleItem(1380 days, 7667));
        unlockSchedule.push(UnlockScheduleItem(1410 days, 7833));
        unlockSchedule.push(UnlockScheduleItem(1440 days, 8000));
        unlockSchedule.push(UnlockScheduleItem(1470 days, 8167));
        unlockSchedule.push(UnlockScheduleItem(1500 days, 8333));
        unlockSchedule.push(UnlockScheduleItem(1530 days, 8500));
        unlockSchedule.push(UnlockScheduleItem(1560 days, 8667));
        unlockSchedule.push(UnlockScheduleItem(1590 days, 8833));
        unlockSchedule.push(UnlockScheduleItem(1620 days, 9000));
        unlockSchedule.push(UnlockScheduleItem(1650 days, 9167));
        unlockSchedule.push(UnlockScheduleItem(1680 days, 9333));
        unlockSchedule.push(UnlockScheduleItem(1710 days, 9500));
        unlockSchedule.push(UnlockScheduleItem(1740 days, 9667));
        unlockSchedule.push(UnlockScheduleItem(1770 days, 9833));
        unlockSchedule.push(UnlockScheduleItem(1800 days, 10000));
    }
}
