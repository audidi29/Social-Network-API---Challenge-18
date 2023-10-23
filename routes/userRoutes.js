const express = require('express');
const router = express.Router();
const userRoutes = express.Router();
const { UserModel } = require('../models/user');
const { ObjectId } = require('mongodb');

const { User } = require('express').Router();
const {
    getUsers, 
    createUser,
    getSingleUser,
    updateUser,
    deleteUser,
    createFriend,
    deleteFriend,
} = require('../controllers/userController'); // require('controllers/userController.js');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
router.route("/:userId/friends/:friendId").post(createFriend).delete(deleteFriend);

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
    // Generate a new ObjectId for the userId
    const userId = new ObjectId();

    // Create a new user with the provided data and the generated userId
    const newUser = new User({
      username: req.body.username,
      userId: userId, // Set the userId field
      // Other user properties
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;


