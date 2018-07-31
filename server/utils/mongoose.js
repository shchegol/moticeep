import mongoose from 'mongoose';
import config   from 'config';

export default async() => {
  if (process.env.MONGOOSE_DEBUG) {
    mongoose.set('debug', true);
  }

  await mongoose
    .connect(config.mongoose.uri, config.mongoose.options)
    .then(() => {
      console.log('Database connection established');
    })
    .catch((err) => console.error(err));

  return mongoose;
}

