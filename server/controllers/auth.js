import passport                           from 'koa-passport';
import User from '../models/user';

// todo trough mail
export const register = async ctx => {
  const ctxBody = ctx.request.body;

  // check email field for emptiness
  if (!ctxBody.email) {
    ctx.throw(401, 'Поле email не может быть пустым');
  }

  // check password field for emptiness
  if (!ctxBody.password) {
    ctx.throw(401, 'Поле "Пароль" не может быть пустым');
  }

  const user = await User.findOne({email: ctxBody.email}).exec();

  // check user existence
  if (user !== null) {
    ctx.throw(401, 'Пользователь с таким email адресом уже существует');
  }

  // if display name is empty
  if (!ctxBody.displayName) {
    ctxBody.displayName = ctxBody.email.split('@')[0];
  }

  try {
    const user = await User.create(ctxBody);
    await ctx.login(user);
    ctx.body = user.getPublicFields();
  } catch (error) {
    ctx.throw(error.statusCode || error.status || 500, 'Ошибка на сервере');
  }
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

    ctx.body = user.getPublicFields();
  })(ctx);
};

export const logout = async ctx => {
  ctx.logout();
  ctx.session = null;
  ctx.status = 200;
};

