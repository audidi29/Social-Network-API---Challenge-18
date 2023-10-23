const { Schema, Types, model } = require('mongoose');
const reactionSchema = new Schema({ 
  reactionId: {type: Schema.Types.ObjectId, default:()=>  new Types.ObjectId() },
  reactionBody: {type: String, required: true, maxlength: 280},
  userName: {type: String, required: true },
  createdAt: {type: Date, default: Date.now()}

}, {toJSON:{getter:true}, id:false})


const Reaction =  model('Reaction', reactionSchema )

module.exports = {Reaction, reactionSchema}