import {login, logout, register} from '../controllers/auth';

const authRouts = (router, path) => {
  router
    .post(`${path}/login`, login)
    .get(`${path}/logout`, logout)
    .post(`${path}/register`, register);
};

export default authRouts;
