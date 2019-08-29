<template>
    <div class="baikeWrap">
        <i-tabs :current="currTab" @change="handleTabChange">
            <i-tab key="what" title="什么是小产权"></i-tab>
            <i-tab key="usualQuestion" title="常见问题"></i-tab>
            <i-tab key="news" title="房产资讯"></i-tab>
        </i-tabs>
        <div class="baikeBody">
            <div v-show="currTab == 'what'" class="what">
                <p>
                    <span style="color:#666;">百度百科定义：</span>
                    <span style="font-size:28px;">小产权房</span>是指在农村集体土地上建设的房屋，未办理相关证件，未缴纳土地出让金等费用，其产权证不是由国家房管部门颁发，而是由乡政府或村颁发，亦称“乡产权房”。“小产权房”不是法律概念，是人们在社会实践中形成的一种约定俗成的称谓。购房合同在国土房管局不会给予备案。
                </p>
            </div>
            <div class="usualQuestion"></div>
            <div class="news"></div>
        </div>
        <Consult />
    </div>
</template>
<script>
import Consult from "@/components/consult"
export default {
    components: { Consult },
    data() {
        return {
            currTab: "what"
        }
    },
    methods: {
        linkTo(type) {
            console.log(type)
            wx.navigateTo({
                url: `./${type}/main`
            })
        },
        handleTabChange(ev) {
            console.log(ev)
            this.currTab = ev.mp.detail.key
        }
    }
}
</script>
<style lang="less">
@import "../../style/common";

.baikeWrap {
    color: #333;
    font-weight: normal;
    .baikeBody {
        padding: 10px;
    }
}
</style>