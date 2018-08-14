// import passport from 'koa-passport';
// import './serialize';
// import './localStrategy'

// console.log('passport/index.js')
//
// export default passport;

import passport from 'koa-passport';
import Strategy from 'passport-local';
import User     from '../../models/user';

console.log('passport');

passport.serializeUser(function(user, done) {
  console.log('serializeUser');
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  console.log('deserializeUser');
  User.findById(id, done);
});

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

export default passport;

