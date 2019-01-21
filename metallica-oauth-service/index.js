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
 * Seeding Default Users  
 */
const dbSeeder = require('./db/dbSeed');
dbSeeder.seedUsers();

const authResponder = require("./responders");


