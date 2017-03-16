'use strict'
import test from 'ava';
import mongoose from 'mongoose';
// 核心代码，是否开启测试
import User from './user';
import chai from 'chai';

const should = chai.should();

mongoose.set('debug', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/webchat')

const user = new User({
  username: 'forever',
  password: 'zzz'
})

test('hashPassword', async t => {
  const hash = await user.hashPassword();
  t.true(hash.length === 60);
});

test('findUserByName', async t => {
  const userInfo = await user.findUserByName();
  t.is(userInfo, '');
});

test('save', async t => {
  const newUser = await user.save();
  newUser.should.be.a('object')
})