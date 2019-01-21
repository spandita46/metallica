const { Commodity } = require("../models/commodity");
const { Location } = require("../models/location");
const { CounterParty } = require("../models/counterParty");

const refData = {
  commodities: [
    {
      code: "AL",
      description: "Aluminum"
    },
    {
      code: "ZN",
      description: "Zinc"
    },
    {
      code: "CU",
      description: "Copper"
    },
    {
      code: "AU",
      description: "Gold"
    },
    {
      code: "AG",
      description: "Silver"
    }
  ],
  locations: [
    {
      code: "LN",
      description: "London"
    },
    {
      code: "NY",
      description: "New York"
    },
    {
      code: "SG",
      description: "Singapore"
    },
    {
      code: "DN",
      description: "Denver"
    }
  ],
  counterParties: [
    {
      code: "Lorem",
      description: "Lorem"
    },

    {
      code: "Ipsum",
      description: "Ipsum"
    },

    {
      code: "Dolor",
      description: "Dolor"
    },

    {
      code: "Amet",
      description: "Amet"
    }
  ]
};

const seedCommodities = () => {
  try {
    // Seeding Commodity
    Commodity.findOne({}, (err, commodity) => {
      if (err) {
        throw err;
      }
      if (!commodity) {
        Commodity.collection.insertMany(refData.commodities, (err, result) => {
          if (err) {
            throw err;
          }
          console.log(
            `Seeded Commodities - Inserted ${result.insertedCount} Commoditis`
          );
        });
      } else {
        console.log(`Not Seeding -  Commodities Exist`);
      }
    });
  } catch (error) {
    console.log(`Failed To Seed Commodities`);
    console.log(error);
  }
};

const seedLocations = () => {
  try {
    // Seeding Locations
    Location.findOne({}, (err, location) => {
      if (err) {
        throw err;
      }
      if (!location) {
        Location.collection.insertMany(refData.locations, (err, result) => {
          if (err) {
            throw err;
          }
          console.log(
            `Seeded Commodities - Inserted ${result.insertedCount} Locations`
          );
        });
      } else {
        console.log(`Not Seeding -  Locations Exist`);
      }
    });
  } catch (error) {
    console.log(`Failed To Seed Locations`);
    console.log(error);
  }
};

const seedCounterParties = () => {
  try {
    // Seeding Locations
    CounterParty.findOne({}, (err, counterParty) => {
      if (err) {
        throw err;
      }
      if (!counterParty) {
        CounterParty.collection.insertMany(
          refData.counterParties,
          (err, result) => {
            if (err) {
              throw err;
            }
            console.log(
              `Seeded Commodities - Inserted ${
                result.insertedCount
              } CounterParties`
            );
          }
        );
      } else {
        console.log(`Not Seeding -  CounterParties Exist`);
      }
    });
  } catch (error) {
    console.log(`Failed To Seed CounterParties`);
    console.log(error);
  }
};

module.exports = {
  seedCommodities,
  seedCounterParties,
  seedLocations
};
