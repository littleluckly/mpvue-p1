<template>
    <div class="loadingBlock">
        <div class="loading-mask"></div>
        <div class="place_left"></div>
        <div class="place_right">
            <p class="place_list_item"></p>
            <p class="place_list_item"></p>
            <p class="place_list_item"></p>
        </div>
    </div>
</template>
<style lang="less" scoped>
.loadingBlock {
    display: flex;
    position: relative;
    margin-bottom: 12px;
    .place_left {
        width: 25%;
        background: #cfd4db;
        border-radius: 4px;
    }
    .place_right {
        flex: 1;
        padding-left: 12px;
        .place_list_item {
            margin-bottom: 6px;
            height: 14px;
            background: #cfd4db;
            border-radius: 4px;
            &:nth-child(1) {
                width: 60%;
            }
            &:nth-child(2) {
                width: 90%;
            }
            &:nth-child(3) {
                width: 35%;
            }
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
    .loading-mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            #f2f2f2 0%,
            rgba(255, 255, 255, 0) 50%,
            #fdfdfd 100%
        );
        background-size: 200% 100%;
        background-position: 0 0;
        animation: bgposition 2s infinite linear alternate;
    }
    @keyframes bgposition {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 100% 0;
        }
    }
}
</style>