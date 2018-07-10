const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

module.exports = {
  async create(opts) {
    return await User.create(opts);
  },

  async read(email) {
    return await User.findOne(email).exec();
  },

  async update(opts) {
    return await User.updateOne(opts);
  },

  async delete(opts) {
    return await User.deleteOne(opts);
  }
};
