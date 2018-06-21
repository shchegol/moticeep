// process.env["NODE_CONFIG_DIR"] = __dirname + "/server/config/";

const mongoose = require('mongoose');
const config = require('config');

if (process.env.MONGOOSE_DEBUG) {
  mongoose.set('debug', true);
}

mongoose
  .connect(config.mongoose.uri, config.mongoose.options)
  .then(() => {
    console.log('Database connection established');
    })
  .catch((err) => console.error(err));

module.exports = mongoose;
