<template>
    <div>
        <!-- <div class="topBar">
            <div>{{title}}</div>
        </div>-->
        <CustomTopBar :top="top" :height="height" :title="title" />
        <div class="pictureArea">
            <swiper
                class="swiper"
                :indicator-dots="indicatorDots"
                :autoplay="autoplay"
                :interval="interval"
                :duration="duration"
            >
                <block v-for="(item, index) in imgList" :key="index">
                    <swiper-item>
                        <image :src="item.src" class="slide-image" mode="aspectFill" />
                    </swiper-item>
                </block>
            </swiper>
            <div>
                <p class="title">6号线坂雪岗站，精装修，拎包入住，舒适干净整洁，随时入住</p>
                <p class="statics">
                    <span>更新：2019-07-05</span>
                    <span>浏览：1次</span>
                    <span>
                        <i-icon class="icon" type="collection" size="24" />收藏
                    </span>
                </p>
            </div>
        </div>
        <div class="baseInfo">
            <div class="importantInfo">
                <div class="item">
                    <p class="label">户型</p>
                    <p class="value">1室1厅1卫</p>
                </div>
                <div class="item">
                    <p class="label">租金</p>
                    <p class="value">1200元/月</p>
                </div>
                <div class="item">
                    <p class="label">类型</p>
                    <p class="value">整租</p>
                </div>
            </div>
            <div class="info">
                <div class="infoItem">
                    <p class="label">小区：</p>
                    <p class="value">天安云谷城市广场天安云谷城市广场天安云谷城市广场</p>
                </div>
                <div class="infoItem">
                    <p class="label">面积：</p>
                    <p class="value">22平方</p>
                </div>
                <div class="infoItem">
                    <p class="label">楼层：</p>
                    <p class="value">2层/总30层</p>
                </div>
                <div class="infoItem">
                    <p class="label">付款：</p>
                    <p class="value">押一付一</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import calcCapsulePosi from "@/mixins/calcCapsulePosi"
import CustomTopBar from "@/components/customTopBar"
export default {
    mixins: ["calcCapsulePosi"],
    components: {
        CustomTopBar
    },
    data() {
        return {
            title: "",
            indicatorDots: true,
            autoplay: true,
            interval: 3000,
            duration: 500,
            value1: "",
            imgList: [
                {
                    src:
                        "https://pic5.58cdn.com.cn/anjuke_58/cc29706ea6857b65dab56f9f67add4c6?w=640&h=480&crop=1"
                },
                {
                    src:
                        "https://pic6.58cdn.com.cn/anjuke_58/599bef62e817176cfe7fd42014da45ca?w=640&h=480&crop=1"
                },
                {
                    src:
                        "https://pic5.58cdn.com.cn/anjuke_58/22eec5a3cf94ff9593e17b9c5124ba84?w=640&h=480&crop=1"
                },
                {
                    src:
                        "https://pic6.58cdn.com.cn/anjuke_58/0dc0ee4030643470a6247063823ab639?w=640&h=480&crop=1"
                },
                {
                    src:
                        "https://pic4.58cdn.com.cn/anjuke_58/749a8fafd17d5a7791bcda127ee8a4f2?w=640&h=480&crop=1"
                }
            ]
        }
    },
    onLoad(query) {
        console.log("id", query)
        const { name = "蜗居深圳", id } = query
        this.title = name
        // store.dispatch("fetchHomepageList")
    },
    computed: {},
    methods: {},
    mounted() {}
}
</script>

<style lang="less">
@import "../../../style/common";
page {
    background: @graylightBg;
    font-size: 14px;
}
.clear {
    clear: both;
}
.pictureArea {
    margin-bottom: 10px;
    background: #ffffff;
    .title {
        padding: 10px;
        font-size: 20px;
    }
    .statics {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        color: #666;
        .icon {
            color: @grayIcon;
        }
    }
}
.baseInfo {
    background: #ffffff;
    padding: 0 10px;
    .importantInfo {
        display: flex;
        justify-content: center;
        padding: 20px 0;
        border-bottom: 1px solid #f1f1f1;
        .item {
            flex-grow: 1;
            text-align: center;
            .label {
                margin-bottom: 5px;
                font-size: 12px;
                color: #999;
            }
            .value {
                color: @primary;
                font-size: 16px;
            }
        }
    }
    .info {
        padding: 20px 0;
        .infoItem {
            display: flex;
            vertical-align: top;
            box-sizing: border-box;
            .label {
                color: #666;
                width: 50px;
            }
            .value {
                flex: 1;
                color: #333;
            }
        }
    }
}
</style>
