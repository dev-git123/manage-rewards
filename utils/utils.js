const { DAY } = require("./constant");

function getDayOfWeek(d) {
  return new Date(d).getDay();
}

function getStartOfWeek(d) {
  let startOfWeek = initializeDateToMidnight(d);
  startOfWeek.setDate(startOfWeek.getDate() - getDayOfWeek(d));

  return startOfWeek;
}

function getEndOfWeek(d) {
  let endOfWeek = initializeDateToMidnight(d);
  endOfWeek.setDate(endOfWeek.getDate() + (DAY.Saturaday - getDayOfWeek(d)));

  return endOfWeek;
}

function initializeDateToMidnight(d) {
  let param = new Date(d);
  param.setUTCHours(0, 0, 0, 0);

  return param;
}

function isValidReward(redeemedAt, expiresAt, currentDateTime) {
  return redeemedAt === null && expiresAt >= currentDateTime;
}

module.exports = {
  getDayOfWeek,
  getStartOfWeek,
  getEndOfWeek,
  initializeDateToMidnight,
  isValidReward,
};
