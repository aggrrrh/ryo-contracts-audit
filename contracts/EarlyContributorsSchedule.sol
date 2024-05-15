// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "./MerkleTokenUnlockSchedule.sol";

contract EarlyContributorsSchedule is MerkleTokenUnlockSchedule {
    // solhint-disable-next-line no-empty-blocks
    constructor(
        address _timelockController
    ) MerkleTokenUnlockSchedule(_timelockController) {}

    function _initUnlockSchedule() internal override {
        unlockSchedule.push(UnlockScheduleItem(0 days, 200));
        unlockSchedule.push(UnlockScheduleItem(210 days, 608));
        unlockSchedule.push(UnlockScheduleItem(240 days, 1017));
        unlockSchedule.push(UnlockScheduleItem(270 days, 1425));
        unlockSchedule.push(UnlockScheduleItem(300 days, 1832));
        unlockSchedule.push(UnlockScheduleItem(330 days, 2242));
        unlockSchedule.push(UnlockScheduleItem(360 days, 2650));
        unlockSchedule.push(UnlockScheduleItem(390 days, 3058));
        unlockSchedule.push(UnlockScheduleItem(420 days, 3467));
        unlockSchedule.push(UnlockScheduleItem(450 days, 3875));
        unlockSchedule.push(UnlockScheduleItem(480 days, 4283));
        unlockSchedule.push(UnlockScheduleItem(510 days, 4692));
        unlockSchedule.push(UnlockScheduleItem(540 days, 5100));
        unlockSchedule.push(UnlockScheduleItem(570 days, 5508));
        unlockSchedule.push(UnlockScheduleItem(600 days, 5917));
        unlockSchedule.push(UnlockScheduleItem(630 days, 6325));
        unlockSchedule.push(UnlockScheduleItem(660 days, 6733));
        unlockSchedule.push(UnlockScheduleItem(690 days, 7142));
        unlockSchedule.push(UnlockScheduleItem(720 days, 7550));
        unlockSchedule.push(UnlockScheduleItem(750 days, 7958));
        unlockSchedule.push(UnlockScheduleItem(780 days, 8367));
        unlockSchedule.push(UnlockScheduleItem(810 days, 8775));
        unlockSchedule.push(UnlockScheduleItem(840 days, 9183));
        unlockSchedule.push(UnlockScheduleItem(870 days, 9592));
        unlockSchedule.push(UnlockScheduleItem(900 days, 10000));
    }
}
