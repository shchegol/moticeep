import _ from 'lodash';

const state = () => ({
  filterType: 'main',
  snackbar: {
    active: false,
    message: '',
    color: undefined,
  },
  drawer: false,
});

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
  actions,
  mutations,
};
