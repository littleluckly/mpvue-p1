<template>
    <div class="personal">
        <div class="userInfo">
            <div class="avatar">
                <img v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" alt />
                <img v-else src="/static/images/personal.png" alt />
            </div>
            <div class="info" v-if="hasLogin">{{userInfo.nickName}}</div>
            <div v-else>
                <button open-type="getUserInfo" @getuserinfo="getUserInfo">登录/注册</button>
                <p class="loginTips">登录后可以拥有更多的服务</p>
            </div>
            <img
                class="wave"
                src="https://raw.githubusercontent.com/weilanwl/ColorUI/master/demo/images/wave.gif"
                alt
            />
        </div>
        <div class="myservice">
            <div class="item sperator" @click="navigateTo('collection')">
                <p>我的收藏</p>
                <p>
                    <span class="itemIcon">
                        <i-icon type="collection" size="18" />
                    </span>
                    <span class="value">0</span>
                </p>
            </div>
            <div class="item" @click="navigateTo('history')">
                <p>浏览记录</p>
                <p>
                    <span class="itemIcon">
                        <i-icon type="time" size="18" />
                    </span>
                    <span class="value">0</span>
                </p>
            </div>
        </div>
        <div class="content">
            <ul>
                <li class="item" @click="linkTo('./publishNewHouse/main')">
                    <span class="itemIcon">
                        <i-icon type="brush" size="24" />
                    </span>
                    <span>我要发布房源</span>
                </li>
                <li class="item">
                    <span class="itemIcon">
                        <i-icon type="integral" size="24" />
                    </span>
                    <span>关于蜗居深圳</span>
                </li>
                <li class="item">
                    <span class="itemIcon">
                        <i-icon type="brush" size="24" />
                    </span>
                    <span>意见反馈</span>
                </li>
            </ul>
        </div>
        <div class="footer">退出登录</div>

        <Consult />
    </div>
</template>

<script>
import Consult from "@/components/consult"
import { mapActions } from "vuex"
export default {
    components: { Consult },
    data() {
        return {
            userInfo: {},
            hasLogin: false,
            loginModalVisible: false,
            loginModalActions: [
                {
                    name: "取消"
                },
                {
                    name: "确认",
                    color: "#2d8cf0"
                }
            ]
        }
    },
    computed: {},
    onLoad() {
        const that = this

        wx.checkSession({
            success() {
                wx.getStorage({
                    key: "userInfo",
                    success(res) {
                        that.userInfo = res.data
                        that.hasLogin = true
                    }
                })
            },
            fail() {
                wx.removeStorage({
                    key: "userInfo"
                })
            }
        })
    },
    methods: {
        ...mapActions(["getSession", "saveUserInfo"]),
        getUserInfo(e) {
            const { userInfo } = e.mp.detail
            const that = this
            wx.checkSession({
                success() {
                    //session_key 未过期，并且在本生命周期一直有效
                    that.hasLogin = true
                    that.userInfo = { ...userInfo }

                    wx.setStorage({
                        key: "userInfo",
                        data: userInfo
                    })
                    console.log(userInfo)
                },
                fail() {
                    // session_key 已经失效，需要重新执行登录流程
                    wx.login({
                        success: async res => {
                            if (res.code) {
                                const result = await that.getSession({
                                    ...userInfo,
                                    code: res.code
                                })
                                that.hasLogin = true
                                that.userInfo = { ...userInfo }

                                wx.setStorage({
                                    key: "userInfo",
                                    data: userInfo
                                })
                            } else {
                                console.log("登录失败！" + res.errMsg)
                            }
                        }
                    })
                }
            })
        },
        navigateTo(page) {
            wx.navigateTo({ url: `../${page}/main` })
        },
        linkTo() {
            wx.navigateTo({ url: `./publishNewHouse/main` })
        }
    },
    mounted() {}
}
</script>
<style lang="less">
</style>

<style lang="less">
@import "../../style/common";
.personal {
    height: 100vh;
    background: @graylightBg;
    font-size: 14px;
    .userInfo {
        // margin-bottom: 10px;
        background: #fff;
        // display: flex;
        // padding: 20px 10px;
        padding: 80px 0 50px 0;
        position: relative;
        background: @primaryBg;
        text-align: center;
        .avatar {
            width: 50px;
            height: 50px;
            border: 1px solid @grayIcon;
            border-radius: 30px;
            padding: 1px;
            margin: 10px auto;
            background: #fff;
            img {
                height: 100%;
                width: 100%;
                border-radius: 50%;
            }
        }
        // .login {
        //     margin-bottom: 10px;
        //     color: #fff;
        button {
            background: @primaryBg;
            color: #fff;
            border: none;
            &::after {
                border: none;
            }
        }
        // }
        .loginTips {
            color: #fff;
        }
        .info {
            flex: 1;
            font-size: 18px;
            color: #fff;
        }
        .wave {
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            z-index: 99;
            mix-blend-mode: screen;
            height: 50px;
        }
    }
    .myservice {
        padding: 10px;
        margin-bottom: 10px;
        background: #fff;
        display: flex;
        justify-content: space-around;
        .item {
            flex-grow: 1;
            text-align: center;
            p {
                &:last-child {
                    color: @graylightText;
                }
                .value {
                    margin-left: 5px;
                    vertical-align: middle;
                }
            }
        }
    }
    .content {
        margin-bottom: 10px;
        background: #fff;
        .item {
            padding: 10px;
            line-height: 28px;
            border-bottom: 1px solid @graylightBg;
            .itemIcon {
                display: inline-block;
                margin-right: 8px;
                height: 20px;
                width: 20px;
                color: @grayIcon;
                img {
                    width: 100%;
                    height: 100%;
                    vertical-align: top;
                    margin-top: 4px;
                }
            }
        }
    }
    .footer {
        background: #fff;
        text-align: center;
        line-height: 40px;
    }
}

.loginModal {
    .i-modal-main {
        width: 90%;
    }
    .i-modal-content {
        padding-top: 0;
    }
}
</style>
