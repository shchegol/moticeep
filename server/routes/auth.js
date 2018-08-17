import {login, logout, register, auth} from '../controllers/auth';

export default (router, path) => {
  router
    .get(`${path}`, auth)
    .post(`${path}/login`, login)
    .get(`${path}/logout`, logout)
    .post(`${path}/register`, register);
}
