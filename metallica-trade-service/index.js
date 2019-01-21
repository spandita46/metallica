/**
 * Set Up Process Environment, using config.json
 * For Production and Test Environment
 */
require("./config/config");

/**
 * Set Up db configuration, using configurations 
 * from process environment
  */
require('./db/mongoose');

const tradeResponder = require("./responders");


