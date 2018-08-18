import {createTask, deleteTask} from '../controllers/task';

const tasksRouts = (router, path) => {
  router
    // .get(`${path}`, readAllTasks)
    .post(`${path}`, createTask)
    // .put(`${path}/:id`, updateTask)
    .delete(`${path}/:id`, deleteTask);
};

export default tasksRouts;
