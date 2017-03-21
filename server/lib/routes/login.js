const Router = require('koa-router');
const User = require('../controllers/user');
const jwt = require('jsonwebtoken');
const SHA256 = require('sha256');

const CONFIG = require('../config');

const router = new Router();

router.get('/', async(ctx, next) => {
  if (ctx.cookies.get('jwt')) {
    let token = jwt.decode(ctx.cookies.get('jwt'));
    if (token.id) {
      let result = await User.findById(token.id);
      if (result && result._id) {
        ctx.status = 200;
        ctx.body = {
          success: true,
          userInfo: {
            id: result._id,
            email: result.email
          }
        };
      }
    } else {
      ctx.cookies.set('jwt', null, {
        overwrite: true,
        expires: new Date()
      });
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: '用户验证失败'
      };
    }
  } else {
    ctx.status = 401;
    ctx.body = {
      success: false,
      message: '用户验证失败'
    };
  }
  await next();
})

router.post('/', async(ctx, next) => {
  let {
    email,
    password
  } = ctx.request.body;
  const user = new User({
    email: email,
    password: password
  });
  // 用户认证
  let result = await user.authenticate();
  // 预防跨站请求伪造
  let xsrf = SHA256(Math.floor(Math.random() * 999999999).toString()).toString();

  if (result === false) {
    ctx.status = 401;
    ctx.body = {
      success: false,
      message: '用户名未注册'
    };
  } else if (result === 'wrongPass') {
    ctx.status = 401;
    ctx.body = {
      success: false,
      message: '密码错误'
    };
  } else if (result && result._id) {
    let token = jwt.sign({
      id: result._id,
      xsrf: xsrf
    }, CONFIG.app.secretKey)
    ctx.cookies.set("XSRF-TOKEN", xsrf, {
      httpOnly: false,
      overwrite: true,
      expires: new Date(new Date().getTime() + 5184000000)
    });
    ctx.cookies.set("jwt", token, {
      httpOnly: true,
      overwrite: true,
      expires: new Date(new Date().getTime() + 5184000000)
    });
    ctx.status = 200;
    ctx.body = {
      success: true,
      userInfo: {
        id: result._id,
        email: result.email
      }
    };
  } else {
    ctx.status = 401;
    ctx.body = {
      success: false,
      message: '未知错误'
    };
  }
  await next();
})

module.exports = router;