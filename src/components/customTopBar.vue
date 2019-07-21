<template>
    <div class="topWrap" v-bind:style="{ paddingTop: top + 'px',height: height + 'px' }">
        <div class="back" @click="backTo">
            <i-icon type="return" size="24" color="#fff;" @click="backTo"></i-icon>
        </div>
        <div class="title">{{title}}</div>
    </div>
</template>
<script>
export default {
    props: {
        top: {
            type: Number,
            default: 30
        },
        height: {
            type: Number,
            default: 30
        },
        title: {
            type: String,
            default: ""
        }
    },
    onLoad() {
        console.log("customTopbar", this.top, this.height, this.title)
    },
    methods: {
        backTo() {
            console.log(getCurrentPages())
            wx.navigateBack({
                delta: 1
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import "../style/common";
.topWrap {
    width: 100%;
    padding-bottom: 10px;
    background: @primaryBg;
    .back {
        // position: absolute;
        float: left;
        padding: 0 10px;
    }
    .title {
        color: #fff;
        text-align: left;
        // padding-left: 50px;
    }
}
</style>
