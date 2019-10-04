import request from "@/utils/request"
export default {
  name: "saleStore",
  namespaced: true,
  state: {
    saleList: []
  },
  mutations: {
    saleList(state, payload) {
      state.saleList = payload
    }
  },
  actions: {
    fetchSaleList({ commit }, params = {}) {
      request({
        url: "/sales/fetchList",
        method: "get",
        success: function(res) {
          const { statusCode, data } = res
          if (statusCode === 200) {
            commit("saleList", data)
          } else {
            commit("saleList", [])
          }
          console.log("saleList::", res)
        }
      })
    }
  }
}
