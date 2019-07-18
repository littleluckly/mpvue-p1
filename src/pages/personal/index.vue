<template>
    <div class="personal">
        <div class="userInfo">
            <div class="avatar">
                <img v-if="userInfo.avatar" :src="userInfo.avatar" alt />
                <img v-else src="/static/images/personal.png" alt />
            </div>
            <div class="info" v-if="code">
                <p>八块腹肌的坏蛋</p>
            </div>
            <div @click="handleLogin" v-else>
                <p class="login">登录/注册</p>
                <p class="loginTips">登录后可以拥有更多的服务</p>
            </div>
            <img class="wave" src="https://image.weilanwl.com/gif/wave.gif" alt />
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
                <li class="item">
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
        <i-modal
            :visible="loginModalVisible"
            :actions="loginModalActions"
            @click="handleClick3"
            i-class="loginModal"
        >
            <div>蜗居深圳</div>
            <p>蜗居深圳申请获取一下权限：</p>
            <p>申请获取您的公开信息（头像、昵称等）</p>
        </i-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userInfo: {
                avatar:
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg"
            },
            code: "",
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
    created() {
        // wx.getStorage({
        //     key: "code",
        //     success: res => {
        //         console.log("getCode", res.data)
        //         this.code = res.data
        //     }
        // })
        // wx.login({
        //     success: res => {
        //         wx.setStorage({
        //             key: "code",
        //             data: res.code
        //         })
        //     }
        // })
    },
    methods: {
        navigateTo(page) {
            wx.navigateTo({ url: `../${page}/main` })
        },
        handleClick3(a) {
            // const index = detail.index
            console.log(a)

            // if (index === 0) {
            //     console.log("aa")
            // } else if (index === 1) {
            //     console.log("bbb")
            // }

            this.loginModalVisible = false
        },
        handleLogin() {
            console.log("llll")
            this.loginModalVisible = true
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
        .login {
            margin-bottom: 10px;
            color: #fff;
        }
        .loginTips {
            color: #fff;
        }
        .info {
            flex: 1;
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
