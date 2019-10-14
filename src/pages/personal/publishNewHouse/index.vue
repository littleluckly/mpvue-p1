<template>
    <div class="publishNewHouseWrap">
        <form @submit="formSubmit" @reset="formReset">
            <div class="infoType">
                <div class="divider"></div>
                <div class="infoTitle">基本信息</div>
                <div class="divider"></div>
            </div>
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
                    <span class="requireIcon">*</span>
                    总价(万):
                    <div v-if="validateErrData.price" class="errText">{{validateErrData.price.msg}}</div>
                </view>
                <input
                    @input="(e)=>handleFormChange(e,'price')"
                    v-model="formData.price"
                    type="digit"
                    class="formVal"
                    name="price"
                    placeholder="请输入总价"
                />
            </view>
            <view class="formItem section section_gap">
                <view class="section__title">
                    <span class="requireIcon">*</span>
                    面积(
                    <span class="square"></span>):
                    <div v-if="validateErrData.area" class="errText">{{validateErrData.area.msg}}</div>
                </view>
                <input
                    @input="handleFormChange"
                    v-model="formData.area"
                    type="digit"
                    class="formVal"
                    name="area"
                    placeholder="请输入面积"
                />
            </view>
            <view class="formItem section section_gap">
                <view class="section__title">
                    <span class="requireIcon">*</span>
                    房源类型:
                    <div v-if="validateErrData.type" class="errText">{{validateErrData.type.msg}}</div>
                </view>
                <picker
                    range-key="label"
                    @change="handleSelectType"
                    :value="formData.type"
                    :range="typeList"
                >
                    <view class="picker">当前选择：{{currType}}</view>
                </picker>
            </view>
            <view class="formItem section section_gap">
                <view class="section__title">
                    <span class="requireIcon">*</span>户型:
                    <div
                        v-if="validateErrData.layout"
                        class="errText"
                    >{{validateErrData.layout.msg}}</div>
                </view>
                <!-- @input="(e)=>handleFormChange(e,'layout')" -->
                <input
                    v-model="formData.layout"
                    class="formVal"
                    name="layout"
                    placeholder="请输入房源的户型"
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
            <view class="formItem section section_gap">
                <view class="section__title" style="margin-button:15px;">
                    <span class="requireIcon">*</span>详细地址:
                    <div
                        v-if="validateErrData.address"
                        class="errText"
                    >{{validateErrData.address.msg}}</div>
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

            <div class="infoType">
                <div class="divider"></div>
                <div class="infoTitle">详细信息</div>
                <div class="divider"></div>
            </div>
            <view class="formItem section section_gap">
                <view class="section__title">
                    <span class="requireIcon">*</span>小区名称:
                    <div
                        v-if="validateErrData.house_name"
                        class="errText"
                    >{{validateErrData.house_name.msg}}</div>
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
                    楼层:
                    <div v-if="validateErrData.floor" class="errText">{{validateErrData.floor.msg}}</div>
                </view>
                <input
                    @input="(e)=>handleFormChange(e,'floor')"
                    v-model="formData.floor"
                    class="formVal"
                    name="floor"
                    placeholder="请输入房源所属楼层和总楼层"
                />
            </view>
            <view class="formItem section section_gap">
                <view class="section__title">产权期限:</view>
                <input
                    v-model="formData.copyrightYear"
                    class="formVal"
                    name="copyrightYear"
                    placeholder="请输入房源的产权期限"
                />
            </view>
            <view class="formItem section section_gap">
                <view class="section__title">朝向:</view>
                <input
                    v-model="formData.orientation"
                    class="formVal"
                    name="orientation"
                    placeholder="请输入房源的朝向"
                />
            </view>
            <view class="formItem section section_gap">
                <view class="section__title">
                    房源特点:
                    <div
                        v-if="validateErrData.feature"
                        class="errText"
                    >{{validateErrData.feature.msg}}</div>
                </view>
                <checkbox-group name="electro">
                    <label class="electroCheckbox" v-for="item in tags" :key="item.value">
                        <checkbox :value="item.value" />
                        {{item.label}}
                    </label>
                </checkbox-group>
            </view>
            <view class="btn-area">
                <button form-type="submit" type="primary" style="margin-bottom:15px;">发布</button>
                <!-- <button form-type="reset" type="warn">重置</button> -->
            </view>
            <div class="infoType">
                <div class="divider"></div>
                <div class="infoTitle">视频/图片</div>
                <div class="divider"></div>
            </div>
            <view class="formItem section section_gap">
                <view class="section__title">图片:</view>
                <button type="primary" style="margin-bottom:15px;" @click="handleUploadFile">选择图片/视频</button>
            </view>
        </form>
    </div>
