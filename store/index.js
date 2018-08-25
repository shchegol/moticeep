import Vuex      from 'vuex';
import mutations from './mutations';
import actions   from './actions';
import auth   from './modules/auth';

export default () => {
  return new Vuex.Store({
    state: {
      user: {},
    },
    mutations,
    actions,
    modules: {
      auth,
    },
    strict: process.env.NODE_ENV !== 'production'
  });
};
