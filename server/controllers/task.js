import User from '../models/user';

export const createTask = async ctx => {
  const ctxBody = ctx.request.body;

  try {
    const user = await User.findOne({'_id': ctxBody.userId}).exec();
    user.tasks.push(ctxBody.task);
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