// should be renamed to default.js

module.exports = {
  secret: 'mysecret',

  server: {
    host: process.env.NODE_ENV === 'production' ? 'prod_server_id' : 'localhost',
    port:  process.env.NODE_ENV === 'production' ? 'prod_server_port' : '3000',
  },

  mongoose: {
    uri: 'mongodb://db_url/motikeep',
    user: 'db_username',
    password: 'db_password'
  },

  crypto: {
    hash: {
      length: 128,
      iterations: process.env.NODE_ENV === 'production' ? 12000 : 1,
    },
  },

  root: process.cwd(),
};