</template>
<script>
import WxValidate from "@/utils/validate"
import { mapState, mapActions } from "vuex"
export default {
    data() {
        return {
            typeList: [
                { label: "村委房", value: 1 },
                { label: "集资房", value: 2 },
                { label: "军产房", value: 3 }
            ],
            currType: "",
            array: ["出租", "出售"],
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
            formData: {
                copyrightYear: "70年",
                house_name: "",
                price: null,
                area: null,
                title: null,
                address: ""
            },
            validateErrData: {},
            longitude: 0,
            latitude: 0
        }
    },
    computed: {
        ...mapState("personalStore/", ["tags"])
    },
    onShow(options) {
        const { geo = "", address = "" } = wx.getStorageSync("geo") || {}
        this.formData = {
            ...this.formData,
            address,
            geo
        }
    },
    onUnload() {
        wx.removeStorage({
            key: "geo",
            success() {
                console.log("remove")
            }
        })
    },
    onLoad(query) {
        this.initValidate()
        this.fetchTags()
        const { longitude = 0, latitude = 0, address = "" } = query
        this.longitude = longitude
        this.latitude = latitude
    },
    methods: {
        ...mapActions("personalStore", ["fetchTags", "uploadFile"]),
        formSubmit: function(e) {
            const params = e.mp.detail.value
            console.log("form发生了submit事件，携带数据为：", params)
            this.validateErrData = {}
            if (!this.WxValidate.checkForm(params)) {
                //表单元素验证不通过，此处给出相应提示
                console.log(
                    "this.WxValidate.errorList",
                    this.WxValidate.errorList
                )
                let error = this.WxValidate.errorList[0]
                const errorList = this.WxValidate.errorList
                console.log("error", error)
                if (errorList) {
                    errorList.forEach(item => {
                        this.validateErrData[item.param] = { ...item }
                    })
                    console.log(this.validateErrData, "this.validateErrData")
                }
            } else {
                // 校验成功，清除错误消息
                this.validateErrData = {}
            }
        },
        handleUploadFile() {
            console.log()
            const that = this
            that.uploadFile({})
            // wx.chooseImage({
            //     count: 1, // 默认9
            //     sizeType: ["original"], // 可以指定是原图还是压缩图，默认用原图
            //     sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
            //     success: function(res) {
            //         that.uploadFile(res.tempFiles[0].path)
            //     }
            // })
        },
        handleSelectType(e) {
            const value = e.mp.detail.value
            this.formData.type = Number(value)
            const target = this.typeList[Number(value)]
            this.currType = target.label
        },
        handleFormChange(e, name) {
            console.log(e.mp.detail.value, name)
            // this.validateErrData[name] = null;
            // console.log(this.validateErrData);
            // this.validateErrData = {};
            // name !== '' && delete this.validateErrData[name];
            // console.log('this.validateErrData', this.validateErrData);
        },
        handleSelectMapLoca() {
            const that = this
            // 调用接口
            wx.getSetting({
                success: function(res) {
                    console.log("授权信息", res)
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
                                    })
                                } else if (res.confirm) {
                                    wx.openSetting({
                                        success: function(dataAu) {
                                            if (
                                                dataAu.authSetting[
                                                    "scope.userLocation"
                                                ] == true
                                            ) {
                                                wx.showToast({
                                                    title: "授权成功",
                                                    icon: "success",
                                                    duration: 1000
                                                })
                                                that.moveToLocation()
                                            } else {
                                                wx.showToast({
                                                    title: "授权失败",
                                                    icon: "cancel",
                                                    duration: 1000
                                                })
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    } else {
                        that.moveToLocation()
                    }
                }
            })
        },
        //移动选点
        moveToLocation: function() {
            var that = this
            wx.chooseLocation({
                success: function(res) {
                    const { address, latitude, longitude } = res
                    wx.setStorage({
                        key: "geo",
                        data: {
                            longitude,
                            latitude,
                            address,
                            geo:
                                longitude != 0
                                    ? `纬度：${latitude}, 经度：${longitude}`
                                    : ""
                        }
                    })
                },
                fail: function(err) {
                    console.log(err)
                }
            })
        },
        formReset: function() {
            // this.formData = {};
            for (let key in Object.keys(this.formData)) {
                this.formData[key] = null
            }
            this.validateErrData = {}
            console.log("form发生了reset事件")
        },
        handleSelectRentType(e) {},
        handleSelect(e, type) {
            this.formData[type + "Index"] = Number(e.mp.detail.value)
            this.validateErrData[type] = null
        },
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
            }

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
            }
            //实例化当前的验证规则和提示消息
            this.WxValidate = new WxValidate(rules, message)
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../../style/common.less";
.publishNewHouseWrap {
    padding: 10px;
    font-size: 14px;
    .infoType {
        display: flex;
        justify-content: center;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
        .divider {
            flex-grow: 1;
            height: 1px;
            background: #d8d8d8;
            vertical-align: top;
            margin-top: 11px;
        }
        .infoTitle {
            flex-grow: 0;
            margin: 0 15px;
        }
    }
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
        .electroCheckbox {
            display: inline-block;
            width: 95px;
            margin-top: 8px;
        }
    }
}
</style>

