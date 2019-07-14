<template>
    <div class="welcome">
        <!-- <p class="title" v-bind:style="{ top: top + 'px' }">
            <img src="/static/images/logo_text2.png" alt />
        </p>-->
        <div class="main">
            <div class="slogan" @click="linkToCounter">
                <p class="quote">“向勇往直前的奋斗者致敬!”</p>
                <p class="author" style="text-align:right;">———路人甲</p>
                <p class="wave1"></p>
                <p class="wave2"></p>
                <p class="wave3"></p>
            </div>
        </div>
    </div>
</template>

<script>
// import globalStore from "../../../stores/index"
export default {
    data() {
        return {
            motto: "Hello miniprograme",
            userInfo: {
                nickName: "mpvue",
                avatarUrl: "http://mpvue.com/assets/logo.png"
            },
            top: 0
        }
    },
    created() {
        // 获取右上角胶囊按钮的位置信息,
        const position = wx.getMenuButtonBoundingClientRect()
        const { top } = position
        this.top = Math.ceil(top)
    },
    methods: {
        linkToCounter() {
            const url = "../index/main"
            mpvue.switchTab({ url })
        }
    }
}
</script>
 
 <style lang="less">
.welcome {
    height: 100vh;
    background: url("https://img.tukuppt.com/bg_grid/00/06/38/oOn0Y9E4ID.jpg!/fh/350")
        no-repeat center center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .title {
        position: absolute;
        padding: 0 10px;
        // top: 40px;
        left: 0;
        width: 60px;
        height: 30px;
        img {
            height: 100%;
            width: 100%;
        }
    }
}

.main {
    position: relative;
    height: 60px;

    padding: 1em;
    background: hsla(0, 0%, 100%, 0.25) border-box;
    /*隐藏多余的模糊元素*/
    overflow: hidden;
    border-radius: 0.3em;
    box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.3) inset,
        0 0.5em 1em rgba(0, 0, 0, 0.6);
    text-shadow: 0 1px 1px hsla(0, 0%, 100%, 0.3);
    animation: show 1s ease fill-mode;
    &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        /*设置负值的外边距是为了消除边缘模糊消失*/
        // margin: -30px;
        z-index: -1;
        -webkit-filter: blur(10px);
        filter: blur(10px);
    }

    .quote {
        font-size: 18px;
        font-family: Consolas;
        border-right: 2px solid;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        animation: typing 1s steps(16, end),
            hidden-border 0.5s ease-in 1.8s forwards;
    }
    .author {
        float: right;
        font-size: 18px;
        font-family: Consolas;
        width: 0;
        white-space: nowrap;
        overflow: hidden;
        animation: typing 0.5s steps(16, end) 1s forwards;
    }
    .wave1 {
        position: absolute;
        top: 0;
        left: 0;
        margin: auto;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        opacity: 0;
        background: rgba(56, 151, 228, 0.5);
        animation: wave 2s ease-in-out 1.5s infinite;
    }
    .wave2 {
        position: absolute;
        top: 0;
        left: 0;
        margin: auto;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        opacity: 0;
        background: rgba(56, 151, 228, 0.5);
        animation: wave 2s ease-in-out 2s infinite;
    }
    .wave3 {
        position: absolute;
        top: 0;
        left: 0;
        margin: auto;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        opacity: 0;
        background: rgba(56, 151, 228, 0.5);
        animation: wave 2s ease-in-out 2.5s infinite;
    }
}
// animation: name duration timing-function delay iteration-count direction;
@keyframes show {
    from {
        opacity: 0;
    }
    to {
        width: 1;
    }
}
@keyframes typing {
    from {
        width: 0;
    }
    to {
        width: 100%;
    }
}

@keyframes hidden-border {
    from {
        border-color: rgba(0, 0, 0, 1);
    }
    to {
        border-color: rgba(0, 0, 0, 0);
    }
}

@keyframes wave {
    0% {
        width: 10px;
        height: 10px;
        opacity: 1;
    }
    100% {
        width: 60px;
        height: 60px;
    }
}
</style>