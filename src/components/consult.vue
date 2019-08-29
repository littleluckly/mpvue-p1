<template>
    <cover-view class="commonConsultWrap">
        <cover-image class="img" src="/static/images/consult.png" />
        <button open-type="contact" class="consultBtn">客服</button>
    </cover-view>
</template>
<style lang="less" scoped>
@import "../style/common";
.commonConsultWrap {
    position: fixed;
    width: 30px;
    height: 30px;
    bottom: 60px;
    right: 15px;
    // background: rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    color: @primary;
    padding: 5px;
    .consultBtn {
        padding: 0px;
        background: rgba(0, 0, 0, 0);
        color: transparent;
        border: none;
        outline: none;
        position: absolute;
        top: 0;
        box-shadow: none;
        z-index: 10;
    }
    img {
        width: 100%;
        height: 100%;
    }
}
</style>
