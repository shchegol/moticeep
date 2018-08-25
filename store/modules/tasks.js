import axios from 'axios/index';

const actions = {
  async taskCreate({commit}, createdFields) {
    try {
      const {data} = await axios.post('/api/tasks', createdFields);

      commit('setUser', data);
    } catch (error) {
      if (!error.response) {
        throw new Error('Ошибка на сервере');
      }

      throw error;
    }
  },

  async taskEdit({commit}, {id, updatedFields}) {
    try {
      const {data} = await axios.put(`/api/tasks/${id}`, updatedFields);

      commit('setUser', data);
    } catch (error) {
      if (!error.response) {
        throw new Error('Ошибка на сервере');
      }

      throw error;
    }
  },

  async taskDelete({commit}, {id}) {
    try {
      const {data} = await axios.delete(`/api/tasks/${id}`);

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
