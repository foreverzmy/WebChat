const UserDB = require('../models/user');
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


module.exports = User;