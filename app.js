var express = require("express");
var app = express();
var services = require("./services/manage-rewards.js");
var DATE_UTILS = require("./utils/utils");

app.get("/", function (req, res) {
  res.send("Hello World");
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});

app.get("/users/:id/rewards", async (req, res) => {
  var at = req.query.at;
  var userId = req.params.id;

  var result = services.saveRewards({ userId, at });
  res.status(200).send({ data: result });
});

app.patch("/users/:id/rewards/:availableAt/redeem", async (req, res) => {
  let userId = req.params.id;

  let rewardDate = DATE_UTILS.initializeDateToMidnight(req.params.availableAt);
  var result = services.redeemRewards(userId, rewardDate);
  if (!result) {
    res
      .status(200)
      .send({ error: { message: "This reward is already expired" } });
  } else {
    //prepare to get return data structure
    delete result.userId;
    res.status(200).send({ data: result });
  }
});
