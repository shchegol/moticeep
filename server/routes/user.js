import {updateUser} from '../controllers/user';

const userRouts = (router, path) => {
  router
    .put(`${path}/:id`, updateUser)
};

export default userRouts;
