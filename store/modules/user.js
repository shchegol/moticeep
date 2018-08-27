import axios from 'axios/index';

const state = {
  item: [],
};

const actions = {
  async userUpdate({commit}, {userId, updatedFields}) {
    try {
      const {data} = await axios.put(`/api/user/${userId}`, updatedFields);
      commit('setUser', data);
    } catch (error) {
      throw error;
    }
  },
};

const mutations = {
  setUser(state, user) {
    state.item = user;
  },
};

export default {
  state,
  actions,
  mutations,
};

