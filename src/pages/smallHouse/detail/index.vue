<template>
    <div class="smallHouseDetail">
        <div class="pictureArea">
            <swiper
                class="swiper"
                :indicator-dots="indicatorDots"
                :autoplay="autoplay"
                :interval="interval"
                :duration="duration"
            >
                <block v-for="(item, index) in imgList" :key="index">
                    <swiper-item class="swiperItem">
                        <image :src="item.src" class="slide-image" mode="aspectFill" />
                        <div class="videoBtn" v-if="item.type=='video'">
                            <i-icon type="playon" size="56"></i-icon>
                        </div>
                    </swiper-item>
                </block>
            </swiper>
            <div>
                <p class="title">6号线坂雪岗站，精装修，拎包入住，舒适干净整洁，随时入住</p>

                <div class="tagsWrap">
                    <p class="tags">
                        <i-tag
                            v-for="tag in houseInfo.tags"
                            :key="tag"
                            class="i-tags"
                            type="border"
                            color="red"
                        >{{tag}}</i-tag>
                    </p>
                    <span class="icon">
                        <i-icon type="collection" size="22" />收藏
                    </span>
                </div>
            </div>
        </div>
        <div class="baseInfo">
            <p class="baseInfoTitle">基本信息</p>
            <div class="importantInfo">
                <div class="item">
                    <p class="label">户型</p>
                    <p class="value">1室1厅1卫</p>
                </div>
                <div class="item">
                    <p class="label">总价</p>
                    <p class="value">135万</p>
                </div>
            </div>
            <div class="info">
                <div class="infoItem">
                    <p class="label">小区：</p>
                    <p class="value">宝安花园</p>
                </div>
                <div class="infoItem">
                    <p class="label">面积：</p>
                    <p class="value">
                        约55
                        <span class="square"></span>
                    </p>
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
        <div class="mapWrap">
            <p class="mapTitle">地理位置</p>

            <map
                id="myMap"
                style="width: 100%; height: 200px;"
                :latitude="latitude"
                :longitude="longitude"
                :markers="markers"
                :covers="covers"
                show-location
            ></map>

            <i-button @click="includePoints">缩放</i-button>
        </div>
        <div class="consult">
            <i-icon type="collection" size="36" />
            <i-cion type="customerservice" size="48" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            mapCtx: null,
            indicatorDots: true,
            autoplay: false,
            interval: 3000,
            duration: 500,
            value1: "",
            imgList: [
                {
                    src:
                        "https://pic5.58cdn.com.cn/anjuke_58/cc29706ea6857b65dab56f9f67add4c6?w=640&h=480&crop=1",
                    type: "video"
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
            ],
            houseInfo: {
                tags: [
                    "带花园",
                    "停车场",
                    "使用率高",
                    "使用率高",
                    "使用率高",
                    "使用率高",
                    "使用率高",
                    "使用率高"
                ]
            },
            latitude: 23.099994,
            longitude: 113.32452,
            markers: [
                {
                    id: 1,
                    latitude: 23.099994,
                    longitude: 113.32452,
                    name: "T.I.T 创意园"
                }
            ],
            covers: [
                {
                    latitude: 23.099994,
                    longitude: 113.34452,
                    iconPath: "/static/images/phone.png"
                },
                {
                    latitude: 23.099994,
                    longitude: 113.30452,
                    iconPath: "/static/images/phone.png"
                }
            ]
        }
    },
    computed: {},
    methods: {
        includePoints: function() {
            this.mapCtx.includePoints({
                padding: [10],
                points: [
                    {
                        latitude: 23.10229,
                        longitude: 113.3345211
                    },
                    {
                        latitude: 23.00229,
                        longitude: 113.3345211
                    }
                ]
            })
        }
    },
    mounted() {
        this.mapCtx = wx.createMapContext("myMap")
    }
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
    padding-bottom: 10px;
    background: #ffffff;
    .slide-image {
        width: 100%;
    }
    .title {
        padding: 10px;
        font-size: 20px;
    }
    .tagsWrap {
        display: flex;
        line-height: 26px;
        .tags {
            flex: 1;
            font-size: 12px;
            padding: 0 10px;
            &::-webkit-scrollbar {
                display: none;
            }
            .i-tags {
                margin-right: 5px;
            }
        }
        .icon {
            width: 60px;
            margin-right: 10px;
            color: @grayIcon;
        }
    }
    .swiperItem {
        position: relative;
        .videoBtn {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-24px) translateY(-24px);
            color: #ffffff;
        }
    }
}

.baseInfo {
    background: #ffffff;
    padding: 0 10px;
    margin-bottom: 10px;
    .baseInfoTitle {
        padding-top: 10px;
        font-size: 16px;
        font-weight: bold;
    }
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
.mapWrap {
    background: #fff;
    padding: 10px;
    .mapTitle {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
    }
}
.consult {
    position: fixed;
    bottom: 60px;
    right: 15px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    color: @primary;
    z-index: 10;
}
</style>
