import axios from 'axios/index';

const actions = {
  async userEdit({commit}, {userId, updatedFields}) {
    try {
      const {data} = await axios.put(`/api/user/${userId}`, updatedFields);

      commit('setUser', data);
    } catch (error) {
      if (!error.response) {
        throw new Error('Ошибка на сервере');
      }

      throw error;
    }
  },
};

export default {
  actions,
};

