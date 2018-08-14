import passport      from 'koa-passport';
import LocalStrategy from 'passport-local';
import User          from '../../models/user';
import Strategy      from 'passport-local/lib/index';

passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password',
  },

  function(email, password, done) {
    console.log('LocalStrategy run', email, password);

    User.findOne({email}, (err, user) => {
      if (err) {
        return done(err);
      }

      if(!user) {
        return done(null, false, {message: 'Нет такого пользователя или пароль неверен.'});
      }

      if (!user.checkPassword(password)) {
        return done(null, false, {message: 'Нет такого пользователя или пароль неверен.'});
      }

      console.log('LocalStrategy success');

      return done(null, user);
    });
  },
));
