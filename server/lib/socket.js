const socket = require('socket.io');

module.exports = function(server) {
  const io = socket(server);

  let messages = ['hello'];

  io.on('connection', socket => {
    socket
      .on('getAllMessage', () => {
        // 向当前用户广播
        socket.emit('allMessage', messages);
      })
      .on('createMessage', msg => {
        messages.push(msg);
        // 向所有用户广播
        io.emit('messageAdded', msg);
      })
  });
}
