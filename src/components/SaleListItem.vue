<template>
    <div class="item" @click="$emit('linkTo')">
        <div class="thumb">
            <img :src="data.src" alt />
        </div>
        <div class="info">
            <p class="name">{{data.name}}</p>
            <p class="price">
                <span class="type">{{data.type}}</span>
                <span>{{data.price}}万</span>
            </p>
            <p class="layoutWrap">
                <span class="decoraction">{{data.decoraction}}</span>
                <span class="layout">{{data.layout}}</span>
                <span class="area">{{data.area}}</span>
            </p>
            <p class="tags">
                <i-tag
                    v-for="tag in data.tags"
                    :key="tag"
                    class="i-tags"
                    type="border"
                    color="red"
                >{{tag}}</i-tag>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => ({})
        },
        linkTo: {
            type: Function,
            default: () => {}
        }
    }
}
</script>
<style lang="less" scoped>
@import "../style/common";
.item {
    display: flex;
    margin-bottom: 8px;
    padding-bottom: 5px;
    border-bottom: 1px dashed @graylightBg;
    &:last-child {
        border-color: transparent;
    }
    .thumb {
        margin-right: 10px;
        width: 120px;
        img {
            width: 100%;
            height: 90px;
        }
    }
    .info {
        flex: 1;
        overflow: hidden;
        .name {
            font-size: 16px;
        }
        .price {
            display: flex;
            justify-content: space-between;
            color: @primary;
            font-size: 22px;
            .type {
                font-size: 14px;
                color: #333;
                vertical-align: bottom;
                margin-top: 7px;
            }
        }
        .layoutWrap {
            display: flex;
            justify-content: space-between;
            color: #666;
            margin-bottom: 5px;
            .area {
                .square;
            }
        }
        .tags {
            font-size: 12px;
            color: #fff;
            overflow-x: auto;
            white-space: nowrap;
            &::-webkit-scrollbar {
                display: none;
            }
            .i-tags {
                margin-right: 5px;
            }
        }
    }
}
</style>

