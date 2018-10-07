import axios from 'axios/index';

const state = () => ({
  all: [],
  modalVisibility: false,
  modalData: {}
});

const actions = {
  async create({commit}, createdFields) {
    try {
      const {data} = await axios.post('/api/motivators', createdFields);
      commit('setMotivators', data);
    } catch (error) {
      throw error;
    }
  },

  async update({commit}, {id, updatedFields}) {
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
  }
};

const mutations = {
  setMotivators(state, motivators) {
    state.all = motivators;
  },

  toggleModalVisibility(state, isVisible) {
    state.modalVisibility = isVisible
  },

  setModalData(state, data) {
    state.modalData = data;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
