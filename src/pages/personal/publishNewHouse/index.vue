<template>
  <div class="FormWrap">
    <!-- <button open-type="contact">客服</button> -->
    <form @submit="formSubmit" @reset="formReset">
      <view class="formItem section section_gap">
        <view class="section__title">发布类型：</view>
        <radio-group @change="handleChangeRadio" name="publishType">
          <label>
            <radio value="出租" />出租
          </label>
          <label>
            <radio value="出售" />出售
          </label>
        </radio-group>
      </view>
      <view class="formItem section section_gap" v-if="publishType=='出租'">
        <view class="section__title">出租方式：</view>
        <radio-group name="rentType">
          <label>
            <radio value="整租" />整租
          </label>
          <label>
            <radio value="合租" />合租
          </label>
        </radio-group>
      </view>
      <!-- <picker
                :value="formData.houseTypeIndex"
                :range="array"
                name="houseType"
                class="formItem section section_gap"
                @change="(e)=>handleSelect(e,'houseType')"
            >
                <view class="section__title">
                    <span class="requireIcon">*</span>发布类型：
                    <div v-if="validateErrData.houseType" class="errText">{{validateErrData.houseType.msg}}</div>
                </view>
                <view class="picker formVal">{{array[formData.houseTypeIndex]||'请选择要发布的类型'}}</view>
      </picker>-->
      <view class="formItem section section_gap">
        <view class="section__title">
          <span class="requireIcon">*</span>标题:
          <div v-if="validateErrData.title" class="errText">{{validateErrData.title.msg}}</div>
        </view>
        <input
          @input="(e)=>handleFormChange(e,'title')"
          v-model="formData.title"
          class="formVal"
          name="title"
          placeholder="请输入标题"
        />
      </view>
      <view class="formItem section section_gap">
        <view class="section__title">
          <span class="requireIcon">*</span>小区名称:
          <div v-if="validateErrData.house_name" class="errText">{{validateErrData.house_name.msg}}</div>
        </view>
        <input
          @input="(e)=>handleFormChange(e,'house_name')"
          v-model="formData.house_name"
          class="formVal"
          name="house_name"
          placeholder="请输入小区名称"
        />
      </view>

      <view class="formItem section section_gap">
        <view class="section__title">
          <span class="requireIcon">*</span>
          {{formData.houseTypeIndex==0?'租金(元/月)':'总价(万)'}}:
          <div v-if="validateErrData.price" class="errText">{{validateErrData.price.msg}}</div>
        </view>
        <input
          @input="(e)=>handleFormChange(e,'price')"
          v-model="formData.price"
          type="digit"
          class="formVal"
          name="price"
          :placeholder="formData.houseTypeIndex==0?'请输入租金':'请输入总价'"
        />
      </view>
      <view class="formItem section section_gap">
        <view class="section__title">
          <span class="requireIcon">*</span>
          面积:
          <div v-if="validateErrData.area" class="errText">{{validateErrData.area.msg}}</div>
        </view>
        <input
          @input="(e)=>handleFormChange(e,'area')"
          v-model="formData.area"
          type="digit"
          class="formVal"
          name="area"
          placeholder="请输入面积"
        />
      </view>

      <view class="formItem section section_gap">
        <view class="section__title">
          <span class="requireIcon">*</span>地图位置:
          <div v-if="validateErrData.geo" class="errText">{{validateErrData.geo.msg}}</div>
        </view>
        <input
          @click="handleSelectMapLoca"
          v-model="formData.geo"
          readonly
          disabled
          class="formVal"
          name="geo"
          placeholder="请选择地图位置"
        />
      </view>
      <!-- <picker
                v-if="formData.houseTypeIndex!==1"
                :value="formData.rentTypeIndex"
                :range="rentTypeOptions"
                name="rentType"
                class="formItem section section_gap"
                @change="(e)=>handleSelect(e,'rentType')"
            >
                <view class="section__title">
                    <span class="requireIcon">*</span>出租方式：
                    <div v-if="validateErrData.rentType" class="errText">{{validateErrData.rentType.msg}}</div>
                </view>
                <view class="picker formVal">{{rentTypeOptions[formData.rentTypeIndex]||'请选择要出租方式'}}</view>
      </picker>-->
      <view class="formItem section section_gap">
        <view class="section__title" style="margin-button:15px;">
          <span class="requireIcon">*</span>详细地址:
          <div v-if="validateErrData.address" class="errText">{{validateErrData.address.msg}}</div>
        </view>
        <textarea
          @input="(e)=>handleFormChange(e,'address')"
          v-model="formData.address"
          class="formVal"
          name="address"
          auto-height
          placeholder="请输入房源地址"
        />
      </view>
      <view class="formItem section section_gap">
        <view class="section__title">
          <span class="requireIcon">*</span>户型:
          <div v-if="validateErrData.layout" class="errText">{{validateErrData.layout.msg}}</div>
        </view>
        <input
          @input="(e)=>handleFormChange(e,'layout')"
          class="formVal"
          name="layout"
          placeholder="请输入房源的户型"
        />
      </view>
      <!-- <view class="section section_gap">
                <view class="section__title">radio</view>
                <radio-group name="radio-group">
                    <label>
                        <radio value="radio1" />radio1
                    </label>
                    <label>
                        <radio value="radio2" />radio2
                    </label>
                </radio-group>
            </view>
            <view class="section section_gap">
                <view class="section__title">checkbox</view>
                <checkbox-group name="checkbox">
                    <label>
                        <checkbox value="checkbox1" />checkbox1
                    </label>
                    <label>
                        <checkbox value="checkbox2" />checkbox2
                    </label>
                </checkbox-group>
      </view>-->
      <view class="btn-area">
        <button form-type="submit" type="primary" style="margin-bottom:15px;">发布</button>
        <!-- <button form-type="reset" type="warn">重置</button> -->
      </view>
    </form>
  </div>
