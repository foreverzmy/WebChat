const GroupMessageDB = require('../models/groupMessage.modal');
const User = require('./user');

class GroupMessage {
  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key];
    }
  }

  async save() {
    const newGroupMessage = new GroupMessageDB({
      from: this.from,
      to: this.to,
      type: 'text',
      content: this.content
    });
    let savedMsg = '';
    try {
      savedMsg = await newGroupMessage.save();
    } catch (err) {
      throw err;
      return false;
    }
    return true;
  }

}

GroupMessage.findUnreadMsg = async function (id) {
  let UnReadMsgList = {};
  try {
    const groupList = await User.findGroupId(id);
    UnReadMsgList = await GroupMessageDB.find({
      to: {
        '$in': groupList
      }
    }).sort({
      createTime: 1
    });
  } catch (err) {
    throw err;
    return false;
  }
  return UnReadMsgList;
}

module.exports = GroupMessage;