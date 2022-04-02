var utilsService = require("../utils/utils");
/* 
ON MEMORY, there is REWARD_DATA_SOURCE that holds the rewards for each user.

Datastructure of REWARD_DATA_SOURCE will be as following:
* 1) REWARD will be an json object that has 4 attributes: availableAt, expiresAt,redeemedAt,userId.
* 2) WEEKLY_REWARDS will be a map that uses START_OF_WEEK as KEY and contains the list of seven rewardObjs within this week.
* 3) REWARD_DATA_SOURCE will be a map that uses USER_ID as KEY and holds the list of WEEKLY_REWARDS.

*/
let USER_DATA_SOURCES = new Map(); //USER_ID as KEY
let rewardDataSources = new Map(); // USER_ID as KEY

/* Look for existing rewards for same UserId within same week
 * If yes, return this
 * If no, create rewards  from Sunday through to Saturaday
 */
let saveRewards = (param) => {
  let USER_ID = param.userId;
  let REQUESTED_AT = param.at;

  //Check old user or new one
  var user = USER_DATA_SOURCES.get(USER_ID);
  if (!user) {
    console.log("new user is created with ID: ", USER_ID);
    USER_DATA_SOURCES.set(USER_ID, { id: USER_ID });
  }

  //Look for existing rewards for same UserId within same week
  var startOfWeek = utilsService.getStartOfWeek(REQUESTED_AT);
  var endOfWeek = utilsService.getEndOfWeek(REQUESTED_AT);

  let oldData = getRewards(USER_ID, startOfWeek);
  if (oldData) return oldData;

  //create rewards  from Sunday through to Saturaday
  let sevenDaysRewards = createWeeklyRewards(USER_ID, startOfWeek, endOfWeek);

  let WEEKLY_REWARDS = new Map(); //START_OF_WEEK as KEY
  WEEKLY_REWARDS.set(startOfWeek.toISOString(), sevenDaysRewards);

  //Append new weekly rewards to existing ones of same user
  let existingUserRewardsList = rewardDataSources.get(USER_ID);
  if (existingUserRewardsList) {
    existingUserRewardsList.set(WEEKLY_REWARDS);
    WEEKLY_REWARDS = existingUserRewardsList;
  }

  //SAVE the Weekly Rewards
  rewardDataSources.set(USER_ID, WEEKLY_REWARDS);

  return sevenDaysRewards;
};

let createWeeklyRewards = (userId, startOfWeek, endOfWeek) => {
  console.log(
    "new seven days rewards are created for USER ID: " +
      userId +
      " from " +
      startOfWeek.toISOString() +
      " to " +
      endOfWeek.toISOString()
  );
  var sevenDaysRewards = [];

  var currentDate = new Date(startOfWeek);
  while (currentDate <= endOfWeek) {
    var availableAt = currentDate;
    var expiresAt = new Date(currentDate);
    expiresAt.setDate(currentDate.getDate() + 1);

    var temp = {
      availableAt: availableAt.toISOString(),
      expiresAt: expiresAt.toISOString(),
      redeemedAt: null,
      userId: userId,
    };

    sevenDaysRewards.push(temp);

    //increase current date by 1
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return sevenDaysRewards;
};

let getRewards = (userId, fromDate) => {
  //search old records for requested user
  let existingUserRewardsList = rewardDataSources.get(userId);
  if (!existingUserRewardsList) {
    return;
  }

  let existingWeeklyRewards = existingUserRewardsList.get(
    fromDate.toISOString()
  );

  return existingWeeklyRewards;
};

/* 
* 1) retrieve reward with userId and availableAt
* 2) check 
      - If redeemedAt is null and the expiresAt has not yet passed, set redeemedAt to current dateTime
      - If not,return error
* 
*/
let redeemRewards = (userId, fromDate) => {
  const startOfWeek = utilsService.getStartOfWeek(fromDate);
  const currentDateTime = new Date();
  var existingWeeklyRewards = getRewards(userId, startOfWeek);

  //User input the invalid reward
  if (!existingWeeklyRewards) {
    return;
  }

  var isValid = true;
  var result = {};
  var updatedWeeklyRewards = [];

  if (existingWeeklyRewards) {
    existingWeeklyRewards.map((reward) => {
      if (reward.availableAt === fromDate.toISOString()) {
        /*   Check the requested reward is still valid */
        if (
          utilsService.isValidReward(
            reward.redeemedAt,
            new Date(reward.expiresAt),
            currentDateTime
          )
        ) {
          reward.redeemedAt = currentDateTime;
          result = { ...reward };
        } else {
          //the reward is no longer valid. it has already expired
          isValid = false;
        }
      }

      updatedWeeklyRewards.push(reward);
    });

    if (!isValid) {
      return;
    }

    //Update the redeemed rewards for specific userId
    rewardDataSources.get(userId).set(startOfWeek, updatedWeeklyRewards);
  }

  return result;
};

module.exports = {
  saveRewards,
  getRewards,
  redeemRewards,
};
