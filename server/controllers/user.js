import passport from 'koa-passport';
import User     from '../models/user';

export const auth = ctx => {
  ctx.body = ctx.isAuthenticated();
};

export const login = async ctx => {
  console.log('controller login start');

  return passport.authenticate('local', async (err, user, info, status) => {
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

export const logout = async (ctx, next) => {
  ctx.logout();
  ctx.session = null;
  ctx.status = 200;
};

export async function register(ctx, next) {
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

// export default {
//   /**
//    * register new user
//    * @param {string} ctx.request.body.displayName - user display name.
//    * @param {email} ctx.request.body.email - user email.
//    * @param {string} ctx.request.body.password - user password.
//    */
//   async register(ctx) {
//     let ctxBody = ctx.request.body;
//     console.log('registration', ctxBody);
//
//     // check email field for emptiness
//     if (ctxBody.email === undefined) {
//       ctx.body = {
//         error: {
//           status: 400,
//           message: 'Поле email пусто',
//         },
//       };
//       return;
//     }
//
//     // check password field for emptiness
//     if (ctxBody.password === undefined) {
//       ctx.body = {
//         error: {
//           status: 400,
//           message: 'Поле email не может быть пустым',
//         },
//       };
//       return;
//     }
//
//     let user = await User.read({email: ctxBody.email});
//     console.log(user);
//
//     // check user existence
//     if (user !== null) {
//       ctx.body = {
//         error: {
//           status: 400,
//           message: 'Пользователь с таким email адресом уже существует',
//         },
//       };
//       return;
//     }
//
//     // if display name is empty
//     if (!ctxBody.displayName) {
//       ctxBody.displayName = ctxBody.email.split('@')[0];
//     }
//
//     // create user
//     await User.create(ctxBody)
//       .then(() => {
//         ctx.body = {
//           name: ctxBody.displayName
//         };
//       })
//       .catch(err => {
//         ctx.body = err.message;
//       });
//   },
//
//   /**
//    * register new user
//    * @param {email} ctx.request.body.email - user email.
//    * @param {string} ctx.request.body.password - user password.
//    */
//   async login(ctx) {
//     let ctxBody = ctx.request.body;
//
//     // check name and password field for emptiness
//     if (ctxBody.email === undefined) {
//       ctx.body = {
//         error: {
//           status: 400,
//           message: 'Поле email не может быть пустым',
//         },
//       };
//       return;
//     }
//
//     if (ctxBody.password === undefined) {
//       ctx.body = {
//         error: {
//           status: 400,
//           message: 'Поле пароль не может быть пустым',
//         },
//       };
//       return;
//     }
//
//     let user = await User.read({email: ctxBody.email});
//
//     // check name existence
//     if (user === null) {
//       ctx.body = {
//         error: {
//           status: 400,
//           message: 'Пользователь с таким email не существует',
//         },
//       };
//       return;
//     }
//
//     // check password correct
//     if (user.password !== ctxBody.password) {
//       ctx.body = {
//         error: {
//           status: 400,
//           message: 'Неверный пароль',
//         },
//       };
//       return;
//     }
//
//     ctx.body = {
//       name: user.displayName
//     };
//   },
// };
