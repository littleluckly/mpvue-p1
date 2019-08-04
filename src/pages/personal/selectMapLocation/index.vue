<template>
  <div class="mapWrap">
    <!-- <div class="searchWrap">
      <input v-model="address" type="text" confirm-type="search" placeholder="请输入地点" />
    </div>
    <map
      id="myMap"
      style="width: 100%; height: 100vh;"
      :latitude="latitude"
      :longitude="longitude"
      :markers="markers"
      show-location
    ></map>-->
  </div>
</template>
<script>
// var QQMapWX = require("@/utils/qqmap-wx-jssdk.min.js");
import QQMapWX from "@/utils/qqmap-wx-jssdk.min.js";
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: "IHIBZ-EPZRS-A7VOO-6OXF6-BEVN7-7EFMU" // 必填
});
export default {
  data() {
    return {
      mapCtx: null,
      address: "",
      latitude: 23.099994,
      longitude: 113.32452
      //   markers: [
      //     {
      //       id: 1,
      //       latitude: 22.71991,
      //       longitude: 114.24779
      //     }
      //   ]
    };
  },
  onLoad(options) {
    console.log("options", options);
    this.address = options.address;
  },
  onShow() {
    const that = this;
    // 调用接口
    wx.getSetting({
      success: function(res) {
        console.log("授权信息", res);
        if (!res.authSetting["scope.userLocation"]) {
          wx.showModal({
            title: "是否授权当前位置",
            content: "需要获取您的地理位置，请确认授权，否则无法获取您所需数据",
            success: function(res) {
              if (res.cancel) {
                wx.showToast({
                  title: "授权失败",
                  icon: "fail",
                  duration: 1000
                });
              } else if (res.confirm) {
                wx.openSetting({
                  success: function(dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: "授权成功",
                        icon: "success",
                        duration: 1000
                      });
                      //再次授权，调用getLocationt的API
                      //   getLocation(that);
                      that.getLocation();
                      that.fetchSuggestLoca();
                      that.moveToLocation();
                    } else {
                      wx.showToast({
                        title: "授权失败",
                        icon: "fail",
                        duration: 1000
                      });
                    }
                  }
                });
              }
            }
          });
        } else {
          that.getLocation();
          that.fetchSuggestLoca();
          that.moveToLocation();
        }
      }
    });
  },
  computed: {
    markers() {
      return [
        {
          id: 1,
          latitude: this.latitude,
          longitude: this.longitude
        }
      ];
    }
  },
  methods: {
    fetchSuggestLoca() {
      this.address &&
        qqmapsdk.search({
          keyword: this.address,
          success: function(res) {
            console.log(res);
          },
          fail: function(res) {
            console.log(res);
          },
          complete: function(res) {
            console.log(res);
          }
        });
    },
    getLocation() {
      var that = this;
      wx.showLoading({
        title: "定位中",
        mask: true
      });

      wx.getLocation({
        type: "wgs84",
        //定位成功，更新定位结果
        success: function(res) {
          const { latitude, longitude, speed, accuracy } = res;
          that.longitude = longitude;
          that.latitude = latitude;
          //经纬度转化为地址
          that.getLocal(latitude, longitude);
          //   that.speed = speed;
          //   that.accuracy = accuracy;
          console.log("res999999", res);
        },
        //定位失败回调
        fail: function() {
          wx.showToast({
            title: "定位失败",
            icon: "none"
          });
        },

        complete: function() {
          //隐藏定位中信息进度
          wx.hideLoading();
        }
      });
    },
    getLocal: function(latitude, longitude) {
      let vm = this;
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: latitude,
          longitude: longitude
        },
        success: function(res) {
          let province = res.result.ad_info.province;
          let city = res.result.ad_info.city;
          let district = res.result.ad_info.district;
          //   this.district = district;
          console.log("district", district);
          // vm.setData({
          //     province: province, //省
          //     city: city, //市
          //     district: district //区
          // });
        },
        fail: function(res) {
          console.log(res);
        },
        complete: function(res) {
          // console.log(res);
        }
      });
    },
    //移动选点
    moveToLocation: function() {
      var that = this;
      wx.chooseLocation({
        success: function(res) {
          console.log("移动选点", res);
          const { address, latitude, longitude } = res;
          wx.navigateTo({
            url: `../publishNewHouse/main?address=${address}&latitude=${latitude}&longitude=${longitude}`
          });
        },
        fail: function(err) {
          console.log(err);
        }
      });
    }
  },
  mounted() {
    // this.mapCtx = wx.createMapContext("myMap");
  }
};
</script>
<style lang="less" scoped>
.mapWrap {
  position: relative;
  .searchWrap {
    input {
      margin: 0 20px;
      padding: 5px 10px;
      border: 1px solid #d8d8d8;
      border-radius: 20px;
    }
  }
}
</style>


