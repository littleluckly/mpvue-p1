export default {
  name: "rentStore",
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
    }
  },
  actions: {
    fetchRecommendList({ commit }, params) {
      this.$db.collection("rent").get({
        success: function(res) {
          if (res && res.errMsg == "collection.get:ok") {
            commit("rentRecommendList", res.data)
          }
        }
      })
    },
    searchRentList({ commit }, params = {}) {
      this.$db
        .collection("rent")
        .where({
          address: {
            $regex: ".*" + "龙岗"
          }
        })
        .get({
          success: function(res) {
            // res.data 包含该记录的数据
            console.log("搜索", res)
            if (res && res.errMsg == "collection.get:ok") {
              commit("searchList", res.data)
            }
          }
        })
      //   this.$request({
      //     url: "/rent/searchRentList",
      //     method: "get",
      //     data: {
      //       ...params
      //     },
      //     success: function(res) {
      //       const { statusCode, data } = res
      //       if (statusCode === 200) {
      //         commit("searchList", data)
      //       } else {
      //         commit("searchList", [])
      //       }
      //       console.log("searchList::", res)
      //     }
      //   })
    }
  }
}