</template>
<script>
import WxValidate from "@/utils/validate";
export default {
  data() {
    return {
      array: ["出租", "出售"],
      houseTypeIndex: null,
      region: "",
      regionList: [
        "罗湖区",
        "福田区",
        "南山区",
        "宝安区",
        "龙岗区",
        "龙华区",
        "盐田区",
        "坪山区"
      ],
      regionIndex: null,
      rentTypeOptions: ["整租", "合租"],
      formData: {
        house_name: "",
        houseTypeIndex: null,
        regionIndex: null,
        price: null,
        area: null,
        rentTypeIndex: 0,
        title: null,
        address: ""
      },
      validateErrData: {},
      publishType: "",
      longitude: 0,
      latitude: 0
    };
  },
  onShow(options) {},
  onLoad(options) {
    this.initValidate();
    console.log(options);
    const { longitude = 0, latitude = 0, address = "" } = options;
    this.longitude = longitude;
    this.latitude = latitude;
    let regionIndex = 0;
    this.regionList.forEach((item, idx) => {
      if (address.includes(item.slice(0, -1))) {
        regionIndex = idx;
      }
    });
    this.region = this.regionList[regionIndex];
    this.formData = {
      ...this.formData,
      geo: longitude != 0 ? `纬度：${latitude}, 经度：${longitude}` : "",
      address
    };
  },
  methods: {
    formSubmit: function(e) {
      const params = e.mp.detail.value;
      console.log("form发生了submit事件，携带数据为：", params);
      this.validateErrData = {};
      if (!this.WxValidate.checkForm(params)) {
        //表单元素验证不通过，此处给出相应提示
        console.log("this.WxValidate.errorList", this.WxValidate.errorList);
        let error = this.WxValidate.errorList[0];
        const errorList = this.WxValidate.errorList;
        console.log("error", error);
        if (errorList) {
          errorList.forEach(item => {
            this.validateErrData[item.param] = { ...item };
          });
          console.log(this.validateErrData, "this.validateErrData");
        }
      } else {
        // 校验成功，清除错误消息
        this.validateErrData = {};
      }
    },
    handleFormChange(e, name) {
      // console.log(e.mp.detail.value, name);
      // this.validateErrData[name] = null;
      // console.log(this.validateErrData);
      // this.validateErrData = {};
      // name !== '' && delete this.validateErrData[name];
      // console.log('this.validateErrData', this.validateErrData);
    },
    getAddress() {
      const { regionIndex, address } = this.formData;
      if (regionIndex != null && regionIndex != undefined) {
        return `${this.regionList[regionIndex]}${address}`;
      } else {
        return address;
      }
      //   return;
    },
    handleSelectMapLoca() {
      const that = this;
      // 调用接口
      wx.getSetting({
        success: function(res) {
          console.log("授权信息", res);
          if (!res.authSetting["scope.userLocation"]) {
            wx.showModal({
              title: "是否授权当前位置",
              content:
                "需要获取您的地理位置，请确认授权，否则无法获取您所需数据",
              success: function(res) {
                if (res.cancel) {
                  wx.showToast({
                    title: "授权失败",
                    icon: "cancel",
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
                        that.moveToLocation();
                      } else {
                        wx.showToast({
                          title: "授权失败",
                          icon: "cancel",
                          duration: 1000
                        });
                      }
                    }
                  });
                }
              }
            });
          } else {
            that.moveToLocation();
          }
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
    },
    formReset: function() {
      // this.formData = {};
      for (let key in Object.keys(this.formData)) {
        this.formData[key] = null;
      }
      this.validateErrData = {};
      console.log("form发生了reset事件");
    },
    handleSelectHouseType(e) {
      this.formData.houseTypeIndex = Number(e.mp.detail.value);
      this.validateErrData["houseType"] = null;
    },
    handleSelectRegion(e) {
      this.formData.regionIndex = Number(e.mp.detail.value);
    },
    handleSelectRentType(e) {},
    handleSelect(e, type) {
      this.formData[type + "Index"] = Number(e.mp.detail.value);
      this.validateErrData[type] = null;
    },
    rentTypeOptions(e) {},
    initValidate() {
      let rules = {
        // houseType: {
        //     required: true
        // },
        house_name: {
          required: true,
          maxlength: 10
        },
        title: {
          required: true
        },
        price: {
          required: true
        },
        area: {
          required: true
        },
        geo: {
          required: true
        },
        address: {
          required: true
        },
        layout: {
          required: true
        }
      };

      let message = {
        houseType: {
          required: "请选择房源类型"
        },
        house_name: {
          required: "请输入小区名称",
          maxlength: "名称不能超过10个字"
        },
        title: {
          required: "请输入标题"
        },
        price: {
          required: "请输入价格"
        },
        area: {
          required: "请输入面积"
        },

        geo: {
          required: "请选择地图位置"
        },
        address: {
          required: "请输入详细地址"
        },
        layout: {
          required: "请输入户型"
        }
      };
      //实例化当前的验证规则和提示消息
      this.WxValidate = new WxValidate(rules, message);
    },
    handleChangeRadio(e) {
      const value = e.mp.detail.value;
      console.log(value);
      this.formData.publishType = value;
      this.publishType = value;
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../style/common.less";
.FormWrap {
  padding: 10px;
  input {
    font-size: 16px;
  }
  .formItem {
    margin-bottom: 15px;
    .section__title {
      position: relative;
      color: @grayText;
      .requireIcon {
        color: red;
      }
      .errText {
        position: absolute;
        right: 10px;
        top: 0;
        color: red;
        font-size: 12px;
      }
    }
    .formVal {
      color: @black;
      padding: 3px 0;
      width: 100%;
      border-bottom: 1px solid @graylightBg;
    }
  }
}
</style>

