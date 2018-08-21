import {createTask, updateTask, deleteTask} from '../controllers/task';

const tasksRouts = (router, path) => {
  router
    .post(`${path}`, createTask)
    .put(`${path}/:id`, updateTask)
    .delete(`${path}/:id`, deleteTask);
};

export default tasksRouts;
