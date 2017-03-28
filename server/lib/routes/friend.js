const Router = require('koa-router');
const User = require('../controllers/user');

const router = new Router();

// 获取好友列表
router.post('/', async(ctx, next) => {
  const {
    id
  } = ctx.request.body;

  // 查询被加好友对象socketId
  const friendsList = await User.findFriend(id);

  ctx.body = {
    success: true,
    content: friendsList,
  };
  await next();
});

module.exports = router;