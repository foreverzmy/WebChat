const User = require('../controllers/user');
const Group = require('../controllers/group');
const Message = require('../controllers/message');
const GroupMessage = require('../controllers/group-message');

module.exports = function (socket) {
  socket
    .on('sendMsg', async msg => {
      const {
        group,
        from,
        to
      } = msg;

      // 好友消息
      if (group === false) {
        const toSocketId = await User.findSocketId(to);

        // 将发送的消息存到数据库
        const newMsg = new Message(msg);
        const saveMsg = await newMsg.save();

        // 如果发送消息对象在线
        if (toSocketId !== null) {
          this.io.sockets.connected[toSocketId].emit('sendMsg', msg);
        } else { // 如果不在线，则不发送
        }
      } else { //群组消息

        // 将发送的消息存到数据库
        const newMsg = new GroupMessage(msg);
        const saveMsg = await newMsg.save();

        const membersList = await Group.findMembers(to);

        for (let member of membersList) {
          console.log(member);
          if (member != from) {
            const toSocketId = await User.findSocketId(member);

            if (toSocketId !== null) {
              this.io.sockets.connected[toSocketId].emit('sendMsg', msg);
            } else { // 如果不在线，则不发送
            }
          }
        }
      }
    })


}