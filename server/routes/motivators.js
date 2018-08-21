import {createMotivator, updateMotivator, deleteMotivator} from '../controllers/motivator';

const motivatorRouts = (router, path) => {
  router
    .post(`${path}`, createMotivator)
    .put(`${path}/:id`, updateMotivator)
    .delete(`${path}/:id`, deleteMotivator);
};

export default motivatorRouts;
