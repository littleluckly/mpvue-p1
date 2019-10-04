import Vue from "vue"
import Vuex from "vuex"
import request from "@/utils/request"
import MyDB from "@/utils/db"
import saleStore from "./modules/saleStore"
import rentStore from "./modules/rentStore"

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    saleStore,
    rentStore
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
    fetchHomepageList({ commit }, params) {
      wx.request({
        url: "https://localhost:9527/rent/fetchList",
        method: "get",
        success: function(res) {
          const { statusCode, data } = res
          if (statusCode === 200) {
            commit("homepageList", data)
          } else {
            commit("homepageList", [])
          }
          console.log("res::", res)
        }
      })
    },
    toggleDrawerVisible({ commit }, flag) {
      commit("drawerVisible", flag)
    }
  }
})
// store.$db = new MyDB().init()
store.$request = request
export default store
