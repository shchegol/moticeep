import Vuex  from 'vuex';
import axios from 'axios';
// import cookieparser from 'cookieparser';
// import Cookie       from 'js-cookie';

const createStore = () => {
  return new Vuex.Store({
    state: {
      auth: null,
      currency: 'руб',
    },

    mutations: {
      setUser(state, user) {
        state.auth = user;
      },
    },

    actions: {
      nuxtServerInit({commit}, {req}) {
        if (req.session.passport) {
          commit('setUser', String(req.session.passport.user));
        }
      },

      async register({commit}, {email, password}) {
        try {
          const {data} = await axios.post('/api/auth/register', {
            email,
            password,
          });

          commit('setUser', data);
        } catch (error) {
          if (!error.response) {
            throw new Error('Ошибка на сервере');
          }

          throw error;
        }
      },

      async login({commit}, {email, password}) {
        try {
          console.log('vuex login', email, password);

          const {data} = await axios.post('/api/auth/login', {
            email,
            password,
          });

          commit('setUser', data);
        } catch (error) {
          if (!error.response) {
            throw new Error('Ошибка на сервере');
          }

          throw error;
        }
      },

      async logout({commit}) {
        console.log('vuex logout');

        await axios.get('/api/auth/logout');
        commit('setUser', null);
      },
    },
  });
};

export default createStore;
