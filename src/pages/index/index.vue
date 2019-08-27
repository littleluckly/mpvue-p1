<template>
    <div class="homepage">
        <!-- 首页普通内容 -->
        <div class="normalWrap">
            <!-- <button @click="handleUser">登录</button> -->
            <!-- <button open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="handleUser">获取用户信息</button> -->
            <div class="topWrap" v-bind:style="{ paddingTop: top+height + 'px' }">
                <span @click="linkToWelcome" class="logo">
                    <img src="/static/images/logo.png" alt />
                </span>
                <p
                    @click="linkToSearch"
                    style="flex:1;line-height:38px;border:1px solid #f2f2f2;color:#666;border-radius:30px;padding-left:10px;background:#fff;"
                >搜索好房</p>
                <span @click="handleSearch" class="searchIcon">
                    <i-icon type="search" size="18" color="#666" />
                </span>
            </div>
            <div class="dailyRecommend">
                <p class="dailyTitle">- 今日优选 -</p>
                <div class="dailyItemWrap">
                    <div v-for="(item, idx) in dailyList" :key="idx" class="dailyItem">
                        <img :src="item.thumb_img" />
                        <p class="houseLayout">{{item.houseLayout}}</p>
                        <p class="rent">{{item.rent}}元/月</p>
                    </div>
                </div>
            </div>
            <div class="listWrap">
                <div class="resultWrap">
                    <p class="listTitle">精选好房</p>
                    <div
                        v-for="(item,idx) in rentRecommendList"
                        :key="item.address+idx"
                        class="listItem"
                        @click="showHouseDetail(item)"
                    >
                        <div class="thumbImg">
                            <img :src="item.thumb_img" alt />
                        </div>
                        <div class="itemDesc">
                            <p class="houseName">{{item.house_name}}</p>
                            <p class="mainDesc">
                                <span class="layout sperator">{{item.layout}}</span>
                                <span class="area sperator">
                                    <span>{{item.area}}</span>
                                    <span class="square"></span>
                                </span>
                                <span class="address">{{item.location}}</span>
                            </p>
                            <p class="priceDesc">
                                <span class="price">{{item.price}}</span>
                                <span class="unit">元/月</span>
                                <span class="type">{{item.type}}</span>
                            </p>
                            <p class="address">{{item.address}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import store from '@/stores/index'
import { mapActions, mapState } from "vuex"
import loggoText from "../../../static/images/logo_text.png"
import calcCapsulePosi from "@/mixins/calcCapsulePosi"
export default {
    mixins: [calcCapsulePosi],
    data() {
        return {
            searchVal: "",
            scrollTop: 0,
            loggoText: loggoText,
            history: false,
            hotSearch: false,
            touchX: 0,
            touchY: 0,
            dailyList: [
                {
                    thumb_img:
                        "https://pic1.ajkimg.com/display/58ajk/b094d6112bda9a33b1537b3192cb2450/240x180.jpg",
                    houseLayout: "一房一厅",
                    rent: "1800"
                },
                {
                    thumb_img:
                        "https://pic1.ajkimg.com/display/58ajk/674ddbe8a7feb2e7e824fadb2a1d378f/240x180.jpg",
                    houseLayout: "两房一厅",
                    rent: "800"
                },
                {
                    thumb_img:
                        "https://pic1.ajkimg.com/display/58ajk/dad4e4b1319f5efb4b6228b089dc9847/240x180.jpg",
                    houseLayout: "单间",
                    rent: "670"
                }
            ]
        }
    },
    computed: {
        ...mapState({
            rentRecommendList: state => state.rentStore.rentRecommendList
        })
    },
    onShow() {
        // wx.pageScrollTo({
        //     scrollTop: 0
        // });
    },
    onHide() {},
    created() {
        this.fetchRecommendList()
        // this.$store.dispatch('fetchHomepageList');
        // console.log("lk11111111")
        // 获取右上角胶囊按钮的位置信息,
        // const position = wx.getMenuButtonBoundingClientRect()
        // const { top, height } = position
        // this.top = Math.ceil(top)
        // this.height = Math.ceil(height)
        // wx.showModal({
        //     title: "微信授权申请",
        //     content: "申请获取您的公开信息（头像、昵称等）",
        //     success(res) {
        //         if (res.confirm) {
        //             console.log("用户点击确定")
        //             wx.login({
        //                 success: res => {
        //                     wx.setStorage({
        //                         key: "code",
        //                         data: res.code
        //                     })
        //                 }
        //             })
        //         } else if (res.cancel) {
        //             console.log("用户点击取消")
        //         }
        //     }
        // })
    },
    methods: {
        ...mapActions("rentStore/", ["fetchRecommendList"]),
        handleChange({
            map: {
                target: {
                    detail: { value }
                }
            }
        }) {
            console.log(value)
            this.searchVal = value
        },
        linkToSearch() {
            wx.navigateTo({
                url: "../search/main"
            })
        },
        linkToWelcome() {
            wx.navigateTo({ url: "../welcome/main" })
        },
        showHouseDetail(item) {
            console.log("item", item, 2233)
            wx.navigateTo({
                url: `./houseDetail/main?id=${
                    item._id
                }&name=${item.house_name || ""}`
            })
        },
        handleSearch(e) {
            const value = e.target ? e.target.value : this.searchVal
            wx.navigateTo({
                url: `./rentSearchList/main?searchVal=${value || ""}`
            })
        },
        showMore(type) {
            this[type] = true
        },
        handleUser() {
            wx.request({
                url: "https://localhost:9527/api/test",
                success: function(c) {
                    console.log("c", c)
                }
            })
            // wx.checkSession({
            // success() {
            //     console.log('success')
            // },
            // fail() {
            // var that = this
            //登录
            // wx.login({
            //     success(res) {
            //         if (res.code) {
            //             //获取code
            //             var code = res.code
            //             //在小程序规定请求地址通过appId，appSecret，登录时获取的code 来获得json数据
            //             var url =
            //                 'https://api.weixin.qq.com/sns/jscode2session?appid=' +
            //                 'wxb76f934941bce27c' +
            //                 '&secret=' +
            //                 '172531853dfde0faf6ce3f135b28685d' +
            //                 '&js_code=' +
            //                 code +
            //                 '&grant_type=authorization_code'
            //             //向服务器发起请求获取session_key，openid
            //             wx.request({
            //                 url: url,
            //                 data: {
            //                     session_key: '',
            //                     openid: ''
            //                 },
            //                 success: function(res) {
            //                     console.log('res5555', res)
            //                 }
            //             })
            //         } else {
            //             console.log('登录失败！' + res.errMsg)
            //         }
            //     }
            // })
            // }
            // })
        },
        chooseImage() {
            wx.chooseImage({
                success: function(res) {
                    var tempFilePaths = res.tempFilePaths // tempFilePaths 的每一项是一个本地临时文件路径
                    console.log(res, "res")
                    wx.uploadFile({
                        url: "https://localhost:9527/uploadfile", //请更改为你自己部署的接口
                        filePath: tempFilePaths[0],
                        name: "file",
                        success(res) {
                            console.log("res00", res)
                        }
                    })
                }
            })
        }
    },
    mounted() {
        // wx.startPullDownRefresh({
        //     success: () => {
        //         console.log("xiala ")
        //     }
        // })
    },
    //页面滚动执行方式
    onPageScroll(event) {
        console.log("scroll")
        this.scrollTop = event.scrollTop
    }
}
</script>

<style lang="less">
@import "../../style/common";
.homepage {
    font-size: 14px;
    position: relative;
    top: 0;
    bottom: -60px;
    height: 100vh;
    background: linear-gradient(to bottom, #8fd3f4, #84fab0);
    .searchInputWrap {
        flex: 1;
        height: 35px;
        overflow: hidden;
        border-radius: 7px;
        .searchInput {
            height: 38px;
            padding-left: 30px;
            line-height: 38px;
        }
    }
    // 普通内容
    .normalWrap {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        transition: all ease-in-out 500ms;
        width: 100%;
        background: #fff;
        .mask {
            display: none;
            position: absolute;
            height: 100vh;
            width: 100%;
            background: transparent;
        }
        .topWrap {
            display: flex;
            height: 60px;
            align-items: center;
            background: #5cadff;
            .searchIcon {
                position: relative;
                left: -30px;
                top: 0;
                line-height: 38px;
                padding: 0 8px;
            }
            .logo {
                display: inline-block;
                padding: 0 5px;
                height: 40px;
                width: 40px;
                background-size: contain;
                background-position: left 4px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .dailyRecommend {
            .dailyTitle {
                position: relative;
                text-align: center;
                padding: 10px;
                &::after {
                    position: absolute;
                    right: 0;
                    width: 20px;
                    height: 2px;
                    background: #eee;
                }
                &::before {
                    width: 20px;
                    height: 2px;
                    background: #eee;
                }
            }
            .dailyItemWrap {
                display: flex;
                justify-content: center;
                padding: 0 10px;
                margin-bottom: 10px;
                .dailyItem {
                    width: 33%;
                    margin-right: 10px;
                    padding-bottom: 6px;
                    height: 120px;
                    background: @graylightBg;
                    &:last-child {
                        margin-right: 0;
                    }
                    img {
                        width: 100%;
                        height: 80px;
                    }
                    .houseLayout {
                        color: #666;
                        text-align: center;
                    }
                    .rent {
                        text-align: center;
                        color: #333;
                    }
                }
            }
        }
        .listWrap {
            padding: 10px;
            .listTitle {
                font-size: 18px;
                color: #333;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .listItem {
                display: flex;
                justify-content: center;
                margin-bottom: 10px;
                // height: 165px;
                .thumbImg {
                    width: 112px;
                    margin-right: 20px;
                    img {
                        width: 100%;
                        height: 80px;
                    }
                }
                .itemDesc {
                    flex: 1;
                    color: #666;
                    // 配合.address文字超长省略
                    overflow: hidden;
                    .mainDesc {
                        font-size: 14px;
                        color: #333;
                        margin-bottom: 2px;
                    }
                    .houseName {
                        font-size: 16px;
                        margin-bottom: 1px;
                    }
                    .priceDesc {
                        .price {
                            font-size: 18px;
                            color: @primary;
                            line-height: 15px;
                        }
                        .unit {
                            margin-right: 10px;
                            color: @primary;
                        }
                    }
                    .address {
                        .textOverflow;
                    }
                }
            }
        }
    }
    // 侧滑抽屉内容
    .drawerWrap {
        position: absolute;
        top: 0;
        bottom: 0;
        // bottom: -60px;
        left: -100%;
        width: 80%;
        // height: 100vh;
        padding: 20px;
        transition: left ease-in-out 500ms;
        .searchDrawer {
            padding: 0 10px;
            height: calc(100vh - 70px);
            background: #fff;
            border-radius: 10px;
            padding-top: 20px;
            .searchIcon {
                position: absolute;
                left: 5px;
                top: -1px;
                line-height: 76rpx;
                padding: 0 10rpx;
            }
            .searchInputWrap {
                position: relative;
                border: 1px solid #ccc;
                border-radius: 20px;
            }
            .searchInput {
                padding-left: 30px;
            }
            .searchHistory,
            .hotSearch {
                font-size: 12px;
                & > p {
                    font-weight: bold;
                    padding: 10px 0;
                }
                .itemWrap {
                    max-height: 100px;
                    overflow: hidden;
                    position: relative;
                    &.showMore {
                        max-height: 100%;
                        .showMoreBtn {
                            display: none;
                        }
                    }
                    .item {
                        display: inline-block;
                        padding: 2px 10px;
                        background: @graylightBg;
                        border-radius: 15px;
                        color: @grayText;
                        margin-right: 10px;
                        margin-bottom: 5px;
                        white-space: nowrap;
                    }
                    .showMoreBtn {
                        position: absolute;
                        background: #fff;
                        top: 84px;
                        width: 100%;
                        text-align: center;
                        line-height: 18px;
                        // margin-left: -30px;
                    }
                }
            }
        }
    }
}
</style>
