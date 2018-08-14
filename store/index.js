import Vuex         from 'vuex';
import axios        from 'axios';
import cookieparser from 'cookieparser';
import Cookie       from 'js-cookie';

const createStore = () => {
  return new Vuex.Store({
    state: {
      counter: 0,
      authUser: null,

    },

    mutations: {
      setUser(state, user) {
        state.authUser = user;
      },

      setCounter(state, data) {
        state.counter = data;
      },

      increment(state) {
        state.counter++;
        Cookie.set('counter', state.counter);
      },
    },

    actions: {
      nuxtServerInit({commit}, {req}) {
        let counter, cookie;

        // console.log('vuex req.session', req.session, '###############################################');
        // console.log('nuxtServerInit');

        if (req.session && req.session.passport.user) {
          commit('setUser', req.session.passport.user);
        }

        if (req.headers.cookie) {
          cookie = JSON.parse(
            JSON.stringify(cookieparser.parse(req.headers.cookie)));
          counter = isNaN(cookie.counter) ? 0 : cookie.counter;
        }

        commit('setCounter', counter);
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
