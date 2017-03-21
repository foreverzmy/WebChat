const Router = require('koa-router');
const User = require('../controllers/user');
const {
  io
} = require('../socket');

const router = new Router();

router.post('/friend', async(ctx, next) => {
  const {
    id
  } = ctx.request.body;

  // 查询被加好友对象socketId
  const friendsList = await User.findFriend(id);

  ctx.body = {
    success: true,
    list: friendsList,
  };
  await next();
});

router.post('/accept', async(ctx, next) => {
  const {
    from,
    to
  } = ctx.request.body;

  await User.saveNewFriend(from, to);
  await User.saveNewFriend(to, from);

  ctx.body = {
    success: true,
    message: '好友添加成功'
  }

  await next();

})


module.exports = router;