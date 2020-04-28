var express = require("express");
var app = express();
var api = require("./api/api");
var config = require("./config/config");
// db.url is different depending on NODE_ENV
require("mongoose").connect(config.db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
if (config.seed) require("./utils/seed");

require("./middleware/appMiddleware")(app);

app.get("/", function (req, res) {
  res.sendFile(`${__dirname}/client/index.html`, function (err) {
    if (err) {
      res.status(404).json({
        message: "File not found",
        data: {},
      });
    }
  });
});
app.use("/api", api);
app.use("/auth", require("./auth/routes"));
app.use(function (err, req, res, next) {
  if (err) {
    console.log(err.message);
    res.status(500).json({
      message: "An unexpected error has occured",
      data: {
        error: err.message,
      },
    });
  }
});

module.exports = app;
