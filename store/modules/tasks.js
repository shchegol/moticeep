import axios from 'axios/index';

const state = {
  all: [],
};

const actions = {
  async taskCreate({commit}, createdFields) {
    try {
      const {data} = await axios.post('/api/tasks', createdFields);
      commit('setTasks', data);
    } catch (error) {
      throw error;
    }
  },

  async taskUpdate({commit}, {taskId, updatedFields}) {
    try {
      const {data} = await axios.put(`/api/tasks/${taskId}`, updatedFields);
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

