<template>
    <div class="personal">
        <div class="userInfo">
            <div class="avatar">
                <img v-if="userInfo.avatar" src alt />
                <img v-else src="/static/images/personal.png" alt />
            </div>
            <div class="info">
                <p>八块腹肌的坏蛋</p>
            </div>
        </div>
        <div class="content">
            <ul>
                <li class="item" @click="navigateTo('collection')">
                    <span class="itemIcon" style="color:#bfbfbf;">
                        <!-- <img src="/static/images/collect.png" alt /> -->
                        <i-icon type="collection" size="24" />
                    </span>
                    <span>收藏</span>
                </li>
                <li class="item" @click="navigateTo('focus')">
                    <span class="itemIcon" style="color:#bfbfbf;">
                        <i-icon type="like_fill" size="24" />
                    </span>
                    <span>关注</span>
                </li>
                <li class="item" @click="navigateTo('history')">
                    <span class="itemIcon" style="color:#bfbfbf;">
                        <i-icon type="time" size="24" />
                        <!-- <img src="/static/images/history.png" alt /> -->
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
            }
        }
    },
    computed: {},
    methods: {
        navigateTo(page) {
            wx.navigateTo({ url: `../${page}/main` })
        }
    },
    mounted() {}
}
</script>

<style lang="less" scoped>
.personal {
    height: 100vh;
    padding: 5px;
    background: #f2f2f2;
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
        border: 1px solid #bfbfbf;
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
        border-bottom: 1px solid #f2f2f2;
        .itemIcon {
            display: inline-block;
            margin-right: 8px;
            height: 20px;
            width: 20px;
            img {
                width: 100%;
                height: 100%;
                vertical-align: top;
                margin-top: 4px;
            }
            // background-image: url('~static/images/history.png')
        }
    }
}
.footer {
    background: #fff;
    text-align: center;
    line-height: 40px;
}
</style>
