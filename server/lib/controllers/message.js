const MessageDB = require('../models/message.modal');

class Message {
  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key];
    }
  }

  async save() {
    const newMessage = new MessageDB({
      from: this.from,
      to: this.to,
      type: 'text',
      content: this.content
    });
    let savedMsg = '';
    try {
      savedMsg = await newMessage.save();
    } catch (err) {
      throw err;
      return false;
    }
    return true;
  }

}

Message.findUnreadMsg = async function (id) {
  let UnReadMsgList = {};
  try {
    UnReadMsgList = await MessageDB.find({
      isRead: false,
      "$or": [{
        from: id
      }, {
        to: id
      }]
    }).sort({
      createTime: 1
    });
  } catch (err) {
    throw err;
    return false;
  }
  return UnReadMsgList;
}

module.exports = Message;