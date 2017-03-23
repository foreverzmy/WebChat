const Router = require('koa-router');
const User = require('../controllers/user');

const router = new Router();

router.post('/', async(ctx, next) => {
  const {
    name,
    range
  } = ctx.request.body;

  const user = await User.search(name);

  if (!user[0]) {
    ctx.body = {
      success: false
    }
  } else {
    ctx.body = {
      success: true,
      content: user
    }
  }
  await next();
})

module.exports = router;