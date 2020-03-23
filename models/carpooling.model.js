
const mongoose = require('mongoose');
//var carpoolingSchema = require('./carpooling.model')
const Schema = mongoose.Schema;
const userSchema = require('./user.models').schema;

const insuranceSchema = new Schema({
    type: String,
    price: Number
  });
  const parcelSchema = new Schema({
    type: String,
    weight: Number,
    dimension: Number,
    quantity: Number
  });
  
  const carpoolingSchema = new Schema({
    date: {
      type: Date, default: Date(),
    },
    trage: {
      from: String,
      passage: String,
      to: String,
      insurance: [insuranceSchema]
    },
    parcel: [parcelSchema]
    ,
    comments: [
      {
        description: String
      }
    ],
    user: [userSchema]
  
  }, {
    timestamps: true
  });
  
  
  
  // Export the model
 
  const Carpooling = mongoose.model('carpooling', carpoolingSchema);
  
  module.exports =  Carpooling;