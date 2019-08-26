class MyDB {
  constructor() {}
  init() {
    wx.cloud.init({
      env: "wojushenzhen-cpm5n",
      traceUser: true
    })
    const db = wx.cloud.database({ env: "wojushenzhen-cpm5n" })
    return db
  }
}

export default MyDB
