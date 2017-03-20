const socket = require('socket.io');

module.exports = function (server) {
  const io = socket(server);

  let messages = ['hello'];

  io.on('connection', socket => {
    socket
      .on('getUnreadMessage', client => {
        // 向当前用户广播
        socket.emit('allUnredaMessage', messages);
      })
      .on('createMessage', msg => {
        messages.push(msg);
        // 向所有用户广播
        io.emit('messageAdded', msg);
      })
  });
}