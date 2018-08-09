import mongoose from 'mongoose';
import config   from 'config';

mongoose.Promise = Promise;

if (process.env.MONGOOSE_DEBUG) {
  mongoose.set('debug', true);
}

mongoose.connect(config.mongoose.uri, config.mongoose.options)
  .then(() => {
    console.log('Database connection established');
  })
  .catch((err) => console.error(err));

export default mongoose;

