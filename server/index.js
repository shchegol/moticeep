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

  let serverInfo = `
  ########## success ########## \x1b[32m
  environment: ${process.env.NODE_ENV}
  host:        ${host}
  port:        ${port}\x1b[0m
  #############################
  `;

  app.proxy = true;
  app.keys = [config.secret];

  // nuxt.js
  nuxtConfig.dev = !(app.env === 'production');
  const nuxt = new Nuxt(nuxtConfig);

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

    ctx.req.session = ctx.session;
    ctx.req.state = ctx.state;
    await koaConnect(nuxt.render)(ctx, next);
  });

  app.listen(port, host);

  console.log(serverInfo);
}

start();
