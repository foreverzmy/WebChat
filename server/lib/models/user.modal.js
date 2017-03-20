const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: String,
  salt: String,
  avatar: {
    type: String,
    default: '',
  },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  groups: [{
    type: Schema.Types.ObjectId,
    ref: 'Group',
  }],
  notification: [{
    type: Schema.Types.ObjectId,
    ref: 'Notification',
  }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;