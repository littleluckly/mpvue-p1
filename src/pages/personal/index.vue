<template>
    <div class="personal">
        <div class="userInfo">
            <div class="avatar">
                <img v-if="userInfo.avatar" src alt />
                <img v-else src="/static/images/personal.png" alt />
            </div>
            <div class="info" v-if="!code">
                <p>八块腹肌的坏蛋</p>
            </div>
            <div v-else>
                <p>登录/注册</p>
                <p>登录后可以拥有更多的服务</p>
            </div>
        </div>
        <div class="content">
            <ul>
                <li class="item" @click="navigateTo('collection')">
                    <span class="itemIcon">
                        <i-icon type="collection" size="24" />
                    </span>
                    <span>收藏</span>
                </li>
                <li class="item" @click="navigateTo('focus')">
                    <span class="itemIcon">
                        <i-icon type="like_fill" size="24" />
                    </span>
                    <span>关注</span>
                </li>
                <li class="item" @click="navigateTo('history')">
                    <span class="itemIcon">
                        <i-icon type="time" size="24" />
                    </span>
                    <span>历史记录</span>
                </li>
            </ul>
        </div>
        <div class="footer">退出登录</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userInfo: {
                avatar: ""
            },
            code: ""
        }
    },
    computed: {},
    created() {
        wx.getStorage({
            key: "code",
            success: res => {
                console.log("getCode", res.data)
                this.code = res.data
            }
        })
    },
    methods: {
        navigateTo(page) {
            wx.navigateTo({ url: `../${page}/main` })
        }
    },
    mounted() {}
}
</script>

<style lang="less" scoped>
@import "../../style/common";
.personal {
    height: 100vh;
    padding: 5px;
    background: @graylightBg;
    font-size: 14px;
}
.userInfo {
    margin-bottom: 10px;
    background: #fff;
    display: flex;
    padding: 20px 10px;
    .avatar {
        width: 50px;
        height: 50px;
        border: 1px solid @grayIcon;
        border-radius: 30px;
        padding: 5px;
        margin-right: 10px;
        img {
            height: 100%;
            width: 100%;
        }
    }
    .info {
        flex: 1;
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
</style>
