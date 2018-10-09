import axios from 'axios';
import _     from 'lodash';

const state = () => ({
  all: [],
  modalIsActive: false,
  modalData: {},
});

const getters = {
  sortedMotivators: (state, getters, rootState) => {
    let activeMotivators = _.filter(state.all, ['done', false]);
    let motivators = _.map(activeMotivators, motivator => Object.assign({}, motivator));
    let favorite = _.filter(motivators, 'favorite');
    let totalPoints = rootState.user.item.points;
    let singlePoint;

    if (favorite.length > 0) {
      singlePoint = Math.floor(totalPoints / favorite.length);

      _.each(motivators, motivator => {
        if (motivator.favorite) {
          motivator.value = singlePoint / motivator.maxValue * 100;
        } else {
          motivator.value = 0;
        }
      });
    } else {
      singlePoint = Math.floor(totalPoints / motivators.length);

      _.each(motivators, motivator => {
        motivator.value = singlePoint / motivator.maxValue * 100;
      });
    }

    return motivators;
  },
};

const actions = {
  async create({commit}, createdFields) {
    try {
      const {data} = await axios.post('/api/motivators', createdFields);
      commit('setMotivators', data);
    } catch (error) {
      throw error;
    }
  },

  async update({commit}, updatedFields) {
    try {
      const {data} = await axios.put(`/api/motivators/${updatedFields.id}`, updatedFields);
      commit('setMotivators', data);
    } catch (error) {
      throw error;
    }
  },

  async remove({commit}, id) {
    try {
      const {data} = await axios.delete(`/api/motivators/${id}`);
      commit('setMotivators', data);
    } catch (error) {
      throw error;
    }
  },

  showModal({commit}, data) {
    commit('toggleModalVisibility', true);
    commit('setModalData', data);
  },

  hideModal({commit}) {
    commit('toggleModalVisibility', false);
    commit('setModalData', {});
  },
};

const mutations = {
  setMotivators(state, payload) {
    state.all = payload;
  },

  toggleModalVisibility(state, payload) {
    state.modalIsActive = payload;
  },

  setModalData(state, payload) {
    state.modalData = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
