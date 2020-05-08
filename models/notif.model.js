const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./user.model').schema;
const carpooling = require('./carpooling.model').schema;

const notificationSchema = new Schema({
  sender: user,
  reciver: user,
  subject: String,
  content: String,
  post: carpooling,
  seen: Boolean
}, {
  timestamps: true
} )


// Export the model
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;