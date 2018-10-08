import User                      from '../models/user';
import _                         from 'lodash';
import {getLastValueFromURLPath} from '../utils/common';

export const createMotivator = async ctx => {
  const user = await User.findOne({'_id': ctx.state.user._id}).exec();

  ctx.request.body.value = 0;
  ctx.request.body.favorite = false;
  ctx.request.body.done = false;


  if (!ctx.request.body.title) {
    ctx.request.body.title = 'Мечта';
  }

  if (!ctx.request.body.maxValue) {
    ctx.request.body.maxValue = 300;
  }

  if (!ctx.request.body.img) {
    ctx.request.body.img = '/images/motivator.jpg';
  }

  if (ctx.request.body._id) {
    delete ctx.request.body._id;
  }

  user.motivators.push(ctx.request.body);
  await user.save();

  ctx.status = 200;
  ctx.body = user.motivators;
};

export const updateMotivator = async ctx => {
  const motivatorId = getLastValueFromURLPath(ctx.request.path);
  const ctxBody = ctx.request.body;
  const user = await User.findOne({'_id': ctx.state.user._id}).exec();
  const motivator = user.motivators.id(motivatorId);

  // if (_.has(ctxBody, 'favorite')) {
  //
  // }
  //
  // else if (_.has(ctxBody, 'done')) {
  //   motivator.done = true;
  //   motivator.value = motivator.maxValue;
  //   user.points -= motivator.value;
  // }
  //
  // else {
    _.forIn(ctxBody, (value, key) => {
      motivator[key] = value;
    });
  // }

  await user.save();

  ctx.status = 200;
  ctx.body = user.motivators;
};

export const deleteMotivator = async ctx => {
  const motivatorId = getLastValueFromURLPath(ctx.request.path);
  const user = await User.findOne({'_id': ctx.state.user._id}).exec();

  user.motivators.remove({'_id': motivatorId});
  await user.save();

  ctx.status = 200;
  ctx.body = user.motivators;
};
