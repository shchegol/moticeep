import axios from 'axios/index';

const getters = {
  isAuthenticated: (state, getters, rootState) => {
    return Object.keys(rootState.user.item).length !== 0;
  },
};

const actions = {
  async register({commit}, {displayName, email, password}) {
    try {
      const {data} = await axios.post('/api/auth/register', {
        displayName,
        email,
        password,
        points: 0,
      });

      commit('user/setUser', data, { root: true });
    } catch (error) {
      if (!error.response) {
        throw new Error('Ошибка на сервере');
      }

      throw error;
    }
  },

  async login({commit}, {email, password}) {
    try {
      const {data} = await axios.post('/api/auth/login', {
        email,
        password,
      });

      commit('user/setUser', data.user, { root: true });
      commit('tasks/setTasks', data.tasks, { root: true });
      commit('motivators/setMotivators', data.motivators, { root: true });
    } catch (error) {
      if (!error.response) {
        throw new Error('Ошибка на сервере');
      }

      throw error;
    }
  },

  async logout({commit}) {
    await axios.get('/api/auth/logout');
    commit('user/setUser', {}, { root: true });
  },
};

export default {
  namespaced: true,
  getters,
  actions,
};
