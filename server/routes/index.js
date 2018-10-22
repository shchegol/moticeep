import Router           from 'koa-router';
import authRouter       from './auth';
import userRouter       from './user';
import tasksRouter      from './tasks';
import motivatorsRouter from './motivators';

export default app => {
  let router = new Router({
    prefix: '/api',
  });

  authRouter(router, '/auth');
  userRouter(router, '/user');
  tasksRouter(router, '/tasks');
  motivatorsRouter(router, '/motivators');

  app
    .use(router.routes())
    .use(router.allowedMethods());
}
