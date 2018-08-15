import Vuex         from 'vuex';
import axios        from 'axios';
// import cookieparser from 'cookieparser';
// import Cookie       from 'js-cookie';

const createStore = () => {
  return new Vuex.Store({
    state: {
      authUser: null,
    },

    mutations: {
      setUser(state, user) {
        state.authUser = user;
      },
    },

    actions: {
      nuxtServerInit({commit}, {req}) {
        console.log('vuex req.session', req.session);

        if (req.session.passport) {
          commit('setUser', String(req.session.passport.user));
        }
      },

      async register({commit}, {email, password}) {
        try {
          console.log('vuex register', email, password);

          const {data} = await axios.post('/api/register', {
            email,
            password,
          });

          commit('setUser', data);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            throw new Error('Bad credentials');
          }
          throw error;
        }
      },

      async login({commit}, {email, password}) {
        try {
          console.log('vuex login', email, password);

          const {data} = await axios.post('/api/login', {
            email,
            password,
          });

          commit('setUser', data);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            throw new Error('Bad credentials');
          }
          throw error;
        }
      },

      async logout({commit}) {
        console.log('vuex logout');

        await axios.post('/api/logout');
        commit('setUser', null);
      },
    },
  });
};

export default createStore;
