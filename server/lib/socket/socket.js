const jwt = require('jsonwebtoken');

const User = require('../controllers/user');
const Message = require('../controllers/message');
const messageSocket = require('./message');

module.exports = function (server) {

  this.io.on('connection', socket => {
    socket
      // 监听用户退出事件
      .on('disconnect', client => {
        User.delSocketId(socket.id);
      })
      .on('getUnreadMsg', async client => {
        // 向当前用户广播
        const UnreadMsg = await Message.findUnreadMsg(client);
        User.saveSocketId(client, socket.id);
        socket.emit('allUnreadMsg', UnreadMsg);
      })

    messageSocket(socket);
  });
}