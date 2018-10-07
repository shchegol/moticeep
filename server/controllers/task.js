import User                      from '../models/user';
import _                         from 'lodash';
import {getLastValueFromURLPath} from '../utils/common';

export const createTask = async ctx => {
  const user = await User.findOne({'_id': ctx.state.user._id}).exec();

  if (ctx.request.body.title === '') {
    ctx.request.body.title = 'За труды';
  }

  if (ctx.request.body.value === '') {
    ctx.request.body.value = 1;
  }

  if (ctx.request.body._id === null) {
    delete ctx.request.body._id;
  }

  user.tasks.push(ctx.request.body);
  await user.save();

  ctx.status = 200;
  ctx.body = user.tasks;
};

export const updateTask = async ctx => {
  const taskId = getLastValueFromURLPath(ctx.request.path);
  const ctxBody = ctx.request.body;
  const user = await User.findOne({'_id': ctx.state.user._id}).exec();
  const task = user.tasks.id(taskId);

  _.forIn(ctxBody, (value, key) => {
    task[key] = value;
  });
  await user.save();

  ctx.status = 200;
  ctx.body = user.tasks;
};

export const deleteTask = async ctx => {
  const taskId = getLastValueFromURLPath(ctx.request.path);
  const user = await User.findOne({'_id': ctx.state.user._id}).exec();

  user.tasks.remove({'_id': taskId});
  await user.save();

  ctx.status = 200;
  ctx.body = user.tasks;
};
