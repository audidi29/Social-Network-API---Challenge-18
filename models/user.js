const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     unique: true,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     match: [/.+@.+\..+/, 'Please enter a valid email address'],
//   },
//   thoughts: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Thought',
//     },
//   ],
//   friends: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//     },
//   ],
// });

// // Create a virtual called friendCount
// userSchema.virtual('friendCount').get(function () {
//   return this.friends.length;
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;

const { Schema, model } = require('mongoose');

const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

const userSchema = new  mongoose.Schema({
    userName: { type: String, required: true, unique: true, trim: true},
    email: { type: String, required: true, unique: true, match: emailRegex },
    thoughts: [{type: Schema.Types.ObjectId, ref: "Thought"}],
    friends: [{type: Schema.Types.ObjectId, ref: "User"}],
    
}, {toJSON:{virtuals: true, },id:false, });
userSchema.virtual("friendCount").get(function(){
   return this.friends.length; 
});

//const User = model('User', userSchema);
const User = mongoose.model('User', userSchema);

module.exports = User;