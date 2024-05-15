// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;


import "./TokenUnlockSchedule.sol";

contract EcosystemSchedule is TokenUnlockSchedule {
    // solhint-disable-next-line no-empty-blocks
    constructor(
      address timelockController
    ) TokenUnlockSchedule(timelockController) {}

    function _initUnlockSchedule() internal override {
        unlockSchedule.push(UnlockScheduleItem(0 days, 300));
        unlockSchedule.push(UnlockScheduleItem(30 days, 462));
        unlockSchedule.push(UnlockScheduleItem(60 days, 623));
        unlockSchedule.push(UnlockScheduleItem(90 days, 785));
        unlockSchedule.push(UnlockScheduleItem(120 days, 947));
        unlockSchedule.push(UnlockScheduleItem(150 days, 1108));
        unlockSchedule.push(UnlockScheduleItem(180 days, 1270));
        unlockSchedule.push(UnlockScheduleItem(210 days, 1432));
        unlockSchedule.push(UnlockScheduleItem(240 days, 1593));
        unlockSchedule.push(UnlockScheduleItem(270 days, 1755));
        unlockSchedule.push(UnlockScheduleItem(300 days, 1917));
        unlockSchedule.push(UnlockScheduleItem(330 days, 2078));
        unlockSchedule.push(UnlockScheduleItem(360 days, 2240));
        unlockSchedule.push(UnlockScheduleItem(390 days, 2402));
        unlockSchedule.push(UnlockScheduleItem(420 days, 2563));
        unlockSchedule.push(UnlockScheduleItem(450 days, 2725));
        unlockSchedule.push(UnlockScheduleItem(480 days, 2887));
        unlockSchedule.push(UnlockScheduleItem(510 days, 3048));
        unlockSchedule.push(UnlockScheduleItem(540 days, 3210));
        unlockSchedule.push(UnlockScheduleItem(570 days, 3372));
        unlockSchedule.push(UnlockScheduleItem(600 days, 3533));
        unlockSchedule.push(UnlockScheduleItem(630 days, 3695));
        unlockSchedule.push(UnlockScheduleItem(660 days, 3857));
        unlockSchedule.push(UnlockScheduleItem(690 days, 4018));
        unlockSchedule.push(UnlockScheduleItem(720 days, 4180));
        unlockSchedule.push(UnlockScheduleItem(750 days, 4342));
        unlockSchedule.push(UnlockScheduleItem(780 days, 4503));
        unlockSchedule.push(UnlockScheduleItem(810 days, 4665));
        unlockSchedule.push(UnlockScheduleItem(840 days, 4827));
        unlockSchedule.push(UnlockScheduleItem(870 days, 4988));
        unlockSchedule.push(UnlockScheduleItem(900 days, 5150));
        unlockSchedule.push(UnlockScheduleItem(930 days, 5312));
        unlockSchedule.push(UnlockScheduleItem(960 days, 5473));
        unlockSchedule.push(UnlockScheduleItem(990 days, 5635));
        unlockSchedule.push(UnlockScheduleItem(1020 days, 5797));
        unlockSchedule.push(UnlockScheduleItem(1050 days, 5958));
        unlockSchedule.push(UnlockScheduleItem(1080 days, 6120));
        unlockSchedule.push(UnlockScheduleItem(1110 days, 6282));
        unlockSchedule.push(UnlockScheduleItem(1140 days, 6443));
        unlockSchedule.push(UnlockScheduleItem(1170 days, 6605));
        unlockSchedule.push(UnlockScheduleItem(1200 days, 6767));
        unlockSchedule.push(UnlockScheduleItem(1230 days, 6928));
        unlockSchedule.push(UnlockScheduleItem(1260 days, 7090));
        unlockSchedule.push(UnlockScheduleItem(1290 days, 7252));
        unlockSchedule.push(UnlockScheduleItem(1320 days, 7413));
        unlockSchedule.push(UnlockScheduleItem(1350 days, 7575));
        unlockSchedule.push(UnlockScheduleItem(1380 days, 7737));
        unlockSchedule.push(UnlockScheduleItem(1410 days, 7898));
        unlockSchedule.push(UnlockScheduleItem(1440 days, 8059));
        unlockSchedule.push(UnlockScheduleItem(1470 days, 8222));
        unlockSchedule.push(UnlockScheduleItem(1500 days, 8383));
        unlockSchedule.push(UnlockScheduleItem(1530 days, 8545));
        unlockSchedule.push(UnlockScheduleItem(1560 days, 8707));
        unlockSchedule.push(UnlockScheduleItem(1590 days, 8868));
        unlockSchedule.push(UnlockScheduleItem(1620 days, 9030));
        unlockSchedule.push(UnlockScheduleItem(1650 days, 9192));
        unlockSchedule.push(UnlockScheduleItem(1680 days, 9353));
        unlockSchedule.push(UnlockScheduleItem(1710 days, 9515));
        unlockSchedule.push(UnlockScheduleItem(1740 days, 9677));
        unlockSchedule.push(UnlockScheduleItem(1770 days, 9838));
        unlockSchedule.push(UnlockScheduleItem(1800 days, 10000));
    }
}
