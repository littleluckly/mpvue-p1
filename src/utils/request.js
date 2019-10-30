export default function request(config) {
  const isDev = process.env.NODE_ENV == "development"
  //   const baseUrl = isDev
  //     ? "https://message.dongguanshuifenzi.com"
  //     : "https://mp.dongguanshuifenzi.com"
  const baseUrl = "https://192.168.0.101:9527"
  //   const baseUrl = "https://message.dongguanshuifenzi.com"
  //   const baseUrl = "https://mp.dongguanshuifenzi.com"
  // 定义方法返回Promise参数,obj 为wx.request 方法中所需参数
  return new Promise(function(resolve, reject) {
    const { show, mask } = config.loading || {}
    show &&
      wx.showLoading({
        title: "加载中...",
        mask
      })
    wx.request({
      ...config,
      url: baseUrl + config.url,
      success: function(data) {
        // 回调成功执行resolve
        wx.hideLoading()
        resolve(data)
      },
      fail: function(data) {
        // 回调失败时
        wx.hideLoading()
        if (typeof reject == "function") {
          reject(data)
        } else {
          console.log(data)
        }
      }
    })
  })
}
