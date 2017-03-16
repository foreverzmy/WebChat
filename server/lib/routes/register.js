const Router = require('koa-router');
const User = require('../controllers/user');
const jwt = require('jsonwebtoken');
const SHA256 = require('sha256');

const CONFIG = require('../config');

const router = new Router();

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

  if (result !== false) {
    ctx.status = 401;
    ctx.body = {
      success: false,
      message: '用户名已注册'
    };
  } else {
    let newUser = await user.save();
    if (newUser === false) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: '注册失败'
      };
    } else if (newUser && newUser._id) {
      let token = jwt.sign({
        id: newUser._id,
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
        message: '注册成功'
      };
    } else {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: '未知错误'
      };
    }
  }

})

module.exports = router;