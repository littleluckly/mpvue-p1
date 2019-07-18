<template>
    <div class="rentSearchList">
        <div class="topWrap" v-bind:style="{ paddingTop: top + 'px',height: height + 'px' }">
            <div class="back" @click="backTo">
                <i-icon type="return" size="24" color="#fff;" @click="backTo"></i-icon>
            </div>
            <div class="title">搜索列表</div>
        </div>
    </div>
</template>
<script>
import calcCapsulePosi from "@/mixins/calcCapsulePosi"
export default {
    mixins: [calcCapsulePosi],
    data() {},
    created() {},
    methods: {
        backTo() {
            wx.switchTab({ url: "../main" })
        }
    }
}
</script>
<style lang="less">
@import "../../../style/common.less";
.rentSearchList {
    .topWrap {
        width: 100%;
        background: @primaryBg;
        .back {
            float: left;
        }
        .title {
            color: #fff;
            text-align: center;
        }
    }
}
</style>
