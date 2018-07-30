import User from '../models/user'

export default {
  /**
   * register new user
   * @param {string} ctx.request.body.displayName - user display name.
   * @param {email} ctx.request.body.email - user email.
   * @param {string} ctx.request.body.password - user password.
   */
  async register(ctx) {
    let ctxBody = ctx.request.body;
    console.log('registration', ctxBody)

    // check email field for emptiness
    if (ctxBody.email === undefined) {
      ctx.body = 'error: email field is empty';
      return;
    }

    // check password field for emptiness
    if (ctxBody.password === undefined) {
      ctx.body = 'error: password field is empty';
      return;
    }

    let user = await User.read({email: ctxBody.email});
    console.log(user)

    // check user existence
    if (user !== null) {
      ctx.body = 'error: user already exists';
      return;
    }

    // if display name is empty
    if (!ctxBody.displayName) {
      ctxBody.displayName = ctxBody.email.split('@')[0];
    }

    // create user
    await User.create(ctxBody)
      .then(() => {
        console.log('user create')
        ctx.body = 'ok';
      })
      .catch(err => {
        ctx.body = err.message;
      });
  },

  /**
   * register new user
   * @param {email} ctx.request.body.email - user email.
   * @param {string} ctx.request.body.password - user password.
   */
  async login(ctx) {
    let ctxBody = ctx.request.body;

    // check name and password field for emptiness
    if (ctxBody.email === undefined || ctxBody.password === undefined) {
      ctx.body = 'error: displayName or password field is empty';
      return;
    }

    let user = await User.read({email: ctxBody.email});

    // check name existence
    if (user === null) {
      ctx.body = 'error: user with that name not exists';
      return;
    }

    // check password correct
    if (user.password !== ctxBody.password) {
      ctx.body = 'error: password is incorrect';
      return;
    }

    ctx.body = user._id;
  },
};
