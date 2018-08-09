import Vuex         from 'vuex';
import cookieparser from 'cookieparser';
import Cookie     from 'js-cookie';

const createStore = () => {
  return new Vuex.Store({
    state: {
      counter: 0,
      auth: false,
    },

    mutations: {
      setCounter(state, data) {
        state.counter = data
      },

      increment(state) {
        state.counter++;
        Cookie.set('counter', state.counter)
      },
    },

    actions: {
      nuxtServerInit({commit}, {req}) {
        let counter, cookie;

        if (req.headers.cookie) {
          cookie = JSON.parse(JSON.stringify(cookieparser.parse(req.headers.cookie)));
          counter = isNaN(cookie.counter) ? 0 : cookie.counter
        }

        commit('setCounter', counter);
      },
    },
  });
};

export default createStore;
