<template>
    <div class="collection">
        <div class="listWrap">
            <div class="resultWrap">
                <SaleListItem
                    @linkTo="linkToDetail(item)"
                    v-for="(item,idx) in historyList"
                    :key="item.name+idx"
                    :data="item"
                />
            </div>
        </div>
    </div>
</template>

<script>
import SaleListItem from "@/components/SaleListItem"
import { mapActions, mapState } from "vuex"
export default {
    components: { SaleListItem },
    data() {
        return {}
    },
    onLoad() {
        const that = this
        wx.getStorage({
            key: "userInfo",
            success(res) {
                that.fetchBrowseHistoryList({ open_id: res.data.openid })
            }
        })
    },
    computed: {
        ...mapState("personalStore/", ["historyList"])
    },
    methods: {
        ...mapActions("personalStore/", ["fetchBrowseHistoryList"]),
        ...mapActions("saleStore/", ["saveBrowseHistory"]),
        linkToDetail(data) {
            const that = this
            // 保存浏览记录
            wx.getStorage({
                key: "userInfo",
                success(res) {
                    that.saveBrowseHistory({
                        sale_id: data.id,
                        open_id: res.data.openid
                    })
                }
            })
            wx.navigateTo({
                url: `../index/detail/main?id=${data.id}`
            })
        }
    }
}
</script>
 
 <style lang="less" scoped>
@import "../../style/common";
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
</style>