const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  createTime: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: String,
  salt: String,
  socketId: {
    type: String,
    default: null,
  },
  avatar: String,
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