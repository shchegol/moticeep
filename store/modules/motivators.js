import axios from 'axios/index';

const state = () => ({
  all: [],
});

const actions = {
  async motivatorCreate({commit}, createdFields) {
    try {
      const {data} = await axios.post('/api/motivators', createdFields);
      commit('setMotivators', data);
    } catch (error) {
      throw error;
    }
  },

  async motivatorUpdate({commit}, {id, updatedFields}) {
    try {
      const {data} = await axios.put(`/api/motivators/${id}`, updatedFields);
      commit('setMotivators', data);
    } catch (error) {
      throw error;
    }
  },

  async motivatorDelete({commit}, id) {
    try {
      const {data} = await axios.delete(`/api/motivators/${id}`);
      commit('setMotivators', data);
    } catch (error) {
      throw error;
    }
  },
};

const mutations = {
  setMotivators(state, motivators) {
    state.all = motivators;
  },
};

export default {
  state,
  actions,
  mutations,
};
