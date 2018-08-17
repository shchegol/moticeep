import mongoose from 'mongoose';
import config   from 'config';
import bcrypt   from 'bcrypt';

const userSchema = new mongoose.Schema({
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
    if (password) {
      if (password.length < 4) {
        this.invalidate('password', 'Пароль должен быть минимум 4 символа.');
      }

      console.log(password, typeof password)

      const salt = bcrypt.genSaltSync(config.crypto.hash.iterations);
      const hash = bcrypt.hashSync(password, salt);

      console.log(hash);

      this.passwordHash = hash;
    } else {
      this.passwordHash = undefined;
    }
  });

userSchema.methods.checkPassword = function(password) {
  if (!password) return false;
  return bcrypt.compareSync(password, this.passwordHash)
};

userSchema.methods.getPublicFields = function() {
  return {
    displayName: this.displayName,
    email: this.email,
  };
};

export default userSchema;
