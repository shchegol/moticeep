import passport from "koa-passport"
import User from '../models/user';

export async function getUser(ctx) {
  console.log('getUser');

  if (ctx.isAuthenticated()) {
    ctx.body = ctx.render('welcome');
  } else {
    ctx.body = ctx.render('login');
  }
}

export async function login(ctx, next) {
  console.log('login');

  await passport.authenticate('local')(ctx, next);
}

export async function logout(ctx, next) {
  console.log('logout');
  ctx.logout(); // delete ctx.session.passport
  ctx.session = null; // destroy session (!!!)
  ctx.redirect('/');
}

export async function register(ctx, next) {
  console.log('register')
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
