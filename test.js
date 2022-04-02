const { DAY } = require("./utils/constant");
const utilsService = require("./utils/utils");

/** Business Background:
 ** Weekly Rewards will be considered from Sunday through to Saturday whenever the user requested for any day of the week .
 **/

/* TestCase [DAY ENUM has the same value that will return from new Date().getDay() method]:
     - return 0 to 6
     - input can be any day of the week (Monday to Sunday) in ISO date string format*/
test("Convert to the day of the week", () => {
  const sunday = utilsService.getDayOfWeek("2022-03-27T14:48:00.000Z");
  const monday = utilsService.getDayOfWeek("2022-03-28T14:48:00.000Z");
  const tuesday = utilsService.getDayOfWeek("2022-03-29T14:48:00.000Z");
  const wednesday = utilsService.getDayOfWeek("2022-03-30T14:48:00.000Z");
  const thursday = utilsService.getDayOfWeek("2022-03-31T14:48:00.000Z");
  const friday = utilsService.getDayOfWeek("2022-04-01T14:48:00.000Z");
  const saturaday = utilsService.getDayOfWeek("2022-04-02T14:48:00.000Z");
  expect(sunday).toBe(DAY.Sunday);
  expect(monday).toBe(DAY.Monday);
  expect(tuesday).toBe(DAY.Tuesday);
  expect(wednesday).toBe(DAY.Wednesday);
  expect(thursday).toBe(DAY.Thursday);
  expect(friday).toBe(DAY.Friday);
  expect(saturaday).toBe(DAY.Saturaday);
});

/* TestCase: 
     - return Sunday
     - input can be any day of the week (Monday to Sunday) in ISO date string format*/
test("GET START OF THE WEEK", () => {
  const sunday = "2022-03-27T14:48:00.000Z";
  const monday = "2022-03-28T14:48:00.000Z";
  const tuesday = "2022-03-29T14:48:00.000Z";
  const wednesday = "2022-03-30T14:48:00.000Z";
  const thursday = "2022-03-31T14:48:00.000Z";
  const friday = "2022-04-01T14:48:00.000Z";
  const saturaday = "2022-04-02T14:48:00.000Z";

  let expected = new Date(sunday);
  expected.setUTCHours(0, 0, 0, 0); //initialize Date To Midnight

  expect(utilsService.getStartOfWeek(sunday)).toStrictEqual(expected);
  expect(utilsService.getStartOfWeek(monday)).toStrictEqual(expected);
  expect(utilsService.getStartOfWeek(tuesday)).toStrictEqual(expected);
  expect(utilsService.getStartOfWeek(wednesday)).toStrictEqual(expected);
  expect(utilsService.getStartOfWeek(thursday)).toStrictEqual(expected);
  expect(utilsService.getStartOfWeek(friday)).toStrictEqual(expected);
  expect(utilsService.getStartOfWeek(saturaday)).toStrictEqual(expected);
});

/* TestCase: 
     - return Saturaday
     - input can be any day of the week (Monday to Sunday) in ISO date string format*/
test("GET END OF THE WEEK", () => {
  const sunday = "2022-03-27T14:48:00.000Z";
  const monday = "2022-03-28T14:48:00.000Z";
  const tuesday = "2022-03-29T14:48:00.000Z";
  const wednesday = "2022-03-30T14:48:00.000Z";
  const thursday = "2022-03-31T14:48:00.000Z";
  const friday = "2022-04-01T14:48:00.000Z";
  const saturaday = "2022-04-02T14:48:00.000Z";

  let expected = new Date(saturaday);
  expected.setUTCHours(0, 0, 0, 0); //initialize Date To Midnight

  expect(utilsService.getEndOfWeek(sunday)).toStrictEqual(expected);
  expect(utilsService.getEndOfWeek(monday)).toStrictEqual(expected);
  expect(utilsService.getEndOfWeek(tuesday)).toStrictEqual(expected);
  expect(utilsService.getEndOfWeek(wednesday)).toStrictEqual(expected);
  expect(utilsService.getEndOfWeek(thursday)).toStrictEqual(expected);
  expect(utilsService.getEndOfWeek(friday)).toStrictEqual(expected);
  expect(utilsService.getEndOfWeek(saturaday)).toStrictEqual(expected);
});

/* TestCase: 
     - return Date with 00 hr , 00 minute, 00 second
     - input can be any day of the week (Monday to Sunday) in ISO date string format*/
test("Initialize Date To Midnight", () => {
  const dateIsoFormat = "2022-03-27T14:48:08.000Z";
  let expected = new Date("2022-03-27T00:00:00.000Z");
  let actual = new Date(utilsService.initializeDateToMidnight(dateIsoFormat));

  expect(actual).toStrictEqual(expected);
});

/* TestCase:  Check if redeemedAt is null and the expiresAt has not yet passed
     - if yes, return true
     - if not, return false */
describe("Valid Reward Points", () => {
  it("Redeemed at the expiry Date", () => {
    //when
    var redeemedAt = null;
    var expiredAt = new Date("2022-04-25T00:00:00.000Z");
    var currentTime = new Date("2022-04-25T00:00:00.000Z");

    //then
    let actual = utilsService.isValidReward(redeemedAt, expiredAt, currentTime);
    expect(actual).toBe(true);
  });

  it("Redeemed before the expiry Date", () => {
    //when
    var redeemedAt = null;
    var expiredAt = new Date("2022-04-25T00:00:00.000Z");
    var currentTime = new Date("2022-04-23T00:00:00.000Z");

    //then
    let actual = utilsService.isValidReward(redeemedAt, expiredAt, currentTime);
    expect(actual).toBe(true);
  });

  it("Redeemed after the expiry Date", () => {
    //when
    var redeemedAt = null;
    var expiredAt = new Date("2022-04-22T00:00:00.000Z");
    var currentTime = new Date("2022-04-23T00:00:00.000Z");

    //then
    let actual = utilsService.isValidReward(redeemedAt, expiredAt, currentTime);
    expect(actual).toBe(false);
  });

  it("Redeemed the rewards that has already redeemed", () => {
    //when
    var redeemedAt = "2022-04-22T00:00:00.000Z";
    var expiredAt = new Date("2022-05-18T00:00:00.000Z");
    var currentTime = new Date("2022-04-23T00:00:00.000Z");

    //then
    let actual = utilsService.isValidReward(redeemedAt, expiredAt, currentTime);
    expect(actual).toBe(false);
  });
});
