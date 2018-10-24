module.exports = {
  // todo secret data can be moved to env variables or a separate config
  secret: '8QGvPfvG',

  server: {
    host: process.env.NODE_ENV === 'production' ? '10.50.3.32' : 'localhost',
    port:  process.env.NODE_ENV === 'production' ? '8080' : '3000',
  },

  // providers: {
  //   facebook: {
  //     appId: '1584514044907807',
  //     appSecret: 'f0f14ef63e0c6b9ec549b9b15f63a808',
  //     test: {
  //       login: 'course.test.facebook@gmail.com',
  //       password: 'course-test-facebook',
  //     },
  //     passportOptions: {
  //       display: 'popup',
  //       scope: ['email'],
  //     },
  //   },
  // },

  // mailer: {
  //   transport: 'gmail',
  //
  //   gmail: {
  //     user: 'course.test.mailer',
  //     password: 'course-test-password1',
  //   },
  //
  //   senders: {
  //     // transactional emails, register/forgot pass etc
  //     default: {
  //       fromEmail: 'course.test.mailer@gmail.com',
  //       fromName: 'Motikeep',
  //       signature: '<em>С уважением,<br>Motikeep</em>',
  //     },
  //     // newsletters
  //     informer: {
  //       fromEmail: 'someother@email.com',
  //       fromName: 'Newsletters',
  //       signature: '<em>Have fun!</em>',
  //     },
  //   },
  // },

  mongoose: {
    uri: 'mongodb://ds125713.mlab.com:25713/motikeep',
    user: 'shchegol',
    password: '3aD6C3mq'
  },

  crypto: {
    hash: {
      length: 128,
      // may be slow(!): iterations = 12000 take ~60ms to generate strong password
      iterations: process.env.NODE_ENV === 'production' ? 12000 : 1,
    },
  },

  root: process.cwd(),
};

