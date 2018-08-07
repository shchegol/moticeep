import favicon from 'koa-favicon';
import serve from 'koa-static';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';
import session from 'koa-session';
import mongooseStore from 'koa-session-mongoose';
import mongoose from '../utils/mongoose';

export default app => {
  app
    .use(favicon())
    .use(serve('.'))
    .use(logger())
    .use(session({
      key: 'sid',
      rolling: true,
      store: mongooseStore.create({
        model: 'Session',
        expires: 3600 * 4,
        connection: mongoose,
      }),
    }, app))
    .use(bodyParser())
    .use(passport.initialize())
    .use(passport.session())
    .use(async function(ctx, next) {
    try {
      await next();
    } catch (e) {
      if (e.status) {
        // could use template methods to render error page
        ctx.body = e.message;
        ctx.status = e.status;
      } else {
        ctx.body = 'Error 500';
        ctx.status = 500;
        console.error(e.message, e.stack);
      }
    }
  })
}
