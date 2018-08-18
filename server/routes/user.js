import {read, update} from '../controllers/user';

const authRouts = (router, path) => {
  router
    .get(`${path}/:id`, read)
    .put(`${path}/:id`, update)
};

export default authRouts;
