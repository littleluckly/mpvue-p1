<template>
    <div class="homepage">
        <div class="topWrap">
            <!-- <span class="logoText" :style="{backgroundImage:'url('+loggoText+')'}" @click="linkToWelcome"></span> -->
            
            <!-- <span class="logoText" style="backgroundImage:url(/static/images/logo_text.png)" @click="linkToWelcome"></span> -->
            <span @click="linkToWelcome" class="logoText"><img src="/static/images/logo_text.png" alt=""></span>
            <div class="searchInputWrap">
                <i-input i-class="searchInput" v-model="searchVal" placeholder="搜索好房" @change="handleChange" maxlength="200" />
            </div>
            <span @click="handleSearch" class="searchIcon"><i-icon type="search" size="18" /></span>
        </div>

        <div class="dailyRecommend">
            <p class="dailyTitle">- 今日优选 -</p>
            <div class="dailyItemWrap">
                <div v-for="(item, idx) in dailyList" :key="idx" class="dailyItem">
                    <img :src="item.thumbImg" />
                    <p class="houseLayout">{{item.houseLayout}}</p>
                    <p class="rent">{{item.rent}}元/月</p>
                </div>
            </div>
        </div>
        <div class="listWrap">
            <div class="resultWrap">
                <p class="listTitle">精选好房</p>
                <div v-for="(item,idx) in list" :key="item.address+idx" class="listItem" @click="showHouseDetail(item)">
                    <div class="thumbImg">
                        <img :src="item.thumbImg" alt />
                    </div>
                    <div class="itemDesc">
                        <p class="mainDesc">
                            <span class="layout">{{item.layout}}</span>
                            <span class="divider">|</span>
                            <span class="area">{{item.area}}</span>
                            <span class="divider">|</span>
                            <span class="address">{{item.location}}</span>
                        </p>
                        <p class="houseName">{{item.houseName}}</p>
                        <p class="priceDesc">
                            <span class="price">{{item.price}}</span>
                            <span class="unit">元/月</span>
                            <span class="type">{{item.type}}</span>
                        </p>
                        <p class="address">{{item.address}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script> 
import store from './store' 
import loggoText from '../../../static/images/logo_text.png'

export default {
    data() {
        return {
            searchVal: '',
            scrollTop: 0,
            loggoText: loggoText,
            dailyList: [
                {
                    thumbImg: 'https://pic1.ajkimg.com/display/58ajk/b094d6112bda9a33b1537b3192cb2450/240x180.jpg',
                    houseLayout: '一房一厅',
                    rent: '1800'
                },
                {
                    thumbImg: 'https://pic1.ajkimg.com/display/58ajk/674ddbe8a7feb2e7e824fadb2a1d378f/240x180.jpg',
                    houseLayout: '两房一厅',
                    rent: '800'
                },
                {
                    thumbImg: 'https://pic1.ajkimg.com/display/58ajk/dad4e4b1319f5efb4b6228b089dc9847/240x180.jpg',
                    houseLayout: '单间',
                    rent: '670'
                }
            ],
            list: [
                {
                    id: 1,
                    thumbImg: 'https://pic1.ajkimg.com/display/58ajk/4e03e814e16370e2de565b32d6177687/240x180.jpg',
                    layout: '单间',
                    area: '16平',
                    location: '龙岗',
                    houseName: '博兴公寓',
                    price: 1300,
                    type: '整租',
                    address: '龙岗坂田街道和平岗27号'
                },
                {
                    id: 2,
                    thumbImg: 'https://pic1.ajkimg.com/display/58ajk/4e03e814e16370e2de565b32d6177687/240x180.jpg',
                    layout: '单间',
                    area: '19平',
                    location: '龙华',
                    houseName: '小苹果',
                    price: 800,
                    type: '整租',
                    address: '龙华新区陶吓新村'
                },
                {
                    id: 3,
                    thumbImg: 'https://pic1.ajkimg.com/display/58ajk/4e03e814e16370e2de565b32d6177687/240x180.jpg',
                    layout: '单间',
                    area: '12平',
                    location: '龙华',
                    houseName: '天安云谷',
                    price: 750,
                    type: '合租',
                    address: '龙岗区坂田街道天安云谷产业园2期2栋'
                }
            ]
        }
    },
    computed: {
        count() {
            return store.state.count
        }
    },
    methods: {
        handleChange({target:{detail:{value}}}) {
            // console.log(e, 1)
            console.log(value)
            this.searchVal = value
        },
        linkToWelcome() {
            wx.navigateTo({ url: '../welcome/main' })
        },
        showHouseDetail(item) {
            wx.navigateTo({ url: `../houseDetail/main?id=${item.id}` })
        },
        handleSearch(){
            console.log('搜索',this.searchVal)
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
                padding-right: 10px;
            }
        }
        .searchIcon {
            position: relative;
            left: -30px;
            top: 0;
            line-height:38px;
            padding:0 5px;

        }
        .logoText {
            display: inline-block;
            height: 40px;
            width: 70px;
            background-size: contain;
            background-position: left 4px;
            img{
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
                    font-size: 16px;
                    color: #333;
                    margin-bottom: 2px;
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
                .address{
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }
}
</style>
