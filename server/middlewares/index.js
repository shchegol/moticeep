import favicon from 'koa-favicon';
import serve from 'koa-static';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';

export default app => {
  app
    .use(favicon())
    .use(serve('.'))
    .use(logger())
    .use(bodyParser())
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
