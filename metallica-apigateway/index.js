/**
 * Module dependencies.
 */
const express = require("express");
const bodyParser = require("body-parser");
const _configs = require("./configs");
const _apiRoutes = require("./routes/apiRoutes");
const _authRoutes = require("./routes/authRoutes");
const _tradeRoutes = require("./routes/tradeRoutes");
const _refDataRoutes = require("./routes/refDataRoutes");

/**
 * Create Express server.
 */
const app = express();

/**
 * Set express Configurations.
 */
app.set("host", _configs.HOST);
app.set("port", _configs.PORT);

/**
 * Middlewares
 */
// CORS Middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(function timeLog(req, res, next) {
  console.log(`${Date.now()} : ${req.method} : ${req.url}`);
  next();
});
/**
 * Middlewares
 */
app.use(bodyParser.json());

/**
 * Routes
 */
app.use(_authRoutes);
app.use("/refdata/", _refDataRoutes);
app.use(_tradeRoutes);
app.use(_apiRoutes);
/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(`Gateway is running at ${app.get("host")}:${app.get("port")}`);
  console.log("Press CTRL-C to stop\n");
});

module.exports = app;
