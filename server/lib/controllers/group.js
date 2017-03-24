const GroupDB = require('../models/group.modal');

class Group {
  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key];
    }
  }

  // 保存用户创建分组
  async save() {
    const newGroup = new GroupDB({
      name: this.name,
      creator: this.creator,
      members: [this.creator]
    })

    let saveGroup = '';
    try {
      saveGroup = await newGroup.save();
    } catch (err) {
      throw err;
      return false;
    }
    return newGroup;
  }

}

Group.findById = async function (_id) {
  let group = {};
  try {
    group = await GroupDB.findById(_id);
  } catch (err) {
    throw err;
    return false;
  }
  if (group[0]) {
    return false;
  }
  return group;
}

Group.findByName = async function (name) {
  let group = false;
  try {
    group = await GroupDB.find({
      name: name
    });
  } catch (err) {
    throw err;
    return false;
  }
  if (group[0]) {
    return false;
  }
  return true;
}

Group.search = async function (text) {
  const reg = new RegExp(text, 'gim');
  let group = '';
  try {
    group = await GroupDB.find({
      name: reg
    }, `_id name`)
  } catch (err) {
    throw err;
  }
  return group;
}

Group.join = async function (groupId, userId) {
  try {
    await GroupDB.update({
      _id: groupId
    }, {
      "$push": {
        members: userId
      }
    })
  } catch (err) {
    throw err;
    return false;
  }
}

module.exports = Group;