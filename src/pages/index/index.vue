<template>
    <div class="homepage">
        <!-- 首页普通内容 -->
        <div class="normalWrap">
            <div class="topBg">
                <img
                    src="http://a3.qpic.cn/psb?/V10roI243u0y8c/ddehqkdpUBzJLY4cs.JsZJ8beLjHqUaSs.AtDPm8.rc!/m/dAYBAAAAAAAAnull&bo=NQQqAjUEKgIRCT4!&rf=photolist&t=5"
                    height="180px"
                    alt
                />
                <img
                    class="wave"
                    src="https://raw.githubusercontent.com/weilanwl/ColorUI/master/demo/images/wave.gif"
                    alt
                />
                <div
                    v-bind:style="{ textAlign:'center', color:'white',position:'absolute', fontSize:'14px',top: top + 'px', height:height+'px',width:'100%', lineHeight:height+'px' }"
                >
                    <i-icon type="homepage" />首页
                </div>
            </div>
            <div class="topWrap">
                <!-- <span @click="linkToWelcome" class="logo">
                    <img src="/static/images/logo.png" alt />
                </span>-->
                <p
                    @click="linkToSearch"
                    style="flex:1;height:30px;line-height:30px;border:1px solid #f2f2f2;color:#666;border-radius:30px;padding-left:10px;background:#fff;"
                >搜索好房</p>
                <span @click="handleSearch" class="searchIcon">
                    <i-icon type="search" size="18" color="#666" />
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
            <div class="listWrap">
                <div class="resultWrap">
                    <p class="listTitle">精选好房</p>

                    <SaleListItem
                        @linkTo="linkToDetail(item)"
                        v-for="(item,idx) in saleList"
                        :key="item.name+idx"
                        :data="item"
                    />
                </div>
            </div>
        </div>
        <Consult />
    </div>
</template>

<script>
// import store from '@/stores/index'
import { mapActions, mapState } from "vuex"
import calcCapsulePosi from "@/mixins/calcCapsulePosi"
import SaleListItem from "@/components/SaleListItem"
import Consult from "@/components/consult"
import request from "@/utils/request"
export default {
    mixins: [calcCapsulePosi],
    components: { SaleListItem, Consult },
    data() {
        return {
            searchVal: "",
            history: false,
            hotSearch: false,
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
    computed: {
        ...mapState({
            rentRecommendList: state => state.rentStore.rentRecommendList
        }),
        ...mapState("saleStore/", ["saleList"])
    },
    onLoad() {},
    onShow() {
        // wx.pageScrollTo({
        //     scrollTop: 0
        // })
    },
    onHide() {},
    created() {},
    methods: {
        ...mapActions("saleStore/", ["fetchSaleList"]),
        handleChange({
            map: {
                target: {
                    detail: { value }
                }
            }
        }) {
            console.log(value)
            this.searchVal = value
        },
        linkToSearch() {
            wx.navigateTo({
                url: "../search/main"
            })
        },
        linkToWelcome() {
            wx.navigateTo({ url: "../welcome/main" })
        },
        linkToDetail(data) {
            console.log("data", data)
            wx.navigateTo({
                url: `./detail/main?id=${data.id}`
            })
        },
        showHouseDetail(item) {
            console.log("item", item, 2233)
            wx.navigateTo({
                url: `./houseDetail/main?id=${
                    item._id
                }&name=${item.house_name || ""}`
            })
        },
        handleSearch(e) {
            const value = e.target ? e.target.value : this.searchVal
            wx.navigateTo({
                url: `./rentSearchList/main?searchVal=${value || ""}`
            })
        },
        showMore(type) {
            this[type] = true
        },
        handleUser() {
            wx.request({
                url: "https://localhost:9527/api/test",
                success: function(c) {
                    console.log("c", c)
                }
            })
        }
    },
    mounted() {
        this.fetchSaleList()
    },
    //页面滚动执行方式
    onPageScroll(event) {
        console.log("scroll")
        this.scrollTop = event.scrollTop
    }
}
</script>

<style lang="less">
@import "../../style/common";
.homepage {
    font-size: 14px;
    position: relative;
    top: 0;
    bottom: -60px;
    height: 100vh;
    background: linear-gradient(to bottom, #8fd3f4, #84fab0);
    .searchInputWrap {
        flex: 1;
        height: 35px;
        overflow: hidden;
        border-radius: 7px;
        .searchInput {
            height: 38px;
            padding-left: 30px;
            line-height: 38px;
        }
    }
    // 普通内容
    .normalWrap {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        transition: all ease-in-out 500ms;
        width: 100%;
        background: #fff;
        .topBg {
            position: relative;
            img {
                height: 180px;
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
        .mask {
            display: none;
            position: absolute;
            height: 100vh;
            width: 100%;
            background: transparent;
        }
        .topWrap {
            position: relative;
            padding: 10px;
            .searchIcon {
                position: absolute;
                right: 15px;
                top: 10px;
                line-height: 30px;
                padding: 0 8px;
            }
            .logo {
                display: inline-block;
                padding: 0 5px;
                height: 40px;
                width: 40px;
                background-size: contain;
                background-position: left 4px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .dailyRecommend {
            .dailyTitle {
                position: relative;
                text-align: center;
                padding: 10px;
                &::after {
                    position: absolute;
                    right: 0;
                    width: 20px;
                    height: 2px;
                    background: #eee;
                }
                &::before {
                    width: 20px;
                    height: 2px;
                    background: #eee;
                }
            }
            .dailyItemWrap {
                display: flex;
                justify-content: center;
                padding: 0 10px;
                margin-bottom: 10px;
                .dailyItem {
                    width: 33%;
                    margin-right: 10px;
                    padding-bottom: 6px;
                    height: 120px;
                    background: @graylightBg;
                    &:last-child {
                        margin-right: 0;
                    }
                    img {
                        width: 100%;
                        height: 80px;
                    }
                    .houseLayout {
                        color: #666;
                        text-align: center;
                    }
                    .rent {
                        text-align: center;
                        color: #333;
                    }
                }
            }
        }
        .listWrap {
            padding: 10px;
            .listTitle {
                font-size: 18px;
                color: #333;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .listItem {
                display: flex;
                justify-content: center;
                margin-bottom: 10px;
                // height: 165px;
                .thumbImg {
                    width: 112px;
                    margin-right: 20px;
                    img {
                        width: 100%;
                        height: 80px;
                    }
                }
                .itemDesc {
                    flex: 1;
                    color: #666;
                    // 配合.address文字超长省略
                    overflow: hidden;
                    .mainDesc {
                        font-size: 14px;
                        color: #333;
                        margin-bottom: 2px;
                    }
                    .houseName {
                        font-size: 16px;
                        margin-bottom: 1px;
                    }
                    .priceDesc {
                        .price {
                            font-size: 18px;
                            color: @primary;
                            line-height: 15px;
                        }
                        .unit {
                            margin-right: 10px;
                            color: @primary;
                        }
                    }
                    .address {
                        .textOverflow;
                    }
                }
            }
        }
    }

    .swiperWrap {
        margin-top: 10px;
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
}
</style>
