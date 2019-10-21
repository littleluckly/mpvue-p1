import request from "@/utils/request"
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
    houseTypeList: [],
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
      state.uploadImgProgress = payload
    },
    uploadVideoProgress(state, payload = 0) {
      state.uploadVideoProgress = payload
    },
    tags(state, payload) {
      state.tags = payload
    },
    houseTypeList(state, payload) {
      state.houseTypeList = payload
    },
    uploadedFiles(state, payload) {
      state.uploadedFiles = payload
    },
    uploadedVideos(state, payload) {
      state.uploadedVideos = payload
    }
  },
  actions: {
    resetFiles({ commit }) {
      commit("uploadedVideos", [])
      commit("uploadedFiles", [])
      commit("uploadVideoProgress", {})
      commit("uploadImgProgress", {})
    },
    //   浏览记录
    async fetchBrowseHistoryList({ commit }, params = {}) {
      const result = await request({
        url: "/personal/historyList",
        method: "get",
        data: { ...params }
      })
      const { statusCode, data } = result
      if (statusCode === 200) {
        commit("historyList", data.filter(item => item.id))
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
    async fetchDict({ commit }, { dict }) {
      const result = await request({
        url: "/dict",
        method: "get",
        data: { dict }
      })
      const { statusCode, data } = result
      if (statusCode === 200) {
        const dictMap = new Map([
          ["tags", "tags"],
          ["house_type", "houseTypeList"]
        ])
        commit(dictMap.get(dict), data)
      } else {
        commit(dict, [])
      }
    },

    // 获取上传临时密钥
    getAuthorization(ctx, allowPrefix = "*") {
      return new COS({
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
    },

    // 上传图片
    uploadImg(
      {
        commit,
        dispatch,
        state: { uploadedFiles = [], uploadImgProgress = {} }
      },
      { files = [] }
    ) {
      return new Promise(async (resolve, reject) => {
        // 初始化实例
        const Bucket = "shuifenzi-1259799060"
        const Region = "ap-chengdu"
        const allowPrefix = "wojushenzhen/images/*"
        const cos = await dispatch("getAuthorization", allowPrefix)
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
                commit("uploadImgProgress", {
                  ...uploadImgProgress,
                  [file.path]: Math.floor(info.percent * 100)
                })
              }
            },
            function(err, data) {
              if (!err) {
                commit("uploadedFiles", [
                  ...uploadedFiles,
                  "https://" + data.Location
                ])
                resolve(data)
              } else {
                wx.showToast({
                  title: "上传失败",
                  duration: 1600,
                  image: "../../../static/images/error.png"
                })
              }
            }
          )
        })
      })
    },

    // 上传视频
    uploadVideo(
      {
        commit,
        dispatch,
        state: { uploadedVideos = [], uploadVideoProgress = {} }
      },
      { filePath }
    ) {
      return new Promise(async (resolve, reject) => {
        // 初始化实例
        const Bucket = "shuifenzi-1259799060"
        const Region = "ap-chengdu"
        const allowPrefix = "wojushenzhen/video/*"
        const cos = await dispatch("getAuthorization", allowPrefix)
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
              commit("uploadVideoProgress", {
                ...uploadVideoProgress,
                [filePath]: Math.floor(info.percent * 100)
              })
            }
          },
          function(err, data) {
            if (!err) {
              commit("uploadedVideos", [
                ...uploadedVideos,
                "https://" + data.Location
              ])
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

    // 删除图片/视频
    deleteRemoteFile(
      {
        commit,
        dispatch,
        state: { uploadedVideos, uploadedFiles }
      },
      { src, type }
    ) {
      return new Promise(async (resolve, reject) => {
        // 初始化实例
        const Bucket = "shuifenzi-1259799060"
        const Region = "ap-chengdu"
        const Key = `wojushenzhen/${type}/${src.substr(
          src.lastIndexOf("/") + 1
        )}`
        const cos = await dispatch("getAuthorization", Key)
        cos.deleteObject(
          {
            Bucket,
            Region,
            Key: Key
          },
          function(err, data) {
            if (!err) {
              if (type === "images") {
                commit(
                  "uploadedFiles",
                  uploadedFiles.filter(item => item !== src)
                )
              } else {
                commit(
                  "uploadedVideos",
                  uploadedVideos.filter(item => item !== src)
                )
              }
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

    // 发布新房源
    publishNewHouse(
      {
        state: { uploadedFiles, uploadedVideos }
      },
      formData
    ) {
      return new Promise(async (resolve, reject) => {
        const result = await request({
          url: "/sales/publish",
          method: "post",
          data: {
            ...formData,
            uploadedFiles,
            uploadedVideos
          }
        })
        resolve(result.data)
      })
    }
  }
}
