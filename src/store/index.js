import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    userId: null,
  },
  mutations: {
    SET_USER_ID(state, userId) {
      state.userId = userId;
    },
    CLEAR_USER_ID(state) {
      state.userId = null;
    },
  },
  actions: {
    setUserId({ commit }, userId) {
      commit('SET_USER_ID', userId);
    },
    clearUserId({ commit }) {
      commit('CLEAR_USER_ID');
    },
  },
  getters: {
    getUserId: (state) => state.userId,
  },
  
  plugins: [
    createPersistedState({
      paths: ['userId'],
    }),
  ],
});
