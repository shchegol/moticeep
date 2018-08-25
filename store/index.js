import Vuex      from 'vuex';
import mutations from './mutations';
import actions   from './actions';
import auth      from './modules/auth';
import tasks     from './modules/tasks';

export default () => {
  return new Vuex.Store({
    state: {
      user: {},
    },
    mutations,
    actions,
    modules: {
      auth,
      tasks,
    },
    strict: process.env.NODE_ENV !== 'production',
  });
};
