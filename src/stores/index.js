import Vue from "vue"
import Vuex from "vuex"
import saleStore from './modules/saleStore'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    saleStore
  },
  state: {
    count: 0,
    homepageList: [],
    drawerVisible: false
  },
  mutations: {
    increment: state => {
      state.count += 1
    },
    decrement: state => {
      state.count -= 1
    },
    homepageList: (state, payload) => {
      state.homepageList = payload
    },
    drawerVisible: (state, payload) => {
      state.drawerVisible = payload
    }
  },
  actions: {
    fetchHomepageList({
      commit
    }, params) {
      wx.request({
        url: 'https://localhost:9527/rent/fetchList',
        method: 'get',
        success: function (res) {
          const {
            statusCode,
            data
          } = res
          if (statusCode === 200) {
            commit("homepageList", data)
          } else {
            commit("homepageList", [])
          }
          console.log('res::', res)
        }
      })
    },
    toggleDrawerVisible({
      commit
    }, flag) {
      commit('drawerVisible', flag)
    },
  }
})
