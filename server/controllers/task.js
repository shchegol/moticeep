import User from '../models/user';

export const createTask = async ctx => {
  let ctxBody = ctx.request.body;

  try {
    const user = await User.findOne({'_id': ctxBody.userId}).exec();
    user.tasks.push(ctxBody);
    await user.save();

    ctx.status = 200;
    ctx.body = user.tasks;
  } catch (error) {
    ctx.throw(error.statusCode || error.status || 500, 'Ошибка на сервере');
  }
};

// export const readAllTasks = async ctx => {
//   let ctxBody = ctx.request.body;
//
//   try {
//     const data = await readUser(ctxBody);
//     ctx.body = data.tasks;
//   } catch (error) {
//     ctx.throw(error.statusCode || error.status || 500, 'Ошибка на сервере');
//   }
// };
//
// export const updateTask = async ctx => {
//   let ctxBody = ctx.request.body;
//
//   try {
//     const data = await updateUser(ctxBody);
//     ctx.body = data.getPublicFields();
//   } catch (error) {
//     ctx.throw(error.statusCode || error.status || 500, 'Ошибка на сервере');
//   }
// };
//
export const deleteTask = async ctx => {
  let query = ctx.request.query;

  try {
    const user = await User.findOne({'_id': query.userId}).exec();

    user.tasks.remove({'_id': query.taskId});
    await user.save();

    ctx.status = 200;
    ctx.body = user.tasks;
  } catch (error) {
    ctx.throw(error.statusCode || error.status || 500, 'Ошибка на сервере');
  }
};
