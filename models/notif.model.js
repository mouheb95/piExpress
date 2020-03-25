const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./user.models').schema;

const notificationSchema = new Schema({
  sender: user,
  reciver: user,
  subject: String,
  content: String
}, {
  timestamps: true
} )


// Export the model
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;