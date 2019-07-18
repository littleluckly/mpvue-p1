<template>
    <div class="collection">
        <p class="back" v-bind:style="{ top: top + 'px' }">
            <i-icon type="return" size="24" color="#fff;" @click="backTo"></i-icon>
        </p>
        <h3>收藏</h3>
    </div>
</template>

<script>
import calcCapsulePosi from "@/mixins/calcCapsulePosi"
export default {
    mixins: [calcCapsulePosi],
    data() {
        return {}
    },
    created() {},
    methods: {
        backTo() {
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