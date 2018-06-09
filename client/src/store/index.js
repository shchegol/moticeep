import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    totalPoints: 565,
    payCards: [],
    motiCards: [],
  },
  actions: {},
  mutations: {
    changeTotalPoints(state, payload) {
      state.totalPoints = payload;
    },
  },
  getters: {},
});
