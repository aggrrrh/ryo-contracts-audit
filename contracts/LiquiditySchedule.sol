// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;


import "./TokenUnlockSchedule.sol";

contract LiquiditySchedule is TokenUnlockSchedule {
    // solhint-disable-next-line no-empty-blocks
    constructor(
      IERC20 token,
      address timelockController
    ) TokenUnlockSchedule(token, timelockController) {}

    function _initUnlockSchedule() internal override {
        unlockSchedule.push(UnlockScheduleItem(0 days, 2000));
        unlockSchedule.push(UnlockScheduleItem(30 days, 2222));
        unlockSchedule.push(UnlockScheduleItem(60 days, 2444));
        unlockSchedule.push(UnlockScheduleItem(90 days, 2667));
        unlockSchedule.push(UnlockScheduleItem(120 days, 2889));
        unlockSchedule.push(UnlockScheduleItem(150 days, 3111));
        unlockSchedule.push(UnlockScheduleItem(180 days, 3333));
        unlockSchedule.push(UnlockScheduleItem(210 days, 3556));
        unlockSchedule.push(UnlockScheduleItem(240 days, 3778));
        unlockSchedule.push(UnlockScheduleItem(270 days, 4000));
        unlockSchedule.push(UnlockScheduleItem(300 days, 4222));
        unlockSchedule.push(UnlockScheduleItem(330 days, 4444));
        unlockSchedule.push(UnlockScheduleItem(360 days, 4667));
        unlockSchedule.push(UnlockScheduleItem(390 days, 4889));
        unlockSchedule.push(UnlockScheduleItem(420 days, 5111));
        unlockSchedule.push(UnlockScheduleItem(450 days, 5333));
        unlockSchedule.push(UnlockScheduleItem(480 days, 5556));
        unlockSchedule.push(UnlockScheduleItem(510 days, 5778));
        unlockSchedule.push(UnlockScheduleItem(540 days, 6000));
        unlockSchedule.push(UnlockScheduleItem(570 days, 6222));
        unlockSchedule.push(UnlockScheduleItem(600 days, 6444));
        unlockSchedule.push(UnlockScheduleItem(630 days, 6667));
        unlockSchedule.push(UnlockScheduleItem(660 days, 6889));
        unlockSchedule.push(UnlockScheduleItem(690 days, 7111));
        unlockSchedule.push(UnlockScheduleItem(720 days, 7333));
        unlockSchedule.push(UnlockScheduleItem(750 days, 7556));
        unlockSchedule.push(UnlockScheduleItem(780 days, 7778));
        unlockSchedule.push(UnlockScheduleItem(810 days, 8000));
        unlockSchedule.push(UnlockScheduleItem(840 days, 8222));
        unlockSchedule.push(UnlockScheduleItem(870 days, 8444));
        unlockSchedule.push(UnlockScheduleItem(900 days, 8667));
        unlockSchedule.push(UnlockScheduleItem(930 days, 8889));
        unlockSchedule.push(UnlockScheduleItem(960 days, 9111));
        unlockSchedule.push(UnlockScheduleItem(990 days, 9333));
        unlockSchedule.push(UnlockScheduleItem(1020 days, 9556));
        unlockSchedule.push(UnlockScheduleItem(1050 days, 9778));
        unlockSchedule.push(UnlockScheduleItem(1080 days, 10000));
    }
}
