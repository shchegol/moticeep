import passport               from 'koa-passport';
import {createUser, readUser} from '../models/user';

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

    ctx.body = {
      name: user.displayName,
    };
  })(ctx);
};

export const logout = async ctx => {
  ctx.logout();
  ctx.session = null;
  ctx.status = 200;
};

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

  await createUser(ctxBody)
    .then((res) => {
      ctx.body = {
        name: res.displayName,
      };
    })
    .catch(err => {
      ctx.throw(err.statusCode || err.status || 500, 'Ошибка на сервере');
    });
};
