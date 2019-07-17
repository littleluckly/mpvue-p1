<template>
    <div class="collection">
        <p class="back" v-bind:style="{ top: top + 'px' }">
            <i-icon type="return" size="24" color="#fff;" @click="backTo"></i-icon>
        </p>
        <h3>收藏</h3>
    </div>
</template>

<script>
export default {
    data() {
        return {
            top: 20
        }
    },
    created() {
        // 获取右上角胶囊按钮的位置信息,
        const position = wx.getMenuButtonBoundingClientRect()
        const { top } = position
        this.top = Math.ceil(top)
    },
    methods: {
        backTo() {
            console.log("aaa")
            wx.switchTab({ url: "../personal/main" })
        }
    }
}
</script>
 
<style lang="less">
@import "../../style/common.less";
.back {
    position: absolute;
    padding: 0 10px;
    left: 0;
    width: 60px;
    height: 30px;
    background: @primaryBg;
}
</style>