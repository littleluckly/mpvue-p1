import request from "@/utils/request"
export default {
  name: "saleStore",
  namespaced: true,
  state: {
    saleList: [],
    searchList: [],
    searchHistoryList: [],
    saleDetail: {},
    pagination: {
      pageNo: 1,
      pageSize: 1,
      total: 0
    }
  },
  mutations: {
    pagination(state, payload) {
      state.pagination = {
        ...state.pagination,
        ...payload
      }
    },
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
    //   获取房源列表
    async fetchSaleList({ commit, state }, params = {}) {
      const { pageNo, pageSize } = state.pagination
      const result = await request({
        url: "/sales/fetchList",
        method: "get",
        data: { pageNo, pageSize, ...params },
        showLoading: true
      })
      const { statusCode, data } = result
      if (statusCode === 200) {
        commit("saleList", [...state.saleList, ...data])
        commit("pagination", {
          pageNo: params.pageNo || pageNo,
          total: 100
        })
      } else {
        commit("saleList", [])
      }
    },

    // 获取房源详情
    async fetchSaleDetail({ commit }, params = {}) {
      const result = await request({
        url: "/sales/detail",
        method: "get",
        data: { ...params },
        showLoading: true
      })
      const { statusCode, data } = result
      if (statusCode === 200) {
        commit("saleDetail", data ? data[0] : {})
      } else {
        commit("saleDetail", {})
      }
    },
    // 关注房源
    async focusSale({ commit, dispatch }, params = {}) {
      const result = await request({
        url: "/sales/focus",
        method: "POST",
        data: { ...params }
      })
      const { statusCode } = result
      console.log("/sales/focus", result)
      if (statusCode === 200) {
        dispatch("fetchSaleDetail", { ...params })
      }
    },

    // 保存搜索记录
    async saveSearch({ commit }, params = {}) {
      const result = await request({
        url: "/sales/saveSearch",
        method: "POST",
        data: { ...params }
      })
      console.log("/sales/saveSearch", result)
    },

    // 获取搜索记录
    async fetchSearchHistory({ commit }, params = {}) {
      const result = await request({
        url: "/sales/searchHistory",
        method: "get",
        data: { ...params }
      })
      const { statusCode, data } = result
      if (statusCode == 200) {
        commit("searchHistoryList", data)
      } else {
        commit("searchHistoryList", [])
      }
      console.log("searchHistoryList::", result.data)
    },

    // 保存浏览记录
    async saveBrowseHistory(ctx, params = {}) {
      const result = await request({
        url: "/sales/saveBrowseHistory",
        method: "post",
        data: { ...params }
      })
    },

    searchSaleList({ commit }, params = {}) {}
  }
}
