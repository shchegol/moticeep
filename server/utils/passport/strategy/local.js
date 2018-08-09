import LocalStrategy from 'passport-local';
import User from '../../../models/user';

export default new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, (req, email, password, done) => {
  User.findOne({email}, (err, user) => {
    if (err) {
      return done(err);
    }

    if (!user || !user.checkPassword(password)) {
      // don't say whether the user exists
      return done(null, false,
        {message: 'Нет такого пользователя или пароль неверен.'});
    }

    if (!user.verifiedEmail) {
      return done(null, false, {message: 'Email не подтверждён'});
    }

    return done(null, user);
  });
});
