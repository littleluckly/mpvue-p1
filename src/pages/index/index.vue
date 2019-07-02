<template>
    <div class="homepage">
        <div class="topWrap">
            <span class="logoText" :style="{backgroundImage:'url('+loggoText+')'}" @click="linkToWelcome"></span>
            <div class="searchInputWrap">
                <i-input i-class="searchInput" :value="value1" placeholder="搜索好房" @change="handleChange" maxlength="200" />
            </div>
            <i-icon class="searchIcon" type="search" size="18" />
        </div>

        <div class="dailyRecommend">
            <p class="dailyTitle">- 今日优选 -</p>
            <div class="dailyItemWrap">
                <div class="dailyItem">
                    <img src="https://pic1.ajkimg.com/display/58ajk/b094d6112bda9a33b1537b3192cb2450/240x180.jpg" />
                    <p class="houseLayout">一房一厅</p>
                    <p class="rent">1500元/月</p>
                </div>
                <div class="dailyItem">
                    <img src="https://pic1.ajkimg.com/display/58ajk/674ddbe8a7feb2e7e824fadb2a1d378f/240x180.jpg" />
                    <p class="houseLayout">一房一厅</p>
                    <p class="rent">1500元/月</p>
                </div>
                <div class="dailyItem">
                    <img src="https://pic1.ajkimg.com/display/58ajk/dad4e4b1319f5efb4b6228b089dc9847/240x180.jpg" />
                    <p class="houseLayout">一房一厅</p>
                    <p class="rent">1500元/月</p>
                </div>
            </div>
        </div>
        <div class="listWrap">
            <div class="resultWrap">
                <p class="listTitle">精选好房</p>
                <div class="listItemWrap">
                    <div class="thumbImg">
                        <img src="https://pic1.ajkimg.com/display/58ajk/4e03e814e16370e2de565b32d6177687/240x180.jpg" alt />
                    </div>
                    <div class="itemDesc">
                        <p class="mainDesc">
                            <span class="layout">1室</span>
                            <span class="divider">|</span>
                            <span class="area">16平</span>
                            <span class="divider">|</span>
                            <span class="address">龙岗</span>
                        </p>
                        <p class="houseName">博兴公寓</p>
                        <p class="priceDesc">
                            <span class="price">1300</span>
                            <span class="unit">元/月</span>
                            <span class="type">合租</span>
                        </p>
                        <p>龙岗坂田街道和平岗27号</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// Use Vuex
import store from './store'
import Counter from '@/components/counter'
import loggoText from '../../../static/images/logo_text.png'

export default {
    data() {
        return {
            value1: '',
            scrollTop: 0,
            loggoText: loggoText
        }
    },
    computed: {
        count() {
            return store.state.count
        }
    },
    methods: {
        handleChange(e) {
            // console.log(e, 1)
            console.log(e)
        },
        linkToWelcome() {
            wx.navigateTo({ url: '../welcome/main' })
        }
    },
    mounted() {
        console.log(this.$root.$mp.query)
    },
    //页面滚动执行方式
    onPageScroll(event) {
        console.log('scroll')
        this.scrollTop = event.scrollTop
    }
}
</script>

<style lang="less">
.homepage {
    font-size: 14px;
    .topWrap {
        display: flex;
        height: 60px;
        align-items: center;
        background: #5cadff;

        .searchInputWrap {
            flex: 1;
            height: 35px;
            overflow: hidden;
            border-radius: 7px;
            .searchInput {
                transform: translateY(-5px);
            }
        }
        .searchIcon {
            position: relative;
            left: -20px;
            top: 0;
        }
        .logoText {
            display: inline-block;
            height: 40px;
            width: 70px;
            background-size: contain;
            background-position: left 4px;
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
                background: #f2f2f2;
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
        .listItemWrap {
            display: flex;
            justify-content: center;
            height: 160px;
            .thumbImg {
                width: 33%;
                margin-right: 20px;
                img {
                    width: 100%;
                    height: 80px;
                }
            }
            .itemDesc {
                flex: 1;
                color: #666;
                .mainDesc {
                    font-size: 16px;
                    color: #333;
                    margin-bottom: 6px;
                    .divider {
                        padding: 0 8px;
                        color: #999;
                    }
                }
                .houseName {
                    margin-bottom: 1px;
                }
                .priceDesc {
                    .price {
                        font-size: 18px;
                        color: #eb5f00;
                        line-height: 15px;
                    }
                    .unit {
                        margin-right: 10px;
                        color: #eb5f00;
                    }
                }
            }
        }
    }
}
</style>
