import {login, logout, register} from '../controllers/user';

const authRouts = (router, path) => {
  router
    .post(`${path}/login`, login)
    .get(`${path}/logout`, logout)
    .post(`${path}/register`, register);
};

export default authRouts;
