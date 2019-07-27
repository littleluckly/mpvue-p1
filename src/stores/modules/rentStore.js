export default {
  name: 'rentStore',
  namespaced: true,
  state: {
    rentRecommendList: [],
    searchList: []
  },
  mutations: {
    rentRecommendList: (state, payload) => {
      state.rentRecommendList = payload
    },
    searchList: (state, payload) => {
      state.searchList = payload
    },
  },
  actions: {
    fetchRecommendList({
      commit
    }, params) {
      this.$request({
        url: '/rent/fetchRecommendList',
        method: 'get',
        success: function (res) {
          const {
            statusCode,
            data
          } = res
          if (statusCode === 200) {
            commit("rentRecommendList", data)
          } else {
            commit("rentRecommendList", [])
          }
          console.log('rentRecommendList::', res)
        }
      })
    },
    searchRentList({
      commit
    }, params = {}) {
      this.$request({
        url: '/rent/searchRentList',
        method: 'get',
        data: {
          ...params
        },
        success: function (res) {
          const {
            statusCode,
            data
          } = res
          if (statusCode === 200) {
            commit("searchList", data)
          } else {
            commit("searchList", [])
          }
          console.log('searchList::', res)
        }
      })
    }
  }
}
