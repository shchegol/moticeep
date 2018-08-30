import Vuex       from 'vuex';
import auth       from './modules/auth';
import user       from './modules/user';
import tasks      from './modules/tasks';
import motivators from './modules/motivators';

export default () => {
  return new Vuex.Store({
    actions: {
      nuxtServerInit({commit}, {req}) {
        if (req.session.passport && req.state.user) {
          commit('setUser', req.state.user.getPublicFields());
          commit('setTasks', req.state.user.tasks);
          commit('setMotivators', req.state.user.motivators);

        }
      },
    },
    modules: {
      auth,
      user,
      tasks,
      motivators,
    },
  });
};
