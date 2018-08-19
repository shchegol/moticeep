import {readUser, updateUser} from '../controllers/user';

const authRouts = (router, path) => {
  router
    .get(`${path}/:id`, readUser)
    .put(`${path}/:id`, updateUser)
};

export default authRouts;
