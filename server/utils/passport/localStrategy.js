import passport from 'koa-passport';
import Strategy from 'passport-local';
import User     from '../../models/user';

passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password',
  },

  function(email, password, done) {
    User.findOne({email}, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, {message: 'Нет такого пользователя или пароль неверен.'});
      }

      if (!user.checkPassword(password)) {
        return done(null, false, {message: 'Нет такого пользователя или пароль неверен.'});
      }

      return done(null, user);
    });
  },
));
