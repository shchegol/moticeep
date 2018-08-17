import {createTask, readTask, readAllTasks, updateTask, deleteTask} from '../controllers/task';

const tasksRouts = (router, path) => {
  router
    .get(`${path}`, readAllTasks)
    .post(`${path}/:id`, createTask)
    .get(`${path}/:id`, readTask)
    .put(`${path}/:id`, updateTask)
    .delete(`${path}/:id`, deleteTask);
};

export default tasksRouts;
