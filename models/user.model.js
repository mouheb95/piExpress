const mongoose = require('mongoose');
//var carpoolingSchema = require('./carpooling.model')
const Schema = mongoose.Schema;

const claimSchema = new Schema({
  title: {
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
  description: String,
  Carphoto: [String],
});

const scoreSchema = new Schema({
  Score: {
    trust: Number,
    operations: Number,
    time: Number,
    faults: Number,
    rating: Number,
    claim: Number,
    final: Number,
  }
})
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
  role: {
    type: String,
    enum: ['Driver', 'Passenger']
  },
  password: { type: String, required: false, minlength: 3 },
  linkFB: { type: String },
  address: { type: String },
  country: { type: String },
  birthdate: { type: Date },
  picture: { type: String },
  isSmoker: { type: Boolean },
  isConnected: { type: Boolean },
  phone: { type: String, minlength:8, maxlength:8 },
  isMotorizedl: { type: Boolean },
  function: { type: String }, // fech ya3mel fi 7yatou 
  claim: [claimSchema],
  vehicle: [vehiculeSchema],
  score: scoreSchema,
  Identitynumber: String,
  Identitypic: String,

},
  {
    timestamps: true,
  });

// Export the model
const User = mongoose.model('User', userSchema);


module.exports = User;