const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/social_network_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import the User model
const User = require('../models/user');

// Export connection 
module.exports = mongoose.connection;