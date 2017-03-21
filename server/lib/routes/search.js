const Router = require('koa-router');
const User = require('../controllers/user');
const jwt = require('jsonwebtoken');

const router = new Router();

router.post('/', async(ctx, next) => {
  const {
    name,
    range
  } = ctx.request.body;

  const user = await User.search(name);
  console.log(this);

  ctx.body = user;
  await next();
})

module.exports = router;