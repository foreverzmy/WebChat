const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  createTime: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    trim: true,
    unique: true,
    match: /^[-_0-9a-z\u4e00-\u9eff]{1,16}$/i,
  },
  // 公告
  announcement: [{
    type: String,
    default: '欢迎每位同学的到来',
    announcementPublisher: Schema.Types.ObjectId,
    announcementTime: {
      type: Date,
      default: Date.now,
    }
  }],
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'GroupMessage',
  }],
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;