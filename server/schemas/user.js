import mongoose        from 'mongoose';
import config          from 'config';
import bcrypt          from 'bcrypt';
import taskSchema      from './task';
import motivatorSchema from './motivator';

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

  tasks: [taskSchema],
  motivators: [motivatorSchema],
  deleted: Boolean,
}, {
  timestamps: true,
});

userSchema
  .virtual('password')
  .set(function(password) {
    if (!password) {
      this.invalidate('password', 'Пароль должен быть минимум 4 символа.');
    }

    if (password.length < 4) {
      this.invalidate('password', 'Пароль должен быть минимум 4 символа.');
    }

    const salt = bcrypt.genSaltSync(config.crypto.hash.iterations);
    this.passwordHash = bcrypt.hashSync(password, salt);
  });

userSchema.methods.checkPassword = function(password) {
  if (!password) return false;
  return bcrypt.compareSync(password, this.passwordHash);
};

userSchema.methods.getPublicFields = function() {
  console.log('getPublicFields')
  return {
    id: this._id,
    displayName: this.displayName,
    email: this.email,
    tasks: this.tasks,
    motivators: this.motivators,
    deleted: this.deleted,
  };
};

export default userSchema;
