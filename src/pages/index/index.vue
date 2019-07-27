<template>
    <div class="homepage" :class="{showDrawer:showDrawer}" @touchstart="touchStart" @touchmove="touchmove">
        <!-- 首页普通内容 -->
        <div class="normalWrap">
            <button @click="handleUser">登录</button>
            <!-- <button open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="handleUser">获取用户信息</button> -->

            <div class="mask" @click="toggledrawer(false)"></div>
            <div class="topWrap" v-bind:style="{ paddingTop: top+height + 'px' }">
                <span @click="linkToWelcome" class="logoText">
                    <img src="/static/images/logo_text.png" alt />
                </span>
                <p
                    @click="toggledrawer(true)"
                    style="flex:1;line-height:38px;border:1px solid #f2f2f2;color:#666;border-radius:10px;padding-left:10px;background:#fff;"
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
                    <div v-for="(item,idx) in homepageList" :key="item.address+idx" class="listItem" @click="showHouseDetail(item)">
                        <div class="thumbImg">
                            <img :src="item.thumb_img" alt />
                        </div>
                        <div class="itemDesc">
                            <p class="mainDesc">
                                <span class="layout sperator">{{item.layout}}</span>
                                <span class="area sperator">
                                    <span>{{item.area}}</span>
                                    <span class="square"></span>
                                </span>
                                <span class="address">{{item.location}}</span>
                            </p>
                            <p class="houseName">{{item.house_name}}</p>
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
        <!-- 侧滑全屏抽屉效果 -->
        <div class="drawerWrap" :style="{ paddingTop: top + 'px' }">
            <div class="searchDrawer">
                <div class="searchInputWrap">
                    <input class="searchInput" v-model="searchVal" placeholder="请输入小区名称、地址、户型等" confirm-type="search" @confirm="handleSearch" maxlength="200" />
                    <!-- @change="handleChange" -->
                    <span @click="handleSearch" class="searchIcon">
                        <i-icon type="search" size="18" />
                    </span>
                </div>
                <div class="searchHistory">
                    <p>搜索历史</p>
                    <div class="itemWrap" :class="{showMore:history}">
                        <span class="item">一房一厅</span>
                        <span class="item">一房一厅</span>
                        <span class="item">单间</span>
                        <div class="showMoreBtn" @click="showMore('history')">
                            显示更多
                            <i-icon type="unfold"></i-icon>
                        </div>
                    </div>
                </div>
                <div class="hotSearch">
                    <p>热门搜索</p>
                    <div class="itemWrap" :class="{showMore:hotSearch}">
                        <span class="item">单间</span>
                        <span class="item">近地铁</span>
                        <span class="item">南北通透</span>
                        <div class="showMoreBtn" @click="showMore('hotSearch')">
                            显示更多
                            <i-icon type="unfold"></i-icon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import store from '@/stores/index'
