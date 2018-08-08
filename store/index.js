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
        console.log(state, data)
        state.counter = data
      },

      increment(state) {
        state.counter++;
        Cookie.set('counter', state.counter)
      },
    },

    actions: {
      nuxtServerInit({commit}, {req}) {
        let counter = 0;
        let cookie;

        if (req.headers.cookie) {
          cookie = JSON.parse(JSON.stringify(cookieparser.parse(req.headers.cookie)));
          counter = cookie.counter
        }

        commit('setCounter', counter);
      },
    },
  });
};

export default createStore;
