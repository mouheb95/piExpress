
const mongoose = require('mongoose');
//var carpoolingSchema = require('./carpooling.model')
const Schema = mongoose.Schema;


const insuranceSchema = new Schema({
  buyingprice: Number,
  realprice: Number,
  age: Number,
  billphoto: String,
  categorie: {
    type: String,
    enum: ['Electronic', 'Vehicle','sports','mediacl','clothes']
  },
  proposedtopay: Number,
  insuranceprice: Number,
  contract: String,
  etat: {
    type: String,
    enum: ['accepted', 'rejected']
  },
  carpooling: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Carpooling'
},  
});

// Export the model

const Insurance = mongoose.model('insurance', insuranceSchema);

module.exports = Insurance;