import passport from 'koa-passport';
import User from '~/server/models/user';

export default () => {
  passport.serializeUser((user, done) => {
    console.log(user);
    console.log(user.id);
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, done);
  });

  return passport
}
