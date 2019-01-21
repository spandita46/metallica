var express = require('express');
var apiRouter = express.Router();

//Middle ware that is specific to this router
apiRouter.use(function timeLog(req, res, next) {
  console.log(`${Date.now()} : ${req.url}`);
  next();
});

// Define the home page route
apiRouter.get('/', function(req, res) {
  // Will be used to load swagger doc, later
  res.send('Use Valid API Endpoint');
});


module.exports = apiRouter;