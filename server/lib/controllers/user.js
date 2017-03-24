const UserDB = require('../models/user.modal');
const GroupDB = require('../models/group.modal');
const bcrypt = require('bcryptjs');

class User {
  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key];
    }
  }

  async hashPassword() {
    this.salt = '';
    let hash = '';
    try {
      this.salt = await bcrypt.genSalt(12);
    } catch (err) {
      throw err;
    }
    try {
      hash = await bcrypt.hash(this.password, this.salt)
    } catch (err) {
      throw err;
    }
    return hash;
  }

  async findUserByName() {
    let user = '';
    try {
      user = await UserDB.findOne({
        email: this.email
      });
    } catch (err) {
      throw err;
    }
    return user;
  }

  async findByUserOrCreate() {
    const user = await this.findUserByName();
    if (user !== null) {
      return 'email already exist.'
    } else {
      return await this.save();
    }
  }

  // 认证用户名和密码
  async authenticate() {
    const user = await this.findUserByName();
    let hashPass = '';
    if (user) {
      try {
        hashPass = await bcrypt.hash(this.password, user.salt);
      } catch (err) {
        throw err;
      }
      if (hashPass === user.password) {
        return user;
      } else {
        return 'wrongPass';
      }
    } else {
      return false;
    }
  }

  async save() {
    this.password = await this.hashPassword();
    const newUser = new UserDB({
      email: this.email,
      password: this.password,
      salt: this.salt,
    });
    let savedUser = '';
    try {
      savedUser = await newUser.save();
    } catch (err) {
      throw err;
      return false;
    }
    return savedUser;
  }

}

User.findById = async function (id) {
  let user = '';
  try {
    user = await UserDB.findById(id);
  } catch (err) {
    throw err;
  }
  return user;
}

User.search = async function (text) {
  const reg = new RegExp(text, 'gim');
  let user = '';
  try {
    user = await UserDB.find({
      email: reg
    }, `_id email`)
  } catch (err) {
    throw err;
  }
  return user;
}

// 保存用户socketId
User.saveSocketId = async function (id, socketId) {
  try {
    await UserDB.update({
      _id: id
    }, {
      socketId: socketId
    }, {
      multi: false
    })
  } catch (err) {
    throw err;
    return false;
  }
  return true;
}

// 查找用户socketId
User.findSocketId = async function (id) {
  let user = '';
  try {
    user = await User.findById(id);
  } catch (err) {
    throw err;
  }
  return user.socketId;
}

// 删除用户socketId
User.delSocketId = async function (socketId) {
  try {
    await UserDB.update({
      socketId: socketId
    }, {
      socketId: null
    }, {
      multi: false
    })
  } catch (err) {
    throw err;
    return false;
  }
  return true;
}

// 添加好友
User.saveNewFriend = async function (id, friendId) {
  try {
    await UserDB.update({
      _id: id
    }, {
      "$push": {
        friends: friendId
      }
    })
  } catch (err) {
    throw err;
  }
}

// 查找好友
User.findFriend = async function (id) {
  let frinendList = '';
  try {
    const userInfo = await UserDB.findById(id);
    frinendList = await UserDB.find({
      _id: {
        '$in': userInfo.friends
      },
    }, ['_id', 'email']);
  } catch (err) {
    throw err;
  }
  return frinendList;
}

// 添加群组
User.saveNewGroup = async function (id, groupId) {
  try {
    await UserDB.update({
      _id: id
    }, {
      "$push": {
        groups: groupId
      }
    })
  } catch (err) {
    throw err;
    return false
  }
  return true;
}

// 查找群组
User.findGroup = async function (id) {
  let groupList = '';
  try {
    const userInfo = await UserDB.findById(id);
    groupList = await GroupDB.find({
      _id: {
        '$in': userInfo.groups
      },
    }, ['_id', 'name']);
  } catch (err) {
    throw err;
    return false;
  }
  return groupList;
}

module.exports = User;