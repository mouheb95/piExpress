const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    password: {type: String},
    role: {type: String},
});


// Export the model
module.exports = mongoose.model('User', UserSchema);

//export const User = mongoose.model('User', UserSchema);