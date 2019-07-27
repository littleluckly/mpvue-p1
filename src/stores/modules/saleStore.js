 export default {
   name: 'saleStore',
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
     fetchSaleList({
       commit
     }, params = {}) {
       wx.request({
         url: 'https://localhost:9527/sales/fetchList',
         method: 'get',
         success: function (res) {
           const {
             statusCode,
             data
           } = res
           if (statusCode === 200) {
             commit("saleList", data)
           } else {
             commit("saleList", [])
           }
           console.log('saleList::', res)
         }
       })
     }
   }
 }
