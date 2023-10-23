const connection = require('../config/connection');
const User = require('../models/user');

// Start the seeding runtime timer
console.time('seeding');

// Creates a connection to mongodb
connection.once('open', async () => {
  // Delete the collections if they exist
  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }

   // Wait for the users to be inserted into the database
  await User.collection.insertOne({
    userName: "Olivia",
    email: "olivat@test.com"
  })

  console.timeEnd('seeding complete 🌱');
  process.exit(0);
});