import Koa from 'koa';
import config from 'config';
import {Nuxt, Builder} from 'nuxt';
import nuxtConfig from '../nuxt.config.js';
import middlewares from './middlewares';
import apiRouter from './routes/api';

async function start() {
  const host = process.env.HOST || config.server.host,
    port = process.env.PORT || config.server.port,
    app = new Koa();

  app.proxy = true

  // app.keys = [config.secret];

  // Nuxt.js
  nuxtConfig.dev = !(app.env === 'production');
  const nuxt = new Nuxt(nuxtConfig);

  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // Middleware
  middlewares(app);

  // routes
  apiRouter(app);

  // ssr
  app.use(async (ctx, next) => {
    await next();
    ctx.status = 200; // koa defaults to 404 when it sees that status is unset

    // console.log('ctx.session', ctx.session);
    // console.log('ctx.state', ctx.state);

    // ctx.req.session = ctx.session; // for nuxtServerInit
    // ctx.req.state = ctx.state; // for nuxtServerInit

    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve);
      ctx.res.on('finish', resolve);

      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject);
      });
    });
  });

  // app.use(async(ctx) => {
  //   ctx.status = 200 // koa defaults to 404 when it sees that status is unset
  //   ctx.req.session = ctx.session // for nuxtServerInit
  //   ctx.req.state = ctx.state // for nuxtServerInit
  //   await nuxt.render(ctx.req, ctx.res)
  // })

  app.listen(port, host);

  console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console
}

start();
