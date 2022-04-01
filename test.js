const { DAY } = require("./utils/constant");
const dateUtil = require("./utils/utils");

/**  Domain Background:
 ** Weekly Rewards will be considered from Sunday through to Saturday whenever the user requested for any day of the week .
 **/

/* TestCase [DAY ENUM has the same value that will return from new Date().getDay() method]:
     - return 0 to 6
     - input can be any day of the week (Monday to Sunday) in ISO date string format*/
test("Convert to the day of the week", () => {
  const sunday = dateUtil.getDayOfWeek("2022-03-27T14:48:00.000Z");
  const monday = dateUtil.getDayOfWeek("2022-03-28T14:48:00.000Z");
  const tuesday = dateUtil.getDayOfWeek("2022-03-29T14:48:00.000Z");
  const wednesday = dateUtil.getDayOfWeek("2022-03-30T14:48:00.000Z");
  const thursday = dateUtil.getDayOfWeek("2022-03-31T14:48:00.000Z");
  const friday = dateUtil.getDayOfWeek("2022-04-01T14:48:00.000Z");
  const saturaday = dateUtil.getDayOfWeek("2022-04-02T14:48:00.000Z");
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

  expect(dateUtil.getStartOfWeek(sunday)).toStrictEqual(expected);
  expect(dateUtil.getStartOfWeek(monday)).toStrictEqual(expected);
  expect(dateUtil.getStartOfWeek(tuesday)).toStrictEqual(expected);
  expect(dateUtil.getStartOfWeek(wednesday)).toStrictEqual(expected);
  expect(dateUtil.getStartOfWeek(thursday)).toStrictEqual(expected);
  expect(dateUtil.getStartOfWeek(friday)).toStrictEqual(expected);
  expect(dateUtil.getStartOfWeek(saturaday)).toStrictEqual(expected);
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

  expect(dateUtil.getEndOfWeek(sunday)).toStrictEqual(expected);
  expect(dateUtil.getEndOfWeek(monday)).toStrictEqual(expected);
  expect(dateUtil.getEndOfWeek(tuesday)).toStrictEqual(expected);
  expect(dateUtil.getEndOfWeek(wednesday)).toStrictEqual(expected);
  expect(dateUtil.getEndOfWeek(thursday)).toStrictEqual(expected);
  expect(dateUtil.getEndOfWeek(friday)).toStrictEqual(expected);
  expect(dateUtil.getEndOfWeek(saturaday)).toStrictEqual(expected);
});

/* TestCase: 
     - return Date with 00 hr , 00 minute, 00 second
     - input can be any day of the week (Monday to Sunday) in ISO date string format*/
test("Initialize Date To Midnight", () => {
  const dateIsoFormat = "2022-03-27T14:48:08.000Z";
  let expected = new Date("2022-03-27T00:00:00.000Z");
  let actual = new Date(dateUtil.initializeDateToMidnight(dateIsoFormat));

  expect(actual).toStrictEqual(expected);
});
