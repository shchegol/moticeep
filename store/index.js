import Vuex from 'vuex';
import cookieparser from 'cookieparser';
import Cookie from 'js-cookie';

const createStore = () => {
  return new Vuex.Store({
    state: {
      counter: 0,
      auth: null,
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

        console.log('vuex req.session', req.session, '###############################################');

        if (req.session && req.session.authUser) {
          commit('setUser', req.session.authUser);
        }

        if (req.headers.cookie) {
          cookie = JSON.parse(
            JSON.stringify(cookieparser.parse(req.headers.cookie)));
          counter = isNaN(cookie.counter) ? 0 : cookie.counter;
        }

        commit('setCounter', counter);
      },

      async login({commit}, {username, password}) {

        console.log('vuex login');

        try {
          const {data} = await axios.post('/api/login', {username, password});
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
