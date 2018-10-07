import Vuex       from 'vuex';
import common       from './modules/common';
import auth       from './modules/auth';
import user       from './modules/user';
import tasks      from './modules/tasks';
import motivators from './modules/motivators';

export default () => {
  return new Vuex.Store({
    actions: {
      nuxtServerInit({commit}, {req}) {
        if (req.session.passport && req.state.user) {
          commit('user/setUser', req.state.user.getPublicFields());
          commit('tasks/setTasks', req.state.user.tasks);
          commit('motivators/setMotivators', req.state.user.motivators);
        }
      },
    },
    modules: {
      common,
      auth,
      user,
      tasks,
      motivators,
    },
  });
};
