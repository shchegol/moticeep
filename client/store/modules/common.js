import _ from 'lodash';

const state = () => ({
  drawer: false,
  filterType: 'main',
  snackbar: {
    active: false,
    message: '',
    color: undefined,
  },
});

const getters = {
  showCardsDivider(state, getters, rootState, rootGetters) {
    if (rootGetters['tasks/tasksCount'] !== 0) {
      return rootGetters['motivators/motivatorsCount'] !== 0;
    } else {
      return false;
    }
  },
};

const actions = {
  changeFilterType({commit}, type) {
    commit('changeFilterType', type);
  },
  snackbarShow({commit}, data) {
    commit('snackbarShow', data);
  },
  snackbarHide({commit}) {
    commit('snackbarHide');
  },
  toggleDrawer({commit}, data) {
    commit('toggleDrawer', data);
  },
};

const mutations = {
  changeFilterType(state, data) {
    state.filterType = data;
  },
  snackbarShow(state, data) {
    state.snackbar = data;
  },
  snackbarHide(state) {
    state.snackbar = {
      active: false,
      message: '',
      color: undefined,
    };
  },
  toggleDrawer(state, payload) {
    if (payload.type || !payload.type && payload !== state.drawer) {
      state.drawer = !state.drawer;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
