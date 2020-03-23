const mongoose = require('mongoose');
//var carpoolingSchema = require('./carpooling.model')
const Schema = mongoose.Schema;

const objectSchema = new Schema({
  object: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  type: String
});
const vehiculeSchema = new Schema({
  type: String,
  brand: String,
  option: String,
  nbre_places: Number,
  description: String
});
const userSchema = new Schema({
  firstname: {
    type: String,
    required: false,
    trim: true,
    minlength: 2
  },
  lastname: {
    type: String,
    required: false,
    trim: true,
    minlength: 2
  },
  email: { type: String, required: false, unique: false },
  role: { type: String },
  password: { type: String, required: false, minlength: 3 },
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
  claim: [objectSchema],
  vehicle: [vehiculeSchema],
  //carpooling: [carpoolingSchema] usless

},
  {
    timestamps: true,
  });

// Export the model
const User = mongoose.model('User', userSchema);


module.exports =  User;