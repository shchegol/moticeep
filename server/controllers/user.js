const User = require('../models/user');

module.exports = {
  async register(ctx) {
    let ctxBody = ctx.request.body;

    // check name field for emptiness
    if (ctxBody.name === undefined) {
      ctx.body = 'error: name field is empty';
      return;
    }

    // check password field for emptiness
    if (ctxBody.password === undefined) {
      ctx.body = 'error: password field is empty';
      return;
    }

    let user = await User.read({name: ctxBody.name});

    // check name existence
    if (user !== null) {
      ctx.body = 'error: user with that name exists';
      return;
    }

    // create user
    await User.create(ctxBody);
    ctx.body = 'success';
  },

  async login(ctx) {
    let ctxBody = ctx.request.body;

    // check name and password field for emptiness
    if (ctxBody.name === undefined || ctxBody.password === undefined) {
      ctx.body = 'error: name or password field is empty';
      return;
    }

    let user = await User.read({name: ctxBody.name});

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
