import request from "@/utils/request"
export default {
  name: "saleStore",
  namespaced: true,
  state: {
    saleList: [],
    searchList: []
  },
  mutations: {
    saleList(state, payload) {
      state.saleList = payload
    },
    searchList(state, payload) {
      state.searchList = payload
    },
    searchHistoryList(state, payload) {
      state.searchHistoryList = payload
    },
    hostSearchList(state, payload) {
      state.hostSearchList = payload
    }
  },
  actions: {
    async fetchSaleList({ commit }, params = {}) {
      const result = await request({
        url: "/sales/fetchList",
        method: "get",
        data: { ...params }
      })
      const { statusCode, data } = result
      if (statusCode === 200) {
        commit("saleList", data)
      } else {
        commit("saleList", [])
      }
      console.log("saleList::", res)
    },
    searchSaleList({ commit }, params = {}) {},
    async fetchSearchHistory({ commit }, params = {}) {
      const result = await request({
        url: "/sales/searchHistory",
        method: "get",
        data: { ...params }
      })
      const { statusCode, data } = result
      if (statusCode === 200) {
        commit("searchHistoryList", data)
      } else {
        commit("searchHistoryList", [])
      }
      console.log("searchHistoryList::", res)
    }
  }
}
