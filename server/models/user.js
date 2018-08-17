import mongoose   from 'mongoose';
import userSchema from '../schemas/user';

const userModel = mongoose.model('User', userSchema);

export const createUser = async (opts) => {
  return await userModel.create(opts)
};
