const User = require('../models/user');

module.exports = {
  async register(ctx) {
    console.log('register');

    try {
      await User.create(ctx.request.body);
      ctx.body = 'success';
    } catch (err) {
      ctx.body = `error: ${err}`;
    }
  },

  async login(ctx) {
    console.log('login');

    try {
      let user = await User.read({name: ctx.request.body.name});

      if (user.password === ctx.request.body.password) {
        ctx.body = user._id;
      } else {
        ctx.body = 'Пароль не подходит';
      }

    } catch (err) {
      ctx.body = `error: ${err}`;
    }
  },
};
