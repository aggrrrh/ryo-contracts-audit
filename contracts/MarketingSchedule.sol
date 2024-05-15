// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;


import "./TokenUnlockSchedule.sol";

contract MarketingSchedule is TokenUnlockSchedule {
    // solhint-disable-next-line no-empty-blocks
    constructor(
      address timelockController
    ) TokenUnlockSchedule(timelockController) {}

    function _initUnlockSchedule() internal override {
        unlockSchedule.push(UnlockScheduleItem(0 days, 200));
        unlockSchedule.push(UnlockScheduleItem(30 days, 363));
        unlockSchedule.push(UnlockScheduleItem(60 days, 527));
        unlockSchedule.push(UnlockScheduleItem(90 days, 690));
        unlockSchedule.push(UnlockScheduleItem(120 days, 852));
        unlockSchedule.push(UnlockScheduleItem(150 days, 1017));
        unlockSchedule.push(UnlockScheduleItem(180 days, 1180));
        unlockSchedule.push(UnlockScheduleItem(210 days, 1343));
        unlockSchedule.push(UnlockScheduleItem(240 days, 1507));
        unlockSchedule.push(UnlockScheduleItem(270 days, 1670));
        unlockSchedule.push(UnlockScheduleItem(300 days, 1832));
        unlockSchedule.push(UnlockScheduleItem(330 days, 1997));
        unlockSchedule.push(UnlockScheduleItem(360 days, 2160));
        unlockSchedule.push(UnlockScheduleItem(390 days, 2323));
        unlockSchedule.push(UnlockScheduleItem(420 days, 2487));
        unlockSchedule.push(UnlockScheduleItem(450 days, 2650));
        unlockSchedule.push(UnlockScheduleItem(480 days, 2813));
        unlockSchedule.push(UnlockScheduleItem(510 days, 2977));
        unlockSchedule.push(UnlockScheduleItem(540 days, 3140));
        unlockSchedule.push(UnlockScheduleItem(570 days, 3303));
        unlockSchedule.push(UnlockScheduleItem(600 days, 3467));
        unlockSchedule.push(UnlockScheduleItem(630 days, 3629));
        unlockSchedule.push(UnlockScheduleItem(660 days, 3793));
        unlockSchedule.push(UnlockScheduleItem(690 days, 3957));
        unlockSchedule.push(UnlockScheduleItem(720 days, 4120));
        unlockSchedule.push(UnlockScheduleItem(750 days, 4283));
        unlockSchedule.push(UnlockScheduleItem(780 days, 4447));
        unlockSchedule.push(UnlockScheduleItem(810 days, 4610));
        unlockSchedule.push(UnlockScheduleItem(840 days, 4773));
        unlockSchedule.push(UnlockScheduleItem(870 days, 4937));
        unlockSchedule.push(UnlockScheduleItem(900 days, 5100));
        unlockSchedule.push(UnlockScheduleItem(930 days, 5263));
        unlockSchedule.push(UnlockScheduleItem(960 days, 5427));
        unlockSchedule.push(UnlockScheduleItem(990 days, 5590));
        unlockSchedule.push(UnlockScheduleItem(1020 days, 5753));
        unlockSchedule.push(UnlockScheduleItem(1050 days, 5917));
        unlockSchedule.push(UnlockScheduleItem(1080 days, 6080));
        unlockSchedule.push(UnlockScheduleItem(1110 days, 6243));
        unlockSchedule.push(UnlockScheduleItem(1140 days, 6406));
        unlockSchedule.push(UnlockScheduleItem(1170 days, 6570));
        unlockSchedule.push(UnlockScheduleItem(1200 days, 6733));
        unlockSchedule.push(UnlockScheduleItem(1230 days, 6897));
        unlockSchedule.push(UnlockScheduleItem(1260 days, 7059));
        unlockSchedule.push(UnlockScheduleItem(1290 days, 7223));
        unlockSchedule.push(UnlockScheduleItem(1320 days, 7387));
        unlockSchedule.push(UnlockScheduleItem(1350 days, 7550));
        unlockSchedule.push(UnlockScheduleItem(1380 days, 7713));
        unlockSchedule.push(UnlockScheduleItem(1410 days, 7877));
        unlockSchedule.push(UnlockScheduleItem(1440 days, 8040));
        unlockSchedule.push(UnlockScheduleItem(1470 days, 8203));
        unlockSchedule.push(UnlockScheduleItem(1500 days, 8367));
        unlockSchedule.push(UnlockScheduleItem(1530 days, 8530));
        unlockSchedule.push(UnlockScheduleItem(1560 days, 8693));
        unlockSchedule.push(UnlockScheduleItem(1590 days, 8857));
        unlockSchedule.push(UnlockScheduleItem(1620 days, 9020));
        unlockSchedule.push(UnlockScheduleItem(1650 days, 9183));
        unlockSchedule.push(UnlockScheduleItem(1680 days, 9347));
        unlockSchedule.push(UnlockScheduleItem(1710 days, 9510));
        unlockSchedule.push(UnlockScheduleItem(1740 days, 9673));
        unlockSchedule.push(UnlockScheduleItem(1770 days, 9837));
        unlockSchedule.push(UnlockScheduleItem(1800 days, 10000));
    }
}
