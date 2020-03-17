const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
var userSchema = require('./user.model')


const Schema = mongoose.Schema;

const carpoolingSchema = new Schema({
  date: { 
  	type: Date, 
  },
  trage: {from:String, passage: String, to:String, insurance :{ type: String, price:Number}},
  parcel: [{  type: String, weight: Number, dimension: Number, quantity: Number}],
  comments: [{description: String}],
  user: [userSchema]

}, {
  timestamps: true
});




const carpooling = mongoose.model('carpooling', carpoolingSchema);

module.exports = carpooling;
