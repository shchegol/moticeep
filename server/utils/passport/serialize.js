import passport from 'koa-passport';
import User     from '../../models/user';

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, done);
});
