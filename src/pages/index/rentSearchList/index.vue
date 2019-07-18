<template>
    <div class="rentSearchList">
        <div class="topWrap" v-bind:style="{ paddingTop: top + 'px',height: height + 'px' }">
            <div class="back" @click="backTo">
                <i-icon type="return" size="24" color="#fff;" @click="backTo"></i-icon>
            </div>
            <div class="title">搜索列表</div>
        </div>
        <div class="searchInputWrap">
            <input
                class="searchInput"
                v-model="searchVal"
                placeholder="请输入小区名称、地址、户型等"
                confirm-type="search"
                @confirm="handleSearch"
                maxlength="200"
            />
            <span @click="handleSearch" class="searchIcon">
                <i-icon type="search" size="18" />
            </span>
        </div>
        <div class="filterArea">
            <div class="filterType">
                区域
                <i-icon type="unfold"></i-icon>
            </div>
            <div class="filterType">
                价格
                <i-icon type="unfold"></i-icon>
            </div>
            <div class="filterType">
                户型
                <i-icon type="unfold"></i-icon>
            </div>
            <div class="filterType">
                个人
                <i-icon type="unfold"></i-icon>
            </div>
        </div>
        <div class="resultArea">
            <div
                v-for="(item,idx) in homepageList"
                :key="item.address+idx"
                class="listItem"
                @click="showHouseDetail(item)"
            >
                <div class="thumbImg">
                    <img :src="item.thumbImg" alt />
                </div>
                <div class="itemDesc">
                    <p class="mainDesc">
                        <span class="layout sperator">{{item.layout}}</span>
                        <span class="area sperator">
                            <span>{{item.area}}</span>
                            <span class="square"></span>
                        </span>
                        <span class="address">{{item.location}}</span>
                    </p>
                    <p class="houseName">{{item.house_name}}</p>
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
</template>
<script>
import calcCapsulePosi from "@/mixins/calcCapsulePosi"
import store from "@/stores/index"
export default {
    mixins: [calcCapsulePosi],
    data() {
        searchVal: ""
    },
    created() {
        store.dispatch("fetchHomepageList")
    },
    onUnload() {
        console.log("onUnload")
        // store.commit("drawerVisible", false)
    },
    computed: {
        homepageList() {
            return store.state.homepageList
        }
    },
    methods: {
        backTo() {
            wx.switchTab({ url: "../main" })
        },
        handleSearch() {}
    }
}
</script>
<style lang="less">
@import "../../../style/common.less";
.rentSearchList {
    height: 100vh;
    background: @graylightBg;
    .topWrap {
        width: 100%;
        padding-bottom: 10px;
        background: @primaryBg;
        .back {
            float: left;
            padding: 0 10px;
        }
        .title {
            color: #fff;
            text-align: center;
        }
    }
    .searchInputWrap {
        background: @primaryBg;
        padding: 0 10px 10px 10px;
        position: relative;
        .searchIcon {
            position: absolute;
            left: 20px;
            top: -5px;
            line-height: 76rpx;
            padding: 0 10rpx;
        }
        .searchInput {
            font-size: 12px;
            background: #fff;
            border-radius: 20px;
            border: 1px solid #ccc;
            height: 30px;
            line-height: 30px;
            padding-left: 30px;
        }
    }
    .filterArea {
        display: flex;
        justify-content: space-around;
        padding: 10px;
        background: #fff;
        color: @grayText;
        font-size: 14px;
        .filterType {
            flex-grow: 1;
            text-align: center;
        }
    }
    .resultArea {
        margin-top: 10px;
        background: #fff;
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
                }
                .houseName {
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
</style>
