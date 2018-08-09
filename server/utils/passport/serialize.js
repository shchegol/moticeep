import passport from 'koa-passport';
import User from '../../models/user'

passport.serializeUser(function(user, done) {
  console.log('serializeUser')
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('deserializeUser')
  User.findById(id, done);
});
