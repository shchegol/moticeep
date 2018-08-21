import Vuex  from 'vuex';
import axios from 'axios';
// import cookieparser from 'cookieparser';
// import Cookie       from 'js-cookie';

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: {},
      auth: false,
      currency: 'руб',
    },

    mutations: {
      setUser(state, user) {
        state.user = user;
      },

      setAuth(state, auth) {
        state.auth = auth;
      },
    },

    actions: {
      nuxtServerInit({commit}, {req}) {
        if (req.session.passport && req.state.user) {
          commit('setAuth', true);
          commit('setUser', req.state.user);
        }
      },

      async register({commit}, {displayName, email, password}) {
        try {
          const {data} = await axios.post('/api/auth/register', {
            displayName,
            email,
            password,
          });

          commit('setUser', data);
          commit('setAuth', true);
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

          commit('setUser', data);
          commit('setAuth', true);
        } catch (error) {
          if (!error.response) {
            throw new Error('Ошибка на сервере');
          }

          throw error;
        }
      },

      async logout({commit}) {
        await axios.get('/api/auth/logout');
        commit('setUser', {});
        commit('setAuth', false);
      },
    },
  });
};

export default createStore;
