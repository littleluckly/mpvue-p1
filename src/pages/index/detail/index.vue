<template>
    <div class="homePageWrap">
        <div class="topBg">
            <img
                src="http://a2.qpic.cn/psb?/V10roI243u0y8c/RM7FnlgDjuVx0O*cIyKmaPaAaC1tDA3Sf3YHFQX3LzA!/m/dAUBAAAAAAAAnull&bo=0ALgAQAAAAARBwM!&rf=photolist&t=5"
                height="180px"
                alt
            />
            <img
                class="wave"
                src="https://raw.githubusercontent.com/weilanwl/ColorUI/master/demo/images/wave.gif"
                alt
            />
            <div
                v-bind:style="{ textAlign:'center', color:'white',position:'absolute', fontSize:'14px',top: top + 'px', height:height+'px',width:'100%', lineHeight:height+'px', fontWeight:'bold' }"
            >
                <navigator
                    open-type="navigateBack"
                    style="float:left;padding:0 10px;font-weight:bold;background:rgba(0,0,0,0.1);"
                >
                    <i-icon type="return" size="20" />
                </navigator>详情
            </div>
        </div>
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
                        <video
                            v-if="item.type=='video'"
                            :initial-time="1"
                            :enable-play-gesture="true"
                            object-fit="contain"
                            controls
                            class="myVideo"
                            src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
                        ></video>
                        <image
                            v-else
                            :src="item.src"
                            class="slide-image"
                            mode="aspectFill"
                            @click="previewImg(item.src)"
                        />
                        <!-- <div class="videoBtn" v-if="item.type=='video'">
                            <i-icon type="playon" size="56"></i-icon>
                        </div>-->
                    </swiper-item>
                </block>
            </swiper>
            <div>
                <p class="title">{{saleDetail.name}}</p>

                <div class="tagsWrap">
                    <p class="tags">
                        <i-tag
                            v-for="tag in tags"
                            :key="tag"
                            class="i-tags"
                            type="border"
                            color="red"
                        >{{tag}}</i-tag>
                    </p>
                    <span
                        class="icon"
                        :class="{focus:saleDetail.focus==1}"
                        @click="handleFocusSale({focus:!(saleDetail.focus==1), id:saleDetail.id})"
                    >
                        <i-icon
                            :type="saleDetail.focus==1?'collection_fill':'collection'"
                            :color="saleDetail.focus==1?'#eb5f00':'#999'"
                            size="22"
                        />收藏
                    </span>
                </div>
            </div>
        </div>
        <div class="baseInfo">
            <p class="baseInfoTitle">基本信息</p>
            <div class="importantInfo">
                <div class="item">
                    <p class="label">户型</p>
                    <p class="value">{{saleDetail.layout}}</p>
                </div>
                <div class="item">
                    <p class="label">总价</p>
                    <p class="value">{{saleDetail.price}}万</p>
                </div>
                <div class="item">
                    <p class="label">类型</p>
                    <p class="value">{{saleDetail.type}}</p>
                </div>
            </div>
            <div class="info">
                <!-- <div class="infoItem">
                    <p class="label">小区：</p>
                    <p class="value">{{saleDetail.layout}}</p>
                </div>-->
                <div class="infoItem">
                    <p class="label">单价：</p>
                    <p class="value">
                        {{saleDetail.unit_price}} /
                        <span class="square"></span>
                    </p>
                </div>
                <div class="infoItem">
                    <p class="label">面积：</p>
                    <p class="value">
                        {{saleDetail.area}}
                        <span class="square"></span>
                    </p>
                </div>
                <div class="infoItem">
                    <p class="label">装修：</p>
                    <p class="value">{{saleDetail.decoration}}</p>
                </div>
                <div class="infoItem">
                    <p class="label">电梯：</p>
                    <p class="value">{{saleDetail.elevator?"有":"无"}}</p>
                </div>
                <div class="infoItem">
                    <p class="label">朝向：</p>
                    <p class="value">{{saleDetail.orientation}}</p>
                </div>
                <div class="infoItem">
                    <p class="label">年代：</p>
                    <p class="value">{{saleDetail.year}}年</p>
                </div>
                <div class="infoItem">
                    <p class="label">楼层：</p>
                    <p class="value">{{saleDetail.floor}}/{{saleDetail.floor_total}}</p>
                </div>
                <!-- <div class="infoItem">
                    <p class="label">付款：</p>
                    <p class="value">押一付一</p>
                </div>-->
            </div>
        </div>
        <div class="mapWrap">
            <p class="mapTitle">
                地理位置
                <span
                    style="font-weight:normal;font-size:12px;color:#999;"
                >实际位置可能存在细微偏差，请联系客服实地看房</span>
            </p>

            <map
                id="myMap"
                style="width: 100%; height: 200px;"
                :latitude="saleDetail.latitude"
                :longitude="saleDetail.longitude"
                :markers="markers"
                show-location
                @click="handleClickMap"
            ></map>
            <!-- :covers="covers" -->

            <!-- <i-button @click="includePoints">缩放</i-button> -->
        </div>
        <Consult />
        <!-- <cover-view class="consult">
            <cover-image class="img" src="/static/images/consult.png" />
            <button open-type="contact" class="consultBtn">客服</button>
        </cover-view>-->
    </div>
