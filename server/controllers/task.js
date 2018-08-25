import User from '../models/user';

export const createTask = async ctx => {

  console.log('authenticate', ctx.isAuthenticated());
  console.log('#############################################');
  console.log('state', ctx.state.user);
  console.log('#############################################');

  try {
    const user = await User.findOne({'_id': ctx.state.user._id}).exec();
    user.tasks.push(ctx.request.body);
    await user.save();

    ctx.status = 200;
    ctx.body = user.tasks;
  } catch (error) {
    ctx.throw(error.statusCode || error.status || 500, 'Ошибка на сервере');
  }
};

export const updateTask = async ctx => {
  const ctxBody = ctx.request.body;

  try {
    const user = await User.findOneAndUpdate(
      {'_id': ctxBody.userId, 'tasks._id': ctxBody.task._id},
      {'$set': {'tasks.$': ctxBody.task}},
      {'new': true},
    );

    ctx.status = 200;
    ctx.body = user.tasks;
  } catch (error) {
    ctx.throw(error.statusCode || error.status || 500, 'Ошибка на сервере');
  }
};

export const deleteTask = async ctx => {
  const userId = ctx.request.query.userId;
  let urlArr = ctx.request.path.split('/');
  let taskId = urlArr[urlArr.length - 1];

  try {
    const user = await User.findOne({'_id': userId}).exec();

    user.tasks.remove({'_id': taskId});
    await user.save();

    ctx.status = 200;
    ctx.body = user.tasks;
  } catch (error) {
    ctx.throw(error.statusCode || error.status || 500, 'Ошибка на сервере');
  }
};
