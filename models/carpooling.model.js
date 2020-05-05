
const mongoose = require('mongoose');
//var carpoolingSchema = require('./carpooling.model')
const Schema = mongoose.Schema;
const userSchema = require('./user.model').schema;


const parcelSchema = new Schema({
  photos: String,
  categorie: String,
  weight: Number,
  dimension: Number,
  quantity: Number,
 // insurance: [insuranceSchema]
});

const appointmentSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
},
  date: Date,
  place: String,
  code1: String,
  code2: String
});

const commentsSchema = new Schema({
  description: String,
  author: userSchema,
  rating: String
}, {
  timestamps: true
});
const carpoolingSchema = new Schema({
  price: Number,
  daily: Boolean,
  fromDate: {
    type: Date,
    min: '2019-09-28',
    max: '2050-05-23'
  },
  toDate: {
    type: Date,
    min: '2019-09-28',
    max: '2050-05-23'
  },
  people_parcel_Carpooling: {
    type: String,
    enum: ['People', 'Parcel'],
  },
  offre_demand_Carpooling: {
    type: String,
    enum: ['Offer', 'Demand'],
  },
  disponibility: Number,
  etat: {
    type: String,
    enum: ['Full', 'Published', 'Cancled', 'Progress'],
  },
  title: String,
  description: String,
  appointment: [appointmentSchema],
  trage: {
    from: String,
    to: String,
  },
  parcel: parcelSchema
  ,
  comments: [commentsSchema],
  author: userSchema,
  
  clients: [userSchema],

}, {
  timestamps: true
});

// Export the model

const Carpooling = mongoose.model('carpooling', carpoolingSchema);

module.exports = Carpooling;