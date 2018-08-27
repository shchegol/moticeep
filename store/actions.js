export default {
  nuxtServerInit({commit}, {req}) {
    if (req.session.passport && req.state.user) {
      commit('setUser', req.state.user.getPublicFields());
      // commit('setTasks', req.state.user.tasks);
      commit('setMotivators', req.state.user.motivators);

    }
  },
};
