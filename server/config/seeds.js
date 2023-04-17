// Used the following link to create this:  https://plainenglish.io/blog/seeding-mongodb-database-from-node-the-simplest-way

const mongoose = require('mongoose');
const { User } = require('../models');

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MONGO CONNECTION OPEN!!!');
  })
  .catch((err) => {
    console.log(err);
  });

  const seedUsers = [
    {
      userName: 'TestUser01',
      email: 'testuser01@gmail.com',
      password: '123456',
      bark: [{
        description: "This is my very first bark!!!",
        likes: 8
      }]
    },
    {
      userName: 'TestUser02',
      email: 'testuser02@gmail.com',
      password: '123456',
      bark: [{
        description: "I adore this site",
        likes: 87
      }]
    },
    {
      userName: 'TestUser02',
      email: 'testuser03@gmail.com',
      password: '123456',
      bark: [{
        description: "I can't believe it",
        likes: 1
      }]
    },
  ];

  const seedDB = async () => {
    await User.deleteMany({});
    await User.insertMany(seedUsers);
  };

  seedDB().then(() => {
    console.log(seedUsers);
    mongoose.connection.close();
  });
