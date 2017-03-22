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
    return newMessage._id;
  }

}

module.exports = Message;