import { mapActions } from 'vuex';
import loggoText from '../../../static/images/logo_text.png';
import calcCapsulePosi from '@/mixins/calcCapsulePosi';
export default {
    mixins: [calcCapsulePosi],
    data() {
        return {
            // top: 0,
            // height: 0,
            searchVal: '',
            scrollTop: 0,
            loggoText: loggoText,
            showDrawer: false,
            history: false,
            hotSearch: false,
            touchX: 0,
            touchY: 0,
            dailyList: [
                {
                    thumb_img: 'https://pic1.ajkimg.com/display/58ajk/b094d6112bda9a33b1537b3192cb2450/240x180.jpg',
                    houseLayout: '一房一厅',
                    rent: '1800'
                },
                {
                    thumb_img: 'https://pic1.ajkimg.com/display/58ajk/674ddbe8a7feb2e7e824fadb2a1d378f/240x180.jpg',
                    houseLayout: '两房一厅',
                    rent: '800'
                },
                {
                    thumb_img: 'https://pic1.ajkimg.com/display/58ajk/dad4e4b1319f5efb4b6228b089dc9847/240x180.jpg',
                    houseLayout: '单间',
                    rent: '670'
                }
            ]
        };
    },
    computed: {
        homepageList() {
            return this.$store.state.homepageList;
        },
        drawerVisible() {
            return this.$store.state.drawerVisible;
        }
    },
    onShow() {
        // console.log("onshow", this.toggleDrawerVisible(false))
        // this.$store.commit("drawerVisible", false)
        // this.showDrawer = false
    },
    onHide() {
        // console.log("onHide")
        // this.showDrawer = false
        // this.$store.commit("drawerVisible", false)
    },
    created() {
        this.$store.dispatch('fetchHomepageList');
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
        ...mapActions(['toggleDrawerVisible']),
        touchStart(e) {
            let x = e.mp.changedTouches[0].clientX;
            let y = e.mp.changedTouches[0].clientY;
            this.touchX = x;
            this.touchY = y;
        },
        touchmove(e) {
            let x = e.mp.changedTouches[0].clientX;
            let y = e.mp.changedTouches[0].clientY;
            const direction = this.getTouchDirection(x, y, this.touchX, this.touchY);
            if (direction == 'left') {
                this.$store.commit('drawerVisible', true);
                this.showDrawer = true;
            } else if (direction == 'right') {
                this.$store.commit('drawerVisible', false);
                this.showDrawer = false;
            }
        },
        getTouchDirection(endX, endY, startX, startY) {
            let turn = '';
            if (endX - startX > 50 && Math.abs(endY - startY) < 50) {
                //左滑
                turn = 'left';
            } else if (endX - startX < -50 && Math.abs(endY - startY) < 50) {
                //右滑
                turn = 'right';
            }
            return turn;
        },
        handleChange({
            map: {
                target: {
                    detail: { value }
                }
            }
        }) {
            console.log(value);
            this.searchVal = value;
        },
        linkToWelcome() {
            wx.navigateTo({ url: '../welcome/main' });
        },
        showHouseDetail(item) {
            console.log('item', item, 2233);
            wx.navigateTo({
                url: `./houseDetail/main?id=${item._id}&name=${item.house_name || ''}`
            });
        },
        handleSearch(e) {
            const value = e.target ? e.target.value : this.searchVal;
            // this.showDrawer = false
            wx.navigateTo({
                url: `./rentSearchList/main?searchVal=${value || ''}`
            });
        },
        toggledrawer(flag) {
            this.showDrawer = flag;
            this.$store.commit('drawerVisible', flag);
        },
        showMore(type) {
            this[type] = true;
        },
        handleUser() {
            wx.request({
                url: 'https://localhost:9527/api/test',
                success: function(c) {
                    console.log('c', c);
                }
            });
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
            // 调用云函数，返回用户openId，参数为云函数名称
            // wx.cloud
            //     .callFunction({ name: 'user' })
            //     .then(res => {
            //         console.log('res', res, this.$store)
            //         // 更新store中的openId
            //         // this.$this.$store.commit("updateOpenId", res.result)
            //         // return this.WXP.getSetting()
            //         return res.result
            //     })
            //     .then(res => {
            //         console.log('ressss', res)
            //         return res
            //         // 检验是否授权
            //         // const authUserInfo = res.authSetting["scope.userInfo"]
            //         // if (authUserInfo) {
            //         // this.$this.$store.commit("updateAuthUserInfo", authUserInfo)
            //         // }
            //     })
            //     .catch(err => console.error(111, err))
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
        console.log('scroll');
        this.scrollTop = event.scrollTop;
    }
};
</script>

<style lang="less">
@import '../../style/common';
.homepage {
    font-size: 14px;
    position: relative;
    top: 0;
    bottom: -60px;
    height: 100vh;
    background: linear-gradient(to bottom, #8fd3f4, #84fab0);
    &.showDrawer {
        // overflow: hidden;
        .drawerWrap {
            left: 0;
        }
        .normalWrap {
            left: 90%;
            top: 20px;
            // bottom: -20px;
            // height: calc(100vh - 40px);
            overflow: hidden;
            .mask {
                display: block;
            }
        }
    }
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
        // &.showDrawer {
        //     left: 90%;
        //     top: 20px;
        //     bottom: -20px;
        //     .mask {
        //         display: block;
        //     }
        // }
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
            .logoText {
                display: inline-block;
                height: 40px;
                width: 70px;
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
                        font-size: 16px;
                        color: #333;
                        margin-bottom: 2px;
                    }
                    .houseName {
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
