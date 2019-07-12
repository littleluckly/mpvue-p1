<template>
    <div class="smallHouse">
        <div class="swiperWrap">
            <swiper
                v-if="imgUrls.length > 0"
                :indicator-dots="indicatorDots"
                :autoplay="autoplay"
                :interval="interval"
                :duration="duration"
            >
                <block v-for="(item, index) in imgUrls" :key="index">
                    <swiper-item class="swiperItem">
                        <img :src="item.src" mode="scaleToFill" />
                        <p class="text">{{item.text}}</p>
                    </swiper-item>
                </block>
            </swiper>
        </div>
        <div class="baike">
            <div class="baikeTitle">
                <span>小产权房知识百科</span>
                <span>购房答疑</span>
            </div>
            <div class="baikeType">
                <div class="item" @click="linkTo('intro')">
                    <i-icon type="feedback" size="28" class="icon"></i-icon>
                    <p>小产权简介</p>
                </div>
                <div class="item" @click="linkTo('questionAndAnswer')">
                    <i-icon type="interactive" size="28" class="icon"></i-icon>
                    <p>问答</p>
                </div>
                <div class="item" @click="linkTo('news')">
                    <i-icon type="barrage" size="28" class="icon"></i-icon>
                    <p>资讯</p>
                </div>
                <div class="item" @click="linkTo('policy')">
                    <i-icon type="document" size="28" class="icon"></i-icon>
                    <p>政策</p>
                </div>
            </div>
        </div>
        <div class="listWrap">
            <div class="title">猜你喜欢</div>
            <!-- <div class="itemWrap"> -->
            <div class="item">
                <div class="thumb">
                    <img
                        src="http://a1.qpic.cn/psb?/V10roI243u0y8c/il58CIlDzx18S1xWVpiRyA7zVbMPE5RlQpsacu21lrE!/m/dLgAAAAAAAAAnull&bo=fAeoAwAAAAADB*I!&rf=photolist&t=5"
                        alt
                    />
                </div>
                <div class="info">
                    <p class="name">华侨新苑</p>
                    <p class="price">
                        <span class="type">村委楼</span>
                        <span>55万</span>
                    </p>
                    <p class="layoutWrap">
                        <span class="layout">三室</span>
                        <span class="area">99m</span>
                    </p>
                    <p class="tags">
                        <span>带花园</span>
                        <span>停车场</span>
                        <span>停车场</span>
                        <span>停车场</span>
                        <span>停车场</span>
                    </p>
                </div>
            </div>
            <!-- </div> -->
        </div>
    </div>
</template>

<script>
import { formatTime } from "@/utils/index"

export default {
    data() {
        return {
            indicatorDots: true,
            autoplay: true,
            interval: 3000,
            duration: 1000,
            logs: [],
            imgUrls: [
                {
                    src:
                        "http://a1.qpic.cn/psb?/V10roI243u0y8c/il58CIlDzx18S1xWVpiRyA7zVbMPE5RlQpsacu21lrE!/m/dLgAAAAAAAAAnull&bo=fAeoAwAAAAADB*I!&rf=photolist&t=5",
                    text: "农民房: 农村村民私人修建的房子",
                    type: "famerHouse"
                },
                {
                    src:
                        "http://a3.qpic.cn/psb?/V10roI243u0y8c/H9WCkTAw5Rj7TNJUc0Ah2uP.bGZXGd32hyaqkW1wgvA!/m/dLYAAAAAAAAAnull&bo=dQMPAgAAAAADB1k!&rf=photolist&t=5",
                    text: "村委房: 即村委统建楼，村里出资建的房子，规模大",
                    type: "villageHouse"
                },
                {
                    src:
                        "http://a1.qpic.cn/psb?/V10roI243u0y8c/d5972twaIy9qQL6NO.v00AC97aoVM6hAC3Y7wUc9Xac!/m/dLgAAAAAAAAAnull&bo=wQVVAwAAAAADB7A!&rf=photolist&t=5",
                    text:
                        "大红本房：整栋只有一本正规的房产证，没有独立的房产证",
                    type: "bigRedHouse"
                },
                {
                    src:
                        "http://a1.qpic.cn/psb?/V10roI243u0y8c/8eaubFVmbB0afD3l3ObHeioBIAhasz1FRC.3aocEWdk!/m/dDQBAAAAAAAAnull&bo=owVQAwAAAAADB9c!&rf=photolist&t=5",
                    text: "军产房: 军产房是指军队享有房屋所有权的房屋。",
                    type: "armyHouse"
                }
            ]
        }
    },

    created() {
        let logs
        if (mpvuePlatform === "my") {
            logs = mpvue.getStorageSync({ key: "logs" }).data || []
        } else {
            logs = mpvue.getStorageSync("logs") || []
        }
        this.logs = logs.map(log => formatTime(new Date(log)))
    },
    methods: {
        linkTo(type) {
            wx.navigateTo({ url: `./${type}/main` })
        }
    }
}
</script>

<style lang="less" scoped>
.smallHouse {
    height: 100vh;
    padding: 5px;
    background: #f2f2f2;
    font-size: 14px;
    .swiperWrap {
        margin-bottom: 10px;
        background: #fff;
        .swiperItem {
            position: relative;
            img {
                width: 100%;
            }
            .text {
                position: absolute;
                top: 50%;
                left: 0;
                right: 0;
                line-height: 24px;
                padding: 5px;
                text-align: center;
                font-weight: bold;
                color: #fff;
                background: rgba(0, 0, 0, 0.5);
                transform: translateY(-12px);
            }
        }
    }
    .baike {
        padding: 10px;
        background: #fff;
        margin-bottom: 10px;
        .baikeTitle {
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #f3f3f3;
            span:first-child {
                font-size: 18px;
                font-weight: bold;
                margin-right: 10px;
            }
            span:last-child {
                font-size: 12px;
                color: #666;
            }
        }
        .baikeType {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .item {
                flex-grow: 1;
                text-align: center;
                border-right: 1px solid #f2f2f2;
                &:last-child {
                    border-color: transparent;
                }
                .icon {
                    color: #666;
                }
            }
        }
    }
    .listWrap {
        padding: 10px;
        background: #ffffff;
        .title {
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #f3f3f3;
            font-weight: bold;
            font-size: 16px;
            color: #333;
        }
        .item {
            display: flex;
            .thumb {
                margin-right: 10px;
                width: 120px;
                img {
                    width: 100%;
                    height: 85px;
                }
            }
            .info {
                flex: 1;
                overflow: hidden;
                .price {
                    display: flex;
                    justify-content: space-between;
                    color: #eb5f00;
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
                        position: relative;
                        &::after {
                            content: "2";
                            transform: scale(0.5);
                            position: absolute;
                            top: -2px;
                        }
                    }
                }
                .tags {
                    font-size: 12px;
                    color: #fff;
                    overflow-x: auto;
                    white-space: nowrap;
                    span {
                        margin-right: 10px;
                        background: #1296db;
                        border-radius: 5px;
                        padding: 2px 5px;
                    }
                }
            }
        }
    }
}
</style>
