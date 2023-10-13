const express = require('express');
const router = express.Router();

const { User } = require('../models');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single user by _id and populate thought and friend data
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Example GET route for /api/users
router.get('/api/users', (req, res) => {
  // Your logic to retrieve and respond with users
  // This is where you can define your custom logic for this route
  // For example, you can retrieve users with specific criteria
  // and respond with the filtered list of users.
});


module.exports = router;
