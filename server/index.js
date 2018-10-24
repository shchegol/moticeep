import Koa             from 'koa';
import config          from 'config';
import {Nuxt, Builder} from 'nuxt';
import koaConnect      from 'koa-connect';
import nuxtConfig      from '../nuxt.config.js';
import middlewares     from './middlewares';
import apiRouter       from './routes';

async function start() {
  const host = process.env.HOST || config.server.host,
        port = process.env.PORT || config.server.port,
        app  = new Koa();

  app.proxy = true;
  app.keys = [config.secret];

  // nuxt.js
  nuxtConfig.dev = !(app.env === 'production');
  const nuxt = new Nuxt(nuxtConfig);

  console.log('nuxtConfig.dev', nuxtConfig.dev);
  console.log('app.env', app.env);
  console.log('process.env.HOST', process.env.HOST);
  console.log('process.env.PORT', process.env.PORT);

  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // middleware
  middlewares(app);

  // routes
  apiRouter(app);

  // nuxt render
  app.use(async (ctx, next) => {
    ctx.status = 200;

    // console.log('session maxAge', ctx.session)

    ctx.req.session = ctx.session;
    ctx.req.state = ctx.state;
    await koaConnect(nuxt.render)(ctx, next);
  });

  app.listen(port, host);

  console.log(`Server listening on ${host}:${port}`); // eslint-disable-line no-console
}

start();
