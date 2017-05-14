const User = require('../controllers/user');
const Message = require('../controllers/message');
const GroupMessage = require('../controllers/group-message');
const messageSocket = require('./message');

module.exports = function () {

  this.io.on('connection', socket => {
    socket
      // 监听用户退出事件
      .on('disconnect', () => {
        User.delSocketId(socket.id);
      })
      .on('getUnreadMsg', async client => {
        // 向当前用户广播
        const UnreadMsg = await Message.findUnreadMsg(client);

        const UnreadGroupMsg = await GroupMessage.findUnreadMsg(client);

        console.log(client, socket.id)
        User.saveSocketId(client, socket.id);
        socket.emit('allUnreadMsg', {
          message: UnreadMsg,
          groupMsg: UnreadGroupMsg
        });
      });

    messageSocket(socket);
  });
}