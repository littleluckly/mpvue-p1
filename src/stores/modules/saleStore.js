import request from "@/utils/request"
export default {
  name: "saleStore",
  namespaced: true,
  state: {
    saleList: [],
    searchList: [],
    saleDetail: {}
  },
  mutations: {
    saleList(state, payload) {
      state.saleList = payload
    },
    saleDetail(state, payload) {
      state.saleDetail = payload
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
    },
    async fetchSaleDetail({ commit }, params = {}) {
      const result = await request({
        url: "/sales/detail",
        method: "get",
        data: { ...params }
      })
      const { statusCode, data } = result
      if (statusCode === 200) {
        commit("saleDetail", data ? data[0] : {})
      } else {
        commit("saleDetail", {})
      }
      console.log("saleList::", res)
    },
    async focusSale({ commit, dispatch }, params = {}) {
      const result = await request({
        url: "/sales/focus",
        method: "POST",
        data: { ...params }
      })
      const { statusCode } = result
      console.log("result", result)
      if (statusCode === 200) {
        dispatch("fetchSaleDetail", { ...params })
      }
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
