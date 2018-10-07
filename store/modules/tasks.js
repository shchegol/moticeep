import axios from 'axios/index';

const state = () => ({
  all: [],
  modalVisibility: false,
  modalData: {}
});

const actions = {
  async create({commit}, createdFields) {
    try {
      const {data} = await axios.post('/api/tasks', createdFields);
      commit('setTasks', data);
    } catch (error) {
      throw error;
    }
  },

  async update({commit}, updated) {
    try {
      const {data} = await axios.put(`/api/tasks/${updated.id}`, updated);
      commit('setTasks', data);
    } catch (error) {
      throw error;
    }
  },

  async remove({commit}, taskId) {
    try {
      const {data} = await axios.delete(`/api/tasks/${taskId}`);
      commit('setTasks', data);
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
  setTasks(state, tasks) {
    state.all = tasks;
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
  actions,
  state,
  mutations,
};

