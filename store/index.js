import Vuex       from 'vuex';
import actions    from './actions';
import auth       from './modules/auth';
import user       from './modules/user';
import tasks      from './modules/tasks';
import motivators from './modules/motivators';

export default () => {
  return new Vuex.Store({
    actions,
    modules: {
      auth,
      user,
      tasks,
      motivators,
    },
    strict: process.env.NODE_ENV !== 'production',
  });
};
