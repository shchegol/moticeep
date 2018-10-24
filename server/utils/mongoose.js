import mongoose from 'mongoose';
import config   from 'config';

// console.log(process.env);
console.log('NODE_CONFIG_DIR: ' + config.util.getEnv('NODE_CONFIG_DIR'));

mongoose.Promise = Promise;

if (process.env.MONGOOSE_DEBUG) {
  mongoose.set('debug', true);
}

mongoose
  .connect(config.mongoose.uri, {
    useNewUrlParser: true,
    auth: {
      user: config.mongoose.user,
      password: config.mongoose.password,
    },
    keepAlive: 300000,
    connectTimeoutMS: 30000,
  })
  .then(() => {
    console.log('Database connection established');
  })
  .catch((err) => console.error(err));

export default mongoose;

