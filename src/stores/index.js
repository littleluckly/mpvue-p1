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
  state: {},
  mutations: {},
  actions: {
    async getSession({ dispatch }, params = {}) {
      const result = await request({
        url: "/login/jscode2session",
        data: { code: params.code }
      })
      if (result.statusCode == 200) {
        dispatch("saveUserInfo", { ...params, ...result.data })
      }
    },
    async saveUserInfo(ctx, params) {
      const result = request({
        url: "/login/userInfo",
        method: "POST",
        data: { ...params }
      })
      console.log("result", result)
    }
  }
})
// store.$db = new MyDB().init()
store.$request = request
export default store
