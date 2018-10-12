import axios from 'axios';
import _     from 'lodash';

const state = () => ({
  all: [],
  modalIsActive: false,
  modalData: {},
});

const getters = {
  sortedMotivators: state => {
    return _.orderBy(state.all, 'favorite', 'desc');
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
      commit('setMotivators', data);
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
    commit('setModalData', {});
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
