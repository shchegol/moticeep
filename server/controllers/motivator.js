import User from '../models/user';
import _    from 'lodash';
import {getLastValueFromURLPath} from '../utils/common'

export const createMotivator = async ctx => {
  const user = await User.findOne({'_id': ctx.state.user._id}).exec();

  user.motivators.push(ctx.request.body);
  await user.save();

  ctx.status = 200;
  ctx.body = user.getPublicFields();
};

export const updateMotivator = async ctx => {
  const motivatorId = getLastValueFromURLPath(ctx.request.path);
  const ctxBody = ctx.request.body;
  const user = await User.findOne({'_id': ctx.state.user._id}).exec();
  const motivator = user.motivators.id(motivatorId);

  _.forIn(ctxBody, (value, key) => {
    motivator[key] = value
  });
  await user.save();

  ctx.status = 200;
  ctx.body = user.getPublicFields();
};

export const deleteMotivator = async ctx => {
  const motivatorId = getLastValueFromURLPath(ctx.request.path);
  const user = await User.findOne({'_id': ctx.state.user._id}).exec();

  user.motivators.remove({'_id': motivatorId});
  await user.save();

  ctx.status = 200;
  ctx.body = user.getPublicFields();
};
