const express = require('express');
const router = express.Router();

const { Thought, User } = require('../models');

// POST a new thought
router.post('/', async (req, res) => {
  try {
    const thought = await Thought.create(req.body);

    // Find the user who created the thought and update their thoughts array
    const user = await User.findByIdAndUpdate(
      thought.username, // Assuming the username is stored as the ID in the User model
      { $push: { thoughts: thought._id } },
      { new: true }
    );

    res.status(201).json(thought);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

// Add more routes or functionality here if needed

module.exports = router;
