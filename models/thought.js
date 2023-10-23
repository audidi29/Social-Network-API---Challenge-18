const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [
    {
      reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

// Create a virtual field for reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Format timestamp using a custom function
thoughtSchema.set('toObject', { getters: true });

const dateFormat = (timestamp) => {
  return new Date(timestamp).toLocaleString();
};

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
