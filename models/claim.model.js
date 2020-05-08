const mongoose = require('mongoose');
//var carpoolingSchema = require('./carpooling.model')
const Schema = mongoose.Schema;
const userSchema = require('./user.model').schema;

const claimSchema = new Schema({
    
    object: String,
    description: String,
    comment: String,
    type:{
        type: String,
        enum: ['probleme', 'suggestion','autres']},

    
    etat: {
      type: String,
      enum: ['treated', 'pending']} ,
    author:userSchema,
     
  });

  const Claim = mongoose.model('claim', claimSchema);
  
module.exports = Claim;