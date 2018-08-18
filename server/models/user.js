import mongoose   from 'mongoose';
import userSchema from '../schemas/user';

const User = mongoose.model('User', userSchema);

export const createUser = async (opts) => {
  return await User.create(opts);
};

export const readUser = async (opts) => {
  return await User.findOne(opts).exec()
};

export const updateUser = async (opts) => {
  return await User.updateOne(opts)
};

export default User;
