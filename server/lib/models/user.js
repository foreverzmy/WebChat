const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  password: String,
  salt: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;