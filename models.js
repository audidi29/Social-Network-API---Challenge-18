const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const thoughtSchema = new mongoose.Schema({
  text: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
});

const reactionSchema = new mongoose.Schema({
  emoji: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  thought: { type: mongoose.Schema.Types.ObjectId, ref: 'Thought' },
});

const User = mongoose.model('User', userSchema);
const Thought = mongoose.model('Thought', thoughtSchema);
const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = { User, Thought, Reaction };
