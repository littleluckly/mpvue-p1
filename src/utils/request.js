 export default function request(config) {
   const baseUrl = process.env.NODE_ENV == 'development' ? 'https://localhost:9527' : ''
   wx.request({
     ...config,
     url: baseUrl + config.url
   })
 }
