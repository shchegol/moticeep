import config   from 'config';
import mongoose from 'mongoose';
import bcrypt   from 'bcrypt';
import crypto   from 'crypto';

const userSchema = new mongoose.Schema({
  // displayName: {
  //   type: String,
  //   required: 'Имя пользователя отсутствует.',
  // },

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

  salt: {
    type: String,
  },

  passwordHash: {
    type: String,
    required: true,
  },

  deleted: Boolean,
}, {
  timestamps: true,
});

userSchema
  .virtual('password')
  .set(function(password) {
    console.log('virtual password start', password);

    if (password) {
      if (password.length < 4) {
        this.invalidate('password', 'Пароль должен быть минимум 4 символа.');
      }

      // bcrypt.hash(password, config.crypto.hash.iterations)
      //   .then(hash => {
      //     console.log('hash', hash)
      //     this.passwordHash = hash;
      //   });

      this.salt = crypto.randomBytes(config.crypto.hash.length)
        .toString('base64');

      this.passwordHash = crypto.pbkdf2Sync(
        password,
        this.salt,
        config.crypto.hash.iterations,
        config.crypto.hash.length,
        'sha512',
      ).toString('base64');
    } else {
      this.salt = undefined;
      this.passwordHash = undefined;
    }
  });

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

  // bcrypt.compare(password, this.passwordHash)
  //   .then(function(res) {
  //     return res;
  //   });
};

userSchema.methods.getPublicFields = function() {
  return {
    displayName: this.displayName,
    email: this.email,
  };
};

export default mongoose.model('User', userSchema);
