const User = require('../models/user');
const user = new User()

export function register(next) {
  const ctx = this;
  console.log(ctx)

  // yield user.read({userName: opts.userName}).then(function (doc) {
  //   if (doc.length > 0) {
  //     ctx.body = {
  //       msg: 'error',
  //       state: false
  //     }
  //   } else {
  //     return user.save(opts)
  //   }
  // }).then(function (doc) {
  //   if (doc) {
  //     ctx.body = {
  //       msg: 'success',
  //       data: {
  //         _id : user._id,
  //         userName : user.userName,
  //         userNickName : user.userNickName,
  //         userImg : user.userImg,
  //       },
  //       state: true,
  //       token : token
  //     }
  //   }
  // })
}
