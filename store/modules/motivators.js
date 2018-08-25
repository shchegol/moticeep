import axios from 'axios/index';

const actions = {
  async motivatorCreate({commit}, createdFields) {
    try {
      const {data} = await axios.post('/api/motivators', createdFields);

      commit('setUser', data);
    } catch (error) {
      if (!error.response) {
        throw new Error('Ошибка на сервере');
      }

      throw error;
    }
  },

  async motivatorEdit({commit}, {id, updatedFields}) {
    try {
      const {data} = await axios.put(`/api/motivators/${id}`, updatedFields);

      commit('setUser', data);
    } catch (error) {
      if (!error.response) {
        throw new Error('Ошибка на сервере');
      }

      throw error;
    }
  },

  async motivatorDelete({commit}, id) {
    try {
      const {data} = await axios.delete(`/api/motivators/${id}`);

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
