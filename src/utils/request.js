export default function request(config) {
  //   const baseUrl =
  // process.env.NODE_ENV == "development"
  //   ? "https://luck.frpgz1.idcfengye.com"
  //   : "https://luck.frpgz1.idcfengye.com"
  //   const baseUrl = "https://mp.dongguanshuifenzi.com"
  const baseUrl = "https://luck.frpgz1.idcfengye.com"
  //   wx.request({
  //     ...config,
  //     url: baseUrl + config.url
  //   })
  // 定义方法返回Promise参数,obj 为wx.request 方法中所需参数
  return new Promise(function(resolve, reject) {
    wx.request({
      ...config,
      url: baseUrl + config.url,
      success: function(data) {
        // 回调成功执行resolve
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
