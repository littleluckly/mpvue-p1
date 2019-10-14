import request from "@/utils/request"
// const CosAuth = require("../../utils/cos-auth")
import CosAuth from "../../utils/cos-auth"
export default {
  name: "personalStore",
  namespaced: true,
  state: {
    historyList: [],
    summaryInfo: {},
    tags: []
  },
  mutations: {
    historyList(state, payload) {
      state.historyList = payload
    },
    summaryInfo(state, payload) {
      state.summaryInfo = payload
    },
    tags(state, payload) {
      state.tags = payload
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
    },

    //   统计信息：收藏总数、历史记录总数
    async fetchTags({ commit }, params = {}) {
      const result = await request({
        url: "/personal/tags",
        method: "get"
      })
      const { statusCode, data } = result
      if (statusCode === 200) {
        commit("tags", data)
      } else {
        commit("tags", [])
      }
    },

    // 获取上传临时密钥
    getAuthorization() {
      return new Promise(async (resolve, reject) => {
        const result = await request({
          url: "/upload/getCredential",
          method: "post"
        })
        const credentials = result.data.credentials
        if (credentials) {
          resolve(result.data)
        } else {
          wx.showModal({
            title: "临时密钥获取失败",
            content: JSON.stringify(result),
            showCancel: false
          })
          resolve({})
        }
      })
    },
    // 上传文件
    async uploadFile({ commit, dispatch }, { filePath = "" }) {
      const data = await dispatch("getAuthorization")
      console.log("data", data)
      const { credentials } = data
      const AuthData = {
        XCosSecurityToken: credentials.sessionToken,
        Authorization: CosAuth({
          SecretId: credentials.tmpSecretId,
          SecretKey: credentials.tmpSecretKey,
          Method: "POST",
          Pathname: "/"
        })
      }
      console.log("签名AuthData", AuthData)
      const Key = filePath.substr(filePath.lastIndexOf("/") + 1) // 这里指定上传的文件名
      console.log("wx.uploadFile", wx.uploadFile)

      const Bucket = "shuifenzi-1259799060"
      const Region = "ap-chengdu"
      // 文件上传地址
      const prefix = "https://" + Bucket + ".cos." + Region + ".myqcloud.com/"
      const requestTask = wx.uploadFile({
        url: prefix,
        name: "file",
        filePath: filePath,
        formData: {
          key: Key,
          success_action_status: 200,
          Signature: AuthData.Authorization,
          "x-cos-security-token": AuthData.XCosSecurityToken,
          "Content-Type": ""
        },
        success: function(res) {
          const url = prefix + camSafeUrlEncode(Key).replace(/%2F/g, "/")
          if (res.statusCode === 200) {
            wx.showModal({ title: "上传成功", content: url, showCancel: false })
          } else {
            wx.showModal({
              title: "上传失败",
              content: JSON.stringify(res),
              showCancel: false
            })
          }
          console.log(res.statusCode)
          console.log(url)
        },
        fail: function(res) {
          console.log("errrrr", res)
          wx.showModal({
            title: "上传失败",
            content: JSON.stringify(res),
            showCancel: false
          })
        }
      })
    }
  }
}
