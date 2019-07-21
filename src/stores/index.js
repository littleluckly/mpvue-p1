import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)
export default new Vuex.Store({
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
            const db = wx.cloud.database({ env: "wojushenzhen-cpm5n" })
            db.collection("rent").get({
                success: function (res) {
                    commit("homepageList", res.data)
                }
            })
        },
        toggleDrawerVisible({ commit }, flag) {
            commit('drawerVisible', flag)
        },
    }
})
