import request from "@/utils/request"
// const CosAuth = require("../../utils/cos-auth")
import CosAuth from "../../utils/cos-auth"
// var COS = require("../../../node_modules/cos-wx-sdk-v5")
// import COS from "cos-wx-sdk-v5"
var COS = require("cos-wx-sdk-v5")
// 对更多字符编码的 url encode 格式
const camSafeUrlEncode = function(str) {
  return encodeURIComponent(str)
    .replace(/!/g, "%21")
    .replace(/'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/\*/g, "%2A")
}
export default {
  name: "personalStore",
  namespaced: true,
  state: {
    historyList: [],
    summaryInfo: {},
    tags: [],
    uploadImgProgress: {},
    uploadVideoProgress: 0,
    uploadedFiles: [],
    uploadedVideos: []
  },
  mutations: {
    historyList(state, payload) {
      state.historyList = payload
    },
    summaryInfo(state, payload) {
      state.summaryInfo = payload
    },
    uploadImgProgress(state, payload) {
      state.uploadImgProgress = {
        ...state.uploadImgProgress,
        ...payload
      }
    },
    uploadVideoProgress(state, payload = 0) {
      state.uploadVideoProgress = {
        ...state.uploadVideoProgress,
        ...payload
      }
    },
    tags(state, payload) {
      state.tags = payload
    },
    uploadedFiles(state, payload) {
      state.uploadedFiles = [...state.uploadedFiles, payload]
    },
    uploadedVideos(state, payload) {
      state.uploadedVideos = [...state.uploadedVideos, payload]
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
    getAuthorization(ctx, allowPrefix = "*") {
      return new Promise(async (resolve, reject) => {
        const result = await request({
          url: "/upload/getCredential",
          method: "post",
          data: { allowPrefix }
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
    uploadImg({ commit, dispatch }, { files = [] }) {
      return new Promise((resolve, reject) => {
        // 初始化实例
        const Bucket = "shuifenzi-1259799060"
        const Region = "ap-chengdu"
        const allowPrefix = "wojushenzhen/images/*"
        const cos = new COS({
          getAuthorization: async function(options, callback) {
            // 异步获取签名
            const result = await request({
              url: "/upload/getCredential",
              method: "post",
              data: { allowPrefix }
            })
            var data = result.data
            callback({
              TmpSecretId: data.credentials && data.credentials.tmpSecretId,
              TmpSecretKey: data.credentials && data.credentials.tmpSecretKey,
              XCosSecurityToken:
                data.credentials && data.credentials.sessionToken,
              ExpiredTime: data.expiredTime
            })
          }
        })
        files.forEach(file => {
          const Key =
            allowPrefix.slice(0, -1) +
            file.path.substr(file.path.lastIndexOf("/") + 1) // 这里指定上传的文件名
          cos.postObject(
            {
              Bucket: Bucket,
              Region: Region,
              Key: Key,
              FilePath: file.path,
              onProgress: function(info) {
                console.log("上传", JSON.stringify(info))
                commit("uploadImgProgress", {
                  [file.path]: Math.floor(info.percent * 100)
                })
              }
            },
            function(err, data) {
              if (!err) {
                resolve(data)
              } else {
                wx.showToast({
                  title: "上传失败",
                  duration: 1600,
                  image: "../../../static/images/error.png"
                })
              }
              console.log(err || data)
            }
          )
        })
      })
    },
    deleteRemoteImg(
      {
        commit,
        state: { uploadedFiles }
      },
      src
    ) {
      return new Promise((resolve, reject) => {
        // 初始化实例
        const Bucket = "shuifenzi-1259799060"
        const Region = "ap-chengdu"
        const Key = `wojushenzhen/images/${src.substr(
          src.lastIndexOf("/") + 1
        )}`
        const cos = new COS({
          getAuthorization: async function(options, callback) {
            // 异步获取签名
            const result = await request({
              url: "/upload/getCredential",
              method: "post",
              data: { allowPrefix: Key }
            })
            var data = result.data
            callback({
              TmpSecretId: data.credentials && data.credentials.tmpSecretId,
              TmpSecretKey: data.credentials && data.credentials.tmpSecretKey,
              XCosSecurityToken:
                data.credentials && data.credentials.sessionToken,
              ExpiredTime: data.expiredTime
            })
          }
        })
        cos.deleteObject(
          {
            Bucket,
            Region,
            Key: Key
          },
          function(err, data) {
            if (!err) {
              commit(
                "uploadedFiles",
                uploadedFiles.filter(item => item !== src)
              )
            } else {
              wx.showToast({
                title: "删除失败",
                duration: 1600,
                image: "../../../static/images/error.png"
              })
            }
          }
        )
      })
    },
    async uploadVideo({ commit, dispatch }, { filePath }) {
      return new Promise((resolve, reject) => {
        // 初始化实例
        const Bucket = "shuifenzi-1259799060"
        const Region = "ap-chengdu"
        const allowPrefix = "wojushenzhen/video/*"
        const cos = new COS({
          getAuthorization: async function(options, callback) {
            // 异步获取签名
            const result = await request({
              url: "/upload/getCredential",
              method: "post",
              data: { allowPrefix }
            })
            var data = result.data
            callback({
              TmpSecretId: data.credentials && data.credentials.tmpSecretId,
              TmpSecretKey: data.credentials && data.credentials.tmpSecretKey,
              XCosSecurityToken:
                data.credentials && data.credentials.sessionToken,
              ExpiredTime: data.expiredTime
            })
          }
        })
        const Key =
          allowPrefix.slice(0, -1) +
          filePath.substr(filePath.lastIndexOf("/") + 1) // 这里指定上传的文件名
        cos.postObject(
          {
            Bucket: Bucket,
            Region: Region,
            Key: Key,
            FilePath: filePath,
            onProgress: function(info) {
              console.log("上传", JSON.stringify(info))
              commit("uploadVideoProgress", {
                [filePath]: Math.floor(info.percent * 100)
              })
            }
          },
          function(err, data) {
            if (!err) {
              console.log("data")
              commit("uploadedVideos", "https://" + data.Location)
              resolve(data)
            } else {
              wx.showToast({
                title: "上传失败",
                duration: 1600,
                image: "../../../static/images/error.png"
              })
            }
            console.log(err || data)
          }
        )
      })
    },
    deleteRemoteVideo(
      {
        commit,
        state: { uploadedVideos }
      },
      src
    ) {
      return new Promise((resolve, reject) => {
        // 初始化实例
        const Bucket = "shuifenzi-1259799060"
        const Region = "ap-chengdu"
        const Key = `wojushenzhen/video/${src.substr(src.lastIndexOf("/") + 1)}`
        const cos = new COS({
          getAuthorization: async function(options, callback) {
            // 异步获取签名
            const result = await request({
              url: "/upload/getCredential",
              method: "post",
              data: { allowPrefix: Key }
            })
            var data = result.data
            callback({
              TmpSecretId: data.credentials && data.credentials.tmpSecretId,
              TmpSecretKey: data.credentials && data.credentials.tmpSecretKey,
              XCosSecurityToken:
                data.credentials && data.credentials.sessionToken,
              ExpiredTime: data.expiredTime
            })
          }
        })
        cos.deleteObject(
          {
            Bucket,
            Region,
            Key: Key
          },
          function(err, data) {
            if (!err) {
              commit(
                "uploadedVideos",
                uploadedVideos.filter(item => item !== src)
              )
            } else {
              wx.showToast({
                title: "删除失败",
                duration: 1600,
                image: "../../../static/images/error.png"
              })
            }
          }
        )
      })
    }
  }
}
