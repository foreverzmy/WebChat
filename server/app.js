"use strict";
const Koa = require('koa');
const http = require('http');
const socket = require('socket.io');
const convert = require('koa-convert');
const bodyparser = require('koa-bodyparser');
// const session = require('koa-session');
const Router = require('koa-router');
// const jwt = require('koa-jwt');
const cors = require('koa2-cors');
const mongoose = require('mongoose');

const CONFIG = require('./lib/config');
const validateXSRF = require('.//lib/controllers/validateXSRF');
const login = require('./lib/routes/login');
const register = require('./lib/routes/register');
const search = require('./lib/routes/search');
const add = require('./lib/routes/addFrined');
const friend = require('./lib/routes/friend');
const group = require('./lib/routes/group');

const app = new Koa();
const server = http.Server(app.callback());
const io = socket(server);
global.io = io;
const router = new Router({
  prefix: '/api'
});

// logger
app.use(async(ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(cors());
// app.use(jwt({
//   secret: CONFIG.app.secretKey,
// }).unless({
//   path: [/^\/api\/(login)|(register)/]
// }));

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost/${CONFIG.app.db}`)

app
  .use(convert(bodyparser()))
  .use(validateXSRF)
  .use(router.routes())
  .use(router.allowedMethods())


router
  .use('/login', login.routes(), login.allowedMethods())
  .use('/register', register.routes(), register.allowedMethods())
  .use('/search', search.routes(), search.allowedMethods())
  .use('/add', add.routes(), add.allowedMethods())
  .use('/friend', friend.routes(), friend.allowedMethods())
  .use('/group', group.routes(), group.allowedMethods())

module.exports = {
  server,
  io
};