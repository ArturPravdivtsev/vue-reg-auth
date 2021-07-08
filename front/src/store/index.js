import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from '../services/AuthService'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    isAuth: false
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setAuth(state, payload) {
      state.isAuth = payload
    }
  },
  actions: {
    async login({ commit }, { username, password} ) {
      try {
        const response = await AuthService.login(username, password)
        console.log(response)
        localStorage.setItem('token', response.data.accessToken)
        commit('setAuth', true)
        commit('setUser', response.data.user)
      } catch(e) {
        console.log(e.response?.data?.message)
      }
    },
    async registration({ commit }, { username, password }) {
      try {
        const response = await AuthService.registration(username, password)
        console.log(response)
        localStorage.setItem('token', response.data.accessToken)
        commit('setAuth', true)
        commit('setUser', response.data.user)
      } catch(e) {
        console.log(e.response?.data?.message)
      }
    },
    async checkAuth({ commit }) {
      try {
        const response = await axios.get('http://localhost:5000/auth/refresh', {
          withCredentials: true
        })
        console.log(response)
        localStorage.setItem('token', response.data.accessToken)
        commit('setAuth', true)
        commit('setUser', response.data.user)
      } catch(e) {
        console.log(e.response?.data?.message)
      }
    }
  },
  getters: {
    getAuth: state => state.isAuth,
    getUser: state => state.user
  }
})
