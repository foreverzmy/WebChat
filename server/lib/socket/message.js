const User = require('../controllers/user');
const Message = require('../controllers/message');

module.exports = function (socket) {
  socket
    .on('createMessage', msg => {
      messages.push(msg);
      // 向所有用户广播
      this.io.emit('messageAdded', msg);
    })
    // 接受用户发送的消息并转发
    .on('sendMsg', async msg => {
      const {
        from,
        to
      } = msg;
      const toSocketId = await User.findSocketId(to);

      // 将发送的消息存到数据库
      const newMsg = new Message(msg);
      const saveMsg = await newMsg.save();

      // 如果发送消息对象在线
      if (toSocketId !== null) {
        this.io.sockets.connected[toSocketId].emit('sendMsg', msg);
      } else { // 如果不在线，则不发送
      }

    })
    .on('sendGroupMsg', async msg => {
      const {
        from,
        to
      } = msg;


      // const toSocketId = await User.findSocketId(to);

      // // 将发送的消息存到数据库
      // const newMsg = new Message(msg);
      // const saveMsg = await newMsg.save();

      // // 如果发送消息对象在线
      // if (toSocketId !== null) {
      //   this.io.sockets.connected[toSocketId].emit('sendMsg', msg);
      // } else { // 如果不在线，则不发送
      // }

    })

}