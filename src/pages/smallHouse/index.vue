<template>
    <div class="smallHouse">
        <div class="searchInputWrap">
            <i-input
                i-class="searchInput"
                v-model="searchVal"
                placeholder="搜索好房"
                @change="handleChange"
                maxlength="200"
            />
            <span @click="handleSearch" class="searchIcon">
                <i-icon type="search" size="18" />
            </span>
        </div>
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
        <div class="baikeWrap">
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
        </div>
        <div class="listWrap">
            <div class="list">
                <div class="title">猜你喜欢</div>
                <SaleListItem
                    @linkTo="linkToDetail(item)"
                    v-for="(item,idx) in smallHouseList"
                    :key="item.name+idx"
                    :data="item"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { formatTime } from "@/utils/index"
import { mapActions } from "vuex"
import SaleListItem from "@/components/SaleListItem"
export default {
    components: {
        SaleListItem
    },
    data() {
        return {
            searchVal: "",
            indicatorDots: true,
            autoplay: true,
            interval: 3000,
            duration: 1000,
            logs: [],
            smallHouseList: [
                {
                    src:
                        "http://a1.qpic.cn/psb?/V10roI243u0y8c/il58CIlDzx18S1xWVpiRyA7zVbMPE5RlQpsacu21lrE!/m/dLgAAAAAAAAAnull&bo=fAeoAwAAAAADB*I!&rf=photolist&t=5",
                    name: "华侨新苑",
                    type: "村委楼",
                    price: 55,
                    layout: "三室",
                    decoraction: "简装",
                    area: 99,
                    tags: ["带花园", "停车场", "使用率高"]
                },
                {
                    src:
                        "http://a1.qpic.cn/psb?/V10roI243u0y8c/il58CIlDzx18S1xWVpiRyA7zVbMPE5RlQpsacu21lrE!/m/dLgAAAAAAAAAnull&bo=fAeoAwAAAAADB*I!&rf=photolist&t=5",
                    name: "大富豪花园",
                    type: "村委楼",
                    price: 125,
                    layout: "三室",
                    decoraction: "精装",
                    area: 112,
                    tags: ["使用率高", "高品质"]
                },
                {
                    src:
                        "http://a1.qpic.cn/psb?/V10roI243u0y8c/il58CIlDzx18S1xWVpiRyA7zVbMPE5RlQpsacu21lrE!/m/dLgAAAAAAAAAnull&bo=fAeoAwAAAAADB*I!&rf=photolist&t=5",
                    name: "宝安花园",
                    type: "村委楼",
                    price: 155,
                    layout: "三室",
                    decoraction: "毛坯",
                    area: 112,
                    tags: ["使用率高", "高品质"]
                },
                {
                    src:
                        "http://a1.qpic.cn/psb?/V10roI243u0y8c/il58CIlDzx18S1xWVpiRyA7zVbMPE5RlQpsacu21lrE!/m/dLgAAAAAAAAAnull&bo=fAeoAwAAAAADB*I!&rf=photolist&t=5",
                    name: "宝安花园",
                    type: "村委楼",
                    price: 130,
                    layout: "三室",
                    decoraction: "毛坯",
                    area: 112,
                    tags: ["使用率高", "高品质"]
                },
                {
                    src:
                        "http://a1.qpic.cn/psb?/V10roI243u0y8c/il58CIlDzx18S1xWVpiRyA7zVbMPE5RlQpsacu21lrE!/m/dLgAAAAAAAAAnull&bo=fAeoAwAAAAADB*I!&rf=photolist&t=5",
                    name: "宝安花园",
                    type: "村委楼",
                    price: 130,
                    layout: "三室",
                    decoraction: "毛坯",
                    area: 112,
                    tags: ["使用率高", "高品质"]
                }
            ],
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
    mounted() {},
    methods: {
        linkTo(type) {
            wx.navigateTo({ url: `./${type}/main` })
        },
        linkToDetail(data) {
            console.log("data", data)
            wx.navigateTo({ url: `./detail/main` })
        }
    }
}
</script>

<style lang="less">
@import "../../style/common";
.smallHouse {
    height: 100vh;
    padding: 0;
    background: @graylightBg;
    font-size: 14px;
    .searchInputWrap {
        position: relative;
        padding: 5px 10px;
        height: 110px;
        background: @primaryBg;
        .i-input {
            height: 30px;
        }
        .searchInput {
            height: 30px;
            padding: 0 15px;
            border-radius: 30px;
        }
        .searchIcon {
            padding: 10px;
            position: absolute;
            right: 5px;
            top: 0;
        }
    }
    .swiperWrap {
        margin-top: -75px;
        margin-bottom: 10px;
        // background: #fff;
        padding: 0 10px;
        position: relative;
        .swiperItem {
            border-radius: 10px;
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
    .baikeWrap {
        padding: 0 10px;
        margin-bottom: 10px;
        .baike {
            padding: 10px;
            background: #fff;
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
                    border-right: 1px solid @graylightBg;
                    &:last-child {
                        border-color: transparent;
                    }
                    .icon {
                        color: #666;
                    }
                }
            }
        }
    }
    .listWrap {
        padding: 0 10px;
        .list {
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
        }
    }
}
</style>
