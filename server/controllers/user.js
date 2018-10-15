import User from '../models/user';
import _    from 'lodash';

export const updateUser = async ctx => {
  const ctxBody = ctx.request.body;
  const user = await User.findOne({'_id': ctx.state.user._id}).exec();

  _.forIn(ctxBody, (value, key) => {
    if (key !== 'points') return;
    user[key] += Number(value);
  });
  await user.save();

  ctx.status = 200;
  ctx.body = {
    user: user.getPublicFields(),
    motivators: user.motivators,
    tasks: user.tasks
  };
};
