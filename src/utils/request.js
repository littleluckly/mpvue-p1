export default function request(config) {
  const baseUrl =
    process.env.NODE_ENV == "development"
      ? "https://luck.frpgz1.idcfengye.com"
      : "https://luck.frpgz1.idcfengye.com"
  wx.request({
    ...config,
    url: baseUrl + config.url
  })
}
