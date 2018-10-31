import axios from 'axios';
import _     from 'lodash';

const state = () => ({
  all: [],
  modalIsActive: false,
  modalData: {
    title: null,
    maxValue: null,
  },
});

const getters = {
  sortedMotivators(state, getters, rootState) {
    let filterType = rootState.common.filterType;
    let filterOpt = filterType;
    let motivators = {};

    if (filterType === 'main') {
      filterOpt = {
        'deleted': false,
        'done': false,
      };
    } else if (filterType === 'done') {
      filterOpt = {
        'deleted': false,
        'done': true,
      };
    }

    motivators = _.filter(state.all, filterOpt);

    return _.orderBy(motivators, ['favorite', 'done'], ['desc', 'ask']);
  },

  motivatorsCount(state, getters) {
    return getters.sortedMotivators.length;
  },
};

const actions = {
  async create({commit}, createdFields) {
    try {
      const {data} = await axios.post('/api/motivators', createdFields);
      commit('setMotivators', data);
    } catch (error) {
      throw error;
    }
  },

  async update({commit}, {id, ...updatedFields}) {
    try {
      const {data} = await axios.put(`/api/motivators/${id}`, updatedFields);

      commit('user/setUser', data.user, {root: true});
      commit('setMotivators', data.motivators);
    } catch (error) {
      throw error;
    }
  },

  async remove({commit}, id) {
    try {
      const {data} = await axios.delete(`/api/motivators/${id}`);
      commit('setMotivators', data);
    } catch (error) {
      throw error;
    }
  },

  showModal({commit}, data) {
    commit('toggleModalVisibility', true);
    commit('setModalData', data);
  },

  hideModal({commit}) {
    commit('toggleModalVisibility', false);
    commit('setModalData', {
      title: null,
      maxValue: null,
    });
  },
};

const mutations = {
  setMotivators(state, payload) {
    state.all = payload;
  },

  toggleModalVisibility(state, payload) {
    state.modalIsActive = payload;
  },

  setModalData(state, payload) {
    state.modalData = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
