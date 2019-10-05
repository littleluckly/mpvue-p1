<template>
    <div class="searchWrap">
        <div class="topBg">
            <img
                src="http://a4.qpic.cn/psb?/V10roI243u0y8c/nwynAqUCXy.4HI4WNqHEWKpA6HIBXE83dyUrZjujPK8!/m/dFMBAAAAAAAAnull&bo=OATPAjgEzwIRCT4!&rf=photolist&t=5"
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
                <navigator open-type="navigateBack" style="float:left;padding:0 10px;">
                    <i-icon type="return" size="18" />
                </navigator>搜索
            </div>
        </div>
        <!-- <div class="searchDrawer"> -->
        <div class="searchInputWrap">
            <input
                class="searchInput"
                v-bind:value="searchVal"
                v-on:input="handleChange"
                placeholder="请输入小区名称、地址、户型等"
                confirm-type="search"
                autofocus
                @confirm="handleSearch"
                maxlength="200"
            />
            <!-- @change="handleChange" -->
            <span @click="handleSearch" class="searchIcon">
                <i-icon type="search" size="18" />
            </span>
        </div>
        <div class="searchHistory">
            <p>搜索历史</p>
            <div class="itemWrap" :class="{showMore:history}">
                <span class="item">一房一厅</span>
                <span class="item">一房一厅</span>
                <span class="item">单间</span>
                <div class="showMoreBtn" @click="showMore('history')">
                    显示更多
                    <i-icon type="unfold"></i-icon>
                </div>
            </div>
        </div>
        <div class="hotSearch">
            <p>热门搜索</p>
            <div class="itemWrap" :class="{showMore:hotSearch}">
                <span class="item">单间</span>
                <span class="item">近地铁</span>
                <span class="item">南北通透</span>
                <div class="showMoreBtn" @click="showMore('hotSearch')">
                    显示更多
                    <i-icon type="unfold"></i-icon>
                </div>
            </div>
        </div>
        <!-- </div> -->
    </div>
</template>
<script>
import calcCapsulePosi from "@/mixins/calcCapsulePosi"
export default {
    mixins: [calcCapsulePosi],
    data() {
        return {
            history: false,
            hotSearch: false,
            searchval: ""
        }
    },
    methods: {
        showMore(type) {
            this[type] = true
        },
        handleChange(e) {
            this.searchval = e.mp.detail.value
        },
        handleSearch() {
            // console.log(999, this.searchval)
            wx.navigateTo({
                url: `./searchList/main?searchVal=${this.searchval}`
            })
        }
    }
}
</script>
<style lang="less">
@import "../../style/common";
// 侧滑抽屉内容
// .searchWrap {
// height: 100vh;
// padding: 20px;
// transition: left ease-in-out 500ms;
.searchWrap {
    // padding: 10px;
    height: 100vh;
    background: #fff;
    border-radius: 10px;
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
    .searchInputWrap {
        margin: 10px;
        position: relative;
        border: 1px solid #ccc;
        border-radius: 20px;
        .searchIcon {
            position: absolute;
            left: 0;
            top: -6px;
            line-height: 76rpx;
            padding: 0 10px;
            width: 20px;
            height: 20px;
            color: #999;
        }
    }
    .searchInput {
        padding-left: 30px;
        height: 30px;
    }
    .searchHistory,
    .hotSearch {
        margin: 10px;
        font-size: 12px;
        & > p {
            font-weight: bold;
            padding: 10px 0;
        }
        .itemWrap {
            max-height: 100px;
            overflow: hidden;
            position: relative;
            &.showMore {
                max-height: 100%;
                .showMoreBtn {
                    display: none;
                }
            }
            .item {
                display: inline-block;
                padding: 2px 10px;
                background: @graylightBg;
                border-radius: 15px;
                color: @grayText;
                margin-right: 10px;
                margin-bottom: 5px;
                white-space: nowrap;
            }
            .showMoreBtn {
                position: absolute;
                background: #fff;
                top: 84px;
                width: 100%;
                text-align: center;
                line-height: 18px;
                // margin-left: -30px;
            }
        }
    }
}
// }
</style>