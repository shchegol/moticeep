import passport                           from 'koa-passport';
import {createUser, readUser, updateUser} from '../models/user';

// todo trough mail
export const register = async ctx => {
  let ctxBody = ctx.request.body;

  // check email field for emptiness
  if (!ctxBody.email) {
    ctx.throw(401, 'Поле email не может быть пустым');
  }

  // check password field for emptiness
  if (!ctxBody.password) {
    ctx.throw(401, 'Поле "Пароль" не может быть пустым');
  }

  let user = await readUser({email: ctxBody.email});

  // check user existence
  if (user !== null) {
    ctx.throw(401, 'Пользователь с таким email адресом уже существует');
  }

  // if display name is empty
  if (!ctxBody.displayName) {
    ctxBody.displayName = ctxBody.email.split('@')[0];
  }

  try {
    const data = await createUser(ctxBody);
    await ctx.login(data);
    ctx.body = data.getPublicFields();
  } catch (error) {
    ctx.throw(error.statusCode || error.status || 500, 'Ошибка на сервере');
  }
};

export const read = async ctx => {
  let ctxBody = ctx.request.body;

  try {
    const data = await readUser(ctxBody);
    ctx.body = data.getPublicFields();
  } catch (error) {
    ctx.throw(error.statusCode || error.status || 500, 'Ошибка на сервере');
  }
};

export const update = async ctx => {
  let ctxBody = ctx.request.body;

  try {
    await updateUser(ctxBody);
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

    ctx.body = {
      _id: user._id,
      displayName: user.displayName,
      tasks: user.tasks,
      motivators: user.motivators,
    };
  })(ctx);
};

export const logout = async ctx => {
  ctx.logout();
  ctx.session = null;
  ctx.status = 200;
};

