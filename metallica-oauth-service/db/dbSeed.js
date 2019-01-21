const { User } = require("../models/user");

const users = [
  {
    email: "test1@test.com",
    password: "test123",
    name: "Test 1"
  },
  {
    email: "test2@test.com",
    password: "test123",
    name: "Test 2"
  },
  {
    email: "test3@test.com",
    password: "test123",
    name: "Test 3"
  },
  {
    email: "test4@test.com",
    password: "test123",
    name: "Test 4"
  },
  {
    email: "test5@test.com",
    password: "test123",
    name: "Test 5"
  }
];

const seedUsers = () => {
  try {
    // Seeding USers
    User.findOne({}, (err, user) => {
      if (err) {
        throw err;
      }
      if (!user) {
        console.log(`Seeding Users`);
        users.forEach(dummyUser => {
          var user = new User(dummyUser);
          user
            .save()
            .then(createdUser => {
              console.log(`Seeded User : ${createdUser.email}`);
            })
            .catch(e => {
              console.log(`Failed To Seed User : ${dummyUser.email}`);
              console.log(e);
            });
        });
      } else {
        console.log(`Users Exists - Skipping Seeding`);
      }
    });
  } catch (error) {
    console.log(`Failed To Seed Users`);
    console.log(error);
  }
};

module.exports = {
  seedUsers
};
