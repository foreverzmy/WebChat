// XSRF 检测，处理客户端未授权问题
const jwt = require('jsonwebtoken');

const CONFIG = require('../config')

async function validateXSRF(ctx, next) {
  let token = ctx.cookies.get('jwt');
  let xsrf = ctx.request.headers['x-xsrf-token'];
  ctx.request.headers.authorization = 'Bearer ' + token;
  // 当 JWT 存在且访问 API 时，检测 XSRF 
  if (token !== void 0 && /^\/api\//.test(ctx.url)) {
    try {
      const data = await jwt.verify(token, CONFIG.app.secretKey);
      if (xsrf !== data.xsrf) {
        console.log(data);
        ctx.cookies.set("XSRF-TOKEN", null, {
          overwrite: true,
          expires: new Date()
        });
        ctx.cookies.set("jwt", null, {
          overwrite: true,
          expires: new Date()
        });
        ctx.status = 401;
        ctx.body = {
          success: false,
          message: '用户验证失败'
        };
      } else {
        await next();
      }
    } catch (err) {
      ctx.cookies.set("XSRF-TOKEN", null, {
        overwrite: true,
        expires: new Date()
      });
      ctx.cookies.set("jwt", null, {
        overwrite: true,
        expires: new Date()
      })
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: '用户验证失败'
      };
    }
  } else {
    await next();
  }
}

module.exports = validateXSRF;