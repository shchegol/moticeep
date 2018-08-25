export default {
  nuxtServerInit({commit}, {req}) {
    if (req.session.passport && req.state.user) {
      commit('setUser', req.state.user.getPublicFields());
    }
  },
};
