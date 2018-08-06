import passport from 'koa-passport';
import localStrategy from './strategy/local';
import serialize from './serialize';

export default () => {
  serialize();

  passport.use(localStrategy);
}
