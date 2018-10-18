import mongoose from 'mongoose';
import config   from 'config';
import bcrypt   from 'bcrypt';
import _        from 'lodash';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'За труды',
  },
  value: {
    type: Number,
    default: 1,
  },
  editable: {
    type: Boolean,
    default: false,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  archive: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
}, {
  toObject: {
    virtuals: true,
  },
});

const motivatorSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Мечта',
  },
  img: {
    type: String,
    default: '/images/motivator.jpg',
  },
  value: {
    type: Number,
    default: 0,
  },
  maxValue: {
    type: Number,
    default: 300,
  },
  done: {
    type: Boolean,
    default: false,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  archive: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
}, {
  toObject: {
    virtuals: true,
  },
});

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

  points: {
    type: Number,
    default: 0,
  },

  tasks: [taskSchema],
  motivators: [motivatorSchema],

  deleted: {
    type: Boolean,
    default: false,
  },
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

motivatorSchema
  .virtual('valuePercent')
  .get(function() {
    return Math.ceil(this.value / this.maxValue * 100);
  });

userSchema.pre('save', function(next) {
  // todo сделать более умную функцию, которая наполняет мотиваторы последовательно
  let motivators = _.filter(this.motivators, {done: false, deleted: false, archive: false});
  let favorite = _.filter(motivators, 'favorite');
  let totalPoints = this.points;
  let singlePoint;

  if (favorite.length > 0) {
    singlePoint = Math.floor(totalPoints / favorite.length);

    _.each(motivators, motivator => {
      if (motivator.favorite) {
        motivator.value = singlePoint;
      } else {
        motivator.value = 0;
      }
    });
  } else {
    singlePoint = Math.floor(totalPoints / motivators.length);

    _.each(motivators, motivator => {
      motivator.value = singlePoint;
    });
  }

  next();
});

userSchema.methods.checkPassword = function(password) {
  if (!password) return false;
  return bcrypt.compareSync(password, this.passwordHash);
};

userSchema.methods.getPublicFields = function() {
  return {
    _id: this._id,
    displayName: this.displayName,
    email: this.email,
    points: this.points,
    deleted: this.deleted,
  };
};

userSchema.methods.getTasks = function() {
  return this.tasks;
};

userSchema.methods.getMotivators = function() {
  return this.motivators;
};

export default mongoose.model('User', userSchema);
