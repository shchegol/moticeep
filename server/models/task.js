import mongoose   from 'mongoose';
import userSchema from '../schemas/user';

const User = mongoose.model('User', userSchema);

export const createTask = async (opts) => {
  return await User.tasks.create(opts);
};

export const readUser = async (opts) => {
  return await User.findOne(opts).exec()
};

export const updateUser = async (opts) => {
  return await User.updateOne(opts)
};

export default User;
