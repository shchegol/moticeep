// const passport = require('koa-passport');
// const User = require('../../models/user');
//
// require('./serialize');
//
// require('./localStrategy');
//
// module.exports = passport;

import passport from 'koa-passport';
// import User from '../../models/user';
import './serialize';
import './localStrategy'

export default passport;
