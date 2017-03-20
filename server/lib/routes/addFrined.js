const Router = require('koa-router');
const User = require('../controllers/user');

const router = new Router();

router.post('/', async(ctx, next) => {
  const {
    id
  } = ctx.request.body;

  const user = await User.search(name);

  ctx.body = user;
  await next();
})

module.exports = router;