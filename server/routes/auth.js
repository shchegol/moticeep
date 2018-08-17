import {login, logout, register, auth} from '../controllers/auth';

const authRouts = (router, path) => {
  router
    .get(`${path}`, auth)
    .post(`${path}/login`, login)
    .get(`${path}/logout`, logout)
    .post(`${path}/register`, register);
};

export default authRouts;
