const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  password: String,

  displayName: {
    type: String,
    required: 'Имя пользователя отсутствует.',
  },
  email: {
    type: String,
    unique: 'Такой email уже есть, если это вы, то войдите.',
    required: 'E-mail пользователя не должен быть пустым.',
    validate: [
      {
        validator: function checkEmail(value) {
          return this.deleted ? true : /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
        },
        msg: 'Укажите, пожалуйста, корректный email.',
      },
    ],
  },
  deleted: Boolean,
  passwordHash: {
    type: String,
  },
  salt: {
    type: String,
  },
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
  },
};
