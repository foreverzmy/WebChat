const Router = require('koa-router');
const Group = require('../controllers/group');
const User = require('../controllers/user');

const router = new Router();

// 获取群组列表
router.post('/', async(ctx, next) => {
  let {
    _id
  } = ctx.request.body;

  const groupList = await User.findGroup(_id);

  ctx.body = {
    success: true,
    content: groupList
  }
  await next();
});

// 创建群组
router.post('/create', async(ctx, next) => {
  const {
    name,
    creator,
  } = ctx.request.body;

  const isExist = await Group.findByName(name);

  // 如果分组不存在
  if (isExist) {
    const newGroup = new Group(ctx.request.body);
    const saveGroup = await newGroup.save();

    if (saveGroup) {

      // 将群组添加到用户群组列表
      User.saveNewGroup(creator, saveGroup._id);

      ctx.body = {
        success: true,
        content: saveGroup
      }
    } else {
      ctx.body = {
        success: false,
      };
    }
  } else {
    ctx.body = {
      success: false,
    };
  }
  await next();
});

// 加入群组
router.post('/join', async(ctx, next) => {
  const {
    from,
    to,
  } = ctx.request.body;

  const join = await Group.join(to, from);

  const save = await User.saveNewGroup(from, to);

  if (join && save) {

    ctx.body = {
      success: true,
    };
  } else {
    ctx.body = {
      success: false,
    }
  }

  await next();
});

module.exports = router;