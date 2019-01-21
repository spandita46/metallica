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

/**
 * Seeding Databases
 */
const dbSeeder = require('./db/dbSeed');
dbSeeder.seedCommodities();
dbSeeder.seedLocations();
dbSeeder.seedCounterParties();

const refDataResponder = require("./responders");


