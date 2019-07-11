<template>
    <div class="smallHouse">
        <div class="swiperWrap">
            <swiper v-if="imgUrls.length > 0" indidator-dots="imgUrls.length > 1">
                <block v-for="(item, index) in imgUrls" :key="index">
                    <swiper-item>
                        <img :src="item" mode="scaleToFill" />
                    </swiper-item>
                </block>
            </swiper>
        </div>
        <div class="baike">
            <div class="baikeTitle">
                <span>小产权房知识百科</span>
                <span>专业购房全攻略</span>
            </div>
            <div class="baikeType">
                <div class="item">
                    <i-icon type="feedback" size="28" class="icon"></i-icon>
                    <p>定义</p>
                </div>
                <div class="item">
                    <i-icon type="interactive" size="28" class="icon"></i-icon>
                    <p>问答</p>
                </div>
                <div class="item">
                    <i-icon type="barrage" size="28" class="icon"></i-icon>
                    <p>资讯</p>
                </div>
                <div class="item">
                    <i-icon type="financial_fill" size="28" class="icon"></i-icon>
                    <p>贷款</p>
                </div>
                <div class="item">
                    <i-icon type="document" size="28" class="icon"></i-icon>
                    <p>政策</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { formatTime } from "@/utils/index"

export default {
    data() {
        return {
            logs: [],
            imgUrls: [
                "http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/newsPicture/05558951-de60-49fb-b674-dd906c8897a6",
                "http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/coursePicture/0fbcfdf7-0040-4692-8f84-78bb21f3395d",
                "http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/management-school-picture/7683b32e-4e44-4b2f-9c03-c21f34320870"
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
    }
}
</script>

<style lang="less">
.smallHouse {
    height: 100vh;
    padding: 5px;
    background: #f2f2f2;
    font-size: 14px;
    .swiperWrap {
        margin-bottom: 10px;
        background: #fff;
    }
    .baike {
        padding: 10px;
        background: #fff;
        .baikeTitle {
            margin-bottom: 10px;
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
}
</style>
