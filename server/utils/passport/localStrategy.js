import passport      from 'koa-passport';
import LocalStrategy from 'passport-local';
import User          from '../../models/user';

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },

  function(email, password, done) {
    console.log('LocalStrategy run');

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

      return done(null, user, {message: 'поздравляем!'});
    });
  },
));
