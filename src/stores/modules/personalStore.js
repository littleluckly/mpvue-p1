import request from "@/utils/request"
export default {
  name: "personalStore",
  namespaced: true,
  state: {
    historyList: [],
    summaryInfo: {}
  },
  mutations: {
    historyList(state, payload) {
      state.historyList = payload
    },
    summaryInfo(state, payload) {
      state.summaryInfo = payload
    }
  },
  actions: {
    //   浏览记录
    async fetchBrowseHistoryList({ commit }, params = {}) {
      const result = await request({
        url: "/personal/historyList",
        method: "get",
        data: { ...params }
      })
      const { statusCode, data } = result
      if (statusCode === 200) {
        commit("historyList", data)
      } else {
        commit("historyList", [])
      }
    },

    //   统计信息：收藏总数、历史记录总数
    async fetchSummaryInfo({ commit }, params = {}) {
      const result = await request({
        url: "/personal/summaryInfo",
        method: "get",
        data: { ...params }
      })
      const { statusCode, data } = result
      if (statusCode === 200) {
        commit("summaryInfo", data)
      } else {
        commit("summaryInfo", {})
      }
    }
  }
}
