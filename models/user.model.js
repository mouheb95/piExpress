const mongoose = require('mongoose');
var carpoolingSchema = require('./carpooling.model')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  email: { type: String, required: true, unique: true },
  role: {type: String},
  password: { type: String, required: true, minlength:3 },
  linkFB: { type: String },
  address: { type: String },
  country: { type: String },
  birthdate: { type: Date },
  picture: { type: String },
  isSmoker: { type: Number },
  isConnected: { type: Number },
  phone: { type: Number },  
  isMotorizedl: { type: Number },
  function: { type: String },   
  claim: [{object:{ 
    type: String, 
    required: true,
    trim: true}, description:String,  type:String }],
  vehicle: [{type:String, brand:String, option:String, nbre_places:Number, description:String}],
  carpooling: [carpoolingSchema]

}, {
  timestamps: true,
});

const user = mongoose.model('user', userSchema);

module.exports = user;