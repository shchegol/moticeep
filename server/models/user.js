'use strict'

const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  userName: String,
  userPassword: String,
  userNickName: String,
  userImg: String,
});
const UserModel = mongoose.model('User', userSchema);

class User {
  constructor() {
    this.model = UserModel;
  }

  create(opts) {
    this.entity = new UserModel(opts);
    return this.entity.save(opts);
  }

  read(opts) {
    return this.model.find(opts).exec();
  }

  update(opts) {
    return this.model.updateOne(opts);
  }

  delete(opts) {
    return this.model.deleteOne(opts);
  }
}

module.exports = User;
