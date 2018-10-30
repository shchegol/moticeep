const state = () => ({
  drawer: false,
  filterType: 'main',
  header: {
    title: 'MOTIKEEP',
    color: 'primary'
  },
  snackbar: {
    active: false,
    message: '',
    color: undefined,
  },
});

const actions = {
  changeFilterType({commit}, type) {
    let headerOpt = {
      title: 'MOTIKEEP',
      color: 'primary'
    };

    if (type === 'done') {
      headerOpt = {
        title: 'Завершённые',
        color: 'blue-grey darken-2'
      }
    }

    if (type === 'deleted') {
      headerOpt = {
        title: 'Корзина',
        color: 'blue-grey darken-2'
      }
    }

    commit('changeFilterType', type);
    commit('changeHeader', headerOpt);
  },
  changeHeader({commit}, data) {
    commit('changeHeader', data);
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
  changeHeader(state, data) {
    state.header = data;
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
