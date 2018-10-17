const state = () => ({
  /**
   * changing types of filter cards
   * 0 - default
   * 1 - by archive
   * 2 - by trash
   */
  filterType: 0,
  snackbar: {
    active: false,
    message: '',
    color: undefined,
  },
  drawer: false,
});

const actions = {
  changeFilterType({commit}) {
    commit('toggleDrawer');
  },
  snackbarShow({commit}, data) {
    commit('snackbarShow', data);
  },
  snackbarHide({commit}) {
    commit('snackbarHide');
  },
  toggleDrawer({commit}) {
    commit('toggleDrawer');
  },
};

const mutations = {
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
  toggleDrawer(state) {
    state.drawer = !state.drawer
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
