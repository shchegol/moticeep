const state = () => ({
  snackbar: {
    active: false,
    message: '',
    color: undefined,
  },
});

const actions = {
  snackbarShow({commit}, data) {
    commit('snackbarShow', data);
  },
  snackbarHide({commit}) {
    commit('snackbarHide', data);
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
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