</template>

<script>
import calcCapsulePosi from "@/mixins/calcCapsulePosi"
import Consult from "@/components/consult"
import QQMapWX from "../../../utils/qqmap-wx-jssdk.min.js"
import { mapActions, mapState } from "vuex"
// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: "IHIBZ-EPZRS-A7VOO-6OXF6-BEVN7-7EFMU" // 必填
})
export default {
    mixins: [calcCapsulePosi],
    components: { Consult },
    data() {
        return {
            mapCtx: null,
            indicatorDots: true,
            autoplay: false,
            interval: 3000,
            duration: 500,
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
            ]
        }
    },
    onLoad(query = {}) {
        var that = this
        const { id } = query
        wx.getStorage({
            key: "userInfo",
            success(res) {
                const { openid } = res.data
                that.fetchSaleDetail({ id, open_id: openid })
            }
        })
    },
    computed: {
        ...mapState("saleStore/", ["saleDetail"]),
        imgSrcList() {
            return this.imgList.map(item => item.src)
        },
        tags() {
            return this.saleDetail.tags_name
                ? this.saleDetail.tags_name.split(",")
                : []
        },
        markers() {
            const { latitude, longitude } = this.saleDetail
            return [
                {
                    id: 1,
                    latitude,
                    longitude
                }
            ]
        }
    },
    methods: {
        ...mapActions("saleStore/", ["fetchSaleDetail", "focusSale"]),
        previewImg(src) {
            wx.previewImage({
                current: src,
                urls: this.imgSrcList
            })
        },
        handleFocusSale({ focus, id }) {
            const that = this
            wx.getStorage({
                key: "userInfo",
                success(res) {
                    const { openid } = res.data
                    that.focusSale({ focus, id, open_id: openid })
                }
            })
        },
        handleClickMap() {
            console.log("map")
            const { latitude, longitude } = this.saleDetail
            wx.navigateTo({
                url: `../map/main?latitude=${latitude}&longitude=${longitude}`
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
.homePageWrap {
    .topBg {
        position: relative;
        img {
            height: 120px;
            width: 100%;
        }
        .wave {
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            z-index: 99;
            mix-blend-mode: screen;
            height: 50px;
        }
    }
    .pictureArea {
        margin-bottom: 10px;
        padding-bottom: 10px;
        background: #ffffff;
        .myVideo {
            width: 100%;
            height: 100%;
        }
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
                &.focus {
                    color: @primary;
                }
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
                border-bottom: 1px solid #f9f9f9;
                padding-bottom: 5px;
                margin-bottom: 5px;
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
}
</style>
