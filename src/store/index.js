/* eslint-disable no-useless-catch */
import Vuex from 'vuex';
import { login, signup } from '../services/authService';

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('authToken') || null, 
    user: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token) {
        localStorage.setItem('authToken', token); 
      } else {
        localStorage.removeItem('authToken');
      }
    },
    setUser(state, user) {
        state.user =user
        if (user) {
            localStorage.setItem('user', user); 
          } else {
            localStorage.removeItem('user');
          }
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem('authToken');
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const { user, token } = await login(credentials);
        commit('setUser', user);
        commit('setToken', token);
      } catch (error) {
        throw error;
      }
    },
    async signup({ commit }, credentials) {
      try {
        const { user, token } = await signup(credentials);
        commit('setUser', user);
        commit('setToken', token);
      } catch (error) {
        throw error;
      }
    },

  },
});
