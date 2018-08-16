import passport from 'koa-passport';
import User     from '../models/user';

export const auth = ctx => {
  ctx.body = ctx.isAuthenticated();
};

export const login = async ctx => {
  return passport.authenticate('local', async (err, user, info) => {
    if (err) {
      ctx.throw(501, info);
    }

    if (!user) {
      ctx.throw(401, info);
    }

    await ctx.login(user);

    ctx.body = await `login ${user._id}`;
  })(ctx);
};

export const logout = async ctx => {
  ctx.logout();
  ctx.session = null;
  ctx.status = 200
};

export const register = async ctx => {
  let ctxBody = ctx.request.body;

  await User.create(ctxBody)
    .then(() => {
      ctx.body = {
        name: ctxBody.displayName,
      };
    })
    .catch(err => {
      ctx.body = err.message;
    });
}
