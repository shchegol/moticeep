import axios from 'axios/index';

const state = () => ({
  all: [],
  modalIsActive: false,
  modalData: {},
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

  async update({commit}, updatedFields) {
    try {
      const {data} = await axios.put(`/api/tasks/${updatedFields.id}`, updatedFields);
      commit('setTasks', data);
    } catch (error) {
      throw error;
    }
  },

  async remove({commit}, id) {
    try {
      const {data} = await axios.delete(`/api/tasks/${id}`);
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
  },
};

const mutations = {
  setTasks(state, payload) {
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
  actions,
  mutations,
};

