const jwt = require('jsonwebtoken');

const User = require('./controllers/user');

module.exports = function (server) {

  let messages = ['hello'];

  this.io.on('connection', socket => {
    socket
      .on('getUnreadMessage', client => {
        // 向当前用户广播
        User.saveSocketId(client, socket.id);
        socket.emit('allUnredaMessage', messages);
      })
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

        // 如果发送消息对象在线
        if (toSocketId) {
          this.io.sockets.connected[toSocketId].emit('sendMsg', msg);
        } else { // 如果不在线，则把消息存入数据库

        }
      })
  });
}