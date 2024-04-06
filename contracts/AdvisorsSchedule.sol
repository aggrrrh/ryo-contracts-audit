// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "./MerkleTokenUnlockSchedule.sol";

contract AdvisorsSchedule is MerkleTokenUnlockSchedule {
    // solhint-disable-next-line no-empty-blocks
    constructor(
      IERC20 _token,
      address _timelockController
    ) MerkleTokenUnlockSchedule(_token, _timelockController) {}

    function _initUnlockSchedule() internal override {
        unlockSchedule.push(UnlockScheduleItem(210 days, 333));
        unlockSchedule.push(UnlockScheduleItem(240 days, 667));
        unlockSchedule.push(UnlockScheduleItem(270 days, 1000));
        unlockSchedule.push(UnlockScheduleItem(300 days, 1333));
        unlockSchedule.push(UnlockScheduleItem(330 days, 1667));
        unlockSchedule.push(UnlockScheduleItem(360 days, 2000));
        unlockSchedule.push(UnlockScheduleItem(390 days, 2333));
        unlockSchedule.push(UnlockScheduleItem(420 days, 2667));
        unlockSchedule.push(UnlockScheduleItem(450 days, 3000));
        unlockSchedule.push(UnlockScheduleItem(480 days, 3333));
        unlockSchedule.push(UnlockScheduleItem(510 days, 3667));
        unlockSchedule.push(UnlockScheduleItem(540 days, 4000));
        unlockSchedule.push(UnlockScheduleItem(570 days, 4333));
        unlockSchedule.push(UnlockScheduleItem(600 days, 4667));
        unlockSchedule.push(UnlockScheduleItem(630 days, 5000));
        unlockSchedule.push(UnlockScheduleItem(660 days, 5333));
        unlockSchedule.push(UnlockScheduleItem(690 days, 5667));
        unlockSchedule.push(UnlockScheduleItem(720 days, 6000));
        unlockSchedule.push(UnlockScheduleItem(750 days, 6333));
        unlockSchedule.push(UnlockScheduleItem(780 days, 6667));
        unlockSchedule.push(UnlockScheduleItem(810 days, 7000));
        unlockSchedule.push(UnlockScheduleItem(840 days, 7333));
        unlockSchedule.push(UnlockScheduleItem(870 days, 7667));
        unlockSchedule.push(UnlockScheduleItem(900 days, 8000));
        unlockSchedule.push(UnlockScheduleItem(930 days, 8333));
        unlockSchedule.push(UnlockScheduleItem(960 days, 8667));
        unlockSchedule.push(UnlockScheduleItem(990 days, 9000));
        unlockSchedule.push(UnlockScheduleItem(1020 days, 9333));
        unlockSchedule.push(UnlockScheduleItem(1050 days, 9667));
        unlockSchedule.push(UnlockScheduleItem(1080 days, 10000));
    }
}
