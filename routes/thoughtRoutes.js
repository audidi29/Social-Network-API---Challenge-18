const express = require('express');
const router = express.Router();
const thoughtRoutes = express.Router();


const mongoose = require('mongoose');
// const { Thought, User } = require('..');
const { Thought, User } = require('../models');
// const User = require('../models/user');
// const Thought = require('../models/thought');

// POST a new thought
router.post('/', async (req, res) => {
  try {
    const thought = await Thought.create(req.body);

    // Verify that the user exists
    const user = await User.findOne({ userName: thought.username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add the thought's _id to the user's thoughts array
    user.thoughts.push(thought._id);

    // Save the user with the updated thoughts array
    await user.save();

    res.status(201).json(thought);
  } catch (err) {
    console.error('Error creating thought:', err);
    res.status(400).json({ error: err.message });
  }
});

// GET all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a single thought by _id
router.get('/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT (update) a thought by _id
router.put('/:thoughtId', async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    res.json(updatedThought);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a thought by _id
router.delete('/:thoughtId', async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);

    if (!deletedThought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    // Remove the thought from the user's thoughts array
    await User.findByIdAndUpdate(
      deletedThought.username, // Assuming the username is stored as the ID in the User model
      { $pull: { thoughts: deletedThought._id } }
    );

    res.json(deletedThought);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Define a route to get a user's friends by userName or _id
router.get('/friends/:identifier', async (req, res) => {
  try {
    const identifier = req.params.identifier; // Get the userName or _id from the URL

    // Find the user by userName or _id
    const user = await User.findOne({ $or: [{ userName: identifier }, { _id: identifier }] });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get the list of friend IDs from the user's document
    const friendIds = user.friends;

    // Find the friend details using the list of IDs
    const friends = await User.find({ _id: { $in: friendIds } });

    res.json(friends);
  } catch (err) {
    console.error("Error fetching friends:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
