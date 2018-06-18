exports.get = async function(ctx, next) {
  if (ctx.isAuthenticated()) {
    ctx.body = ctx.render('welcome');
  } else {
    ctx.body = ctx.render('login');
  }

};

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
//
// while(true) {
//   await sleep(5000);
//
//   if (shoudBeFinished) break;
// }

// Promise.race(
//   request('http://ya.ru'),
//   sleep(5000)
// ).then()
