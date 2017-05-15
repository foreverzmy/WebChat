const Router = require('koa-router');
const User = require('../controllers/user');
const {
  io
} = require('../../app');

const router = new Router();

// 申请加为好友
router.post('/', async(ctx, next) => {
  const {
    from,
    to
  } = ctx.request.body;

  // 查询被加好友对象socketId
  const toSocketId = await User.findSocketId(to);

  // 如果被加好友对象在线
  if (toSocketId) {
    const fromUser = await User.findById(from);

    const message = {
      type: 'add',
      email: fromUser.email,
      id: fromUser._id,
    }
    io.sockets.connected[toSocketId].emit('notice', message);

  } else { // 如果不在线，则把消息存入数据库
  }

  ctx.body = {
    success: true,
    message: '请求已发送'
  };
  await next();
});

// 同意好友申请
router.post('/accept', async(ctx, next) => {
  const {
    from,
    to
  } = ctx.request.body;

  await User.saveNewFriend(from, to);
  await User.saveNewFriend(to, from);

  const toSocketId = await User.findSocketId(to);

  // 如果被加好友对象在线
  if (toSocketId) {
    const fromUser = await User.findById(from);

    const message = {
      type: 'addAccept',
      email: fromUser.email,
      id: fromUser._id,
    }

    io.sockets.connected[toSocketId].emit('notice', message);
  } else { // 如果不在线，则把消息存入数据库

  }

  ctx.body = {
    success: true,
    message: '好友添加成功'
  }

  await next();

})


module.exports = router;