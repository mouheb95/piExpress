const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = require('./user.model').schema;
const carpoolingSchema = require('./carpooling.model').schema;

const evaluationSchema = new Schema({
    
    object: String,
    commantaire: String,
    
    sender:userSchema,
     
  });

  const claim = mongoose.model('claim', claimSchema);
  
module.exports = claim;