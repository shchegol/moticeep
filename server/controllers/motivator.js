import User from '../models/user';

export const createMotivator = async ctx => {
  const ctxBody = ctx.request.body;

  try {
    const user = await User.findOne({'_id': ctxBody.userId}).exec();
    user.motivators.push(ctxBody.motivator);
    await user.save();

    ctx.status = 200;
    ctx.body = user.motivators;
  } catch (error) {
    ctx.throw(error.statusCode || error.status || 500, 'Ошибка на сервере');
  }
};

export const updateMotivator = async ctx => {
  const ctxBody = ctx.request.body;

  try {
    const user = await User.findOneAndUpdate(
      {'_id': ctxBody.userId, 'motivators._id': ctxBody.motivator._id},
      {'$set': {'motivators.$': ctxBody.motivator}},
      {'new': true},
    );

    ctx.status = 200;
    ctx.body = user.motivators;
  } catch (error) {
    ctx.throw(error.statusCode || error.status || 500, 'Ошибка на сервере');
  }
};

export const deleteMotivator = async ctx => {
  const userId = ctx.request.query.userId;
  let urlArr = ctx.request.path.split('/');
  let taskId = urlArr[urlArr.length - 1];

  try {
    const user = await User.findOne({'_id': userId}).exec();

    user.motivators.remove({'_id': taskId});
    await user.save();

    ctx.status = 200;
    ctx.body = user.motivators;
  } catch (error) {
    ctx.throw(error.statusCode || error.status || 500, 'Ошибка на сервере');
  }
};
