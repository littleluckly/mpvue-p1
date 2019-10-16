export default function request(config) {
  const isDev = process.env.NODE_ENV == "development"
  //   const baseUrl = isDev
  //     ? "https://luck.frpgz1.idcfengye.com"
  //     : "https://mp.dongguanshuifenzi.com"
  const baseUrl = "https://mp.dongguanshuifenzi.com"
  // 定义方法返回Promise参数,obj 为wx.request 方法中所需参数
  return new Promise(function(resolve, reject) {
    config.showLoading &&
      wx.showLoading({
        title: "加载中...",
        mask: true
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
        if (typeof reject == "function") {
          reject(data)
        } else {
          console.log(data)
        }
      }
    })
  })
}
