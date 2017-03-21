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
  });
}