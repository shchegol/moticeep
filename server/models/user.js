import config from 'config';
import mongoose from 'mongoose';

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
          return this.deleted ? true : /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(
            value);
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

userSchema
  .virtual('password')
  .set(function(password) {
    if (password !== undefined) {
      if (password.length < 4) {
        this.invalidate('password', 'Пароль должен быть минимум 4 символа.');
      }
    }

    if (password) {
      this.salt = crypto.randomBytes(config.crypto.hash.length)
        .toString('base64');

      this.passwordHash = crypto.pbkdf2Sync(
        password,
        this.salt,
        config.crypto.hash.iterations,
        config.crypto.hash.length,
        'sha512' // sha512
      ).toString('base64');
    } else {
      // remove password (unable to login w/ password any more, but can use
      // providers)
      this.salt = undefined;
      this.passwordHash = undefined;
    }
  });

userSchema.methods.getPublicFields = function() {
  return {
    displayName: this.displayName,
    email: this.email
  }
};

userSchema.methods.checkPassword = function(password) {
  if (!password) return false;
  if (!this.passwordHash) return false;

  return crypto.pbkdf2Sync(
    password,
    this.salt,
    config.crypto.hash.iterations,
    config.crypto.hash.length,
    'sha512',
  ).toString('base64') === this.passwordHash;
};

export default mongoose.model('User', userSchema);

// export default {
//   async create(opts) {
//     return await User.create(opts);
//   },
//
//   async read(email) {
//     console.log(email)
//     return await User.findOne(email).exec();
//   },
//
//   async update(opts) {
//     return await User.updateOne(opts);
//   },
//
//   async delete(opts) {
//     return await User.deleteOne(opts);
//   },
// };
