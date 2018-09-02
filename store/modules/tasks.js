import axios from 'axios/index';

const state = () => ({
  all: [],
});

const actions = {
  async taskCreate({commit}, createdFields) {
    try {
      const {data} = await axios.post('/api/tasks', createdFields);
      commit('setTasks', data);
    } catch (error) {
      throw error;
    }
  },

  async taskUpdate({commit}, updated) {
    try {
      const {data} = await axios.put(`/api/tasks/${updated.id}`, updated);
      commit('setTasks', data);
    } catch (error) {
      throw error;
    }
  },

  async taskDelete({commit}, taskId) {
    try {
      const {data} = await axios.delete(`/api/tasks/${taskId}`);
      commit('setTasks', data);
    } catch (error) {
      throw error;
    }
  },
};

const mutations = {
  setTasks(state, tasks) {
    state.all = tasks;
  },
};

export default {
  actions,
  state,
  mutations,
};

