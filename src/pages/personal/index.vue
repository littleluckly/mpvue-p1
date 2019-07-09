<template>
    <div class="personal">
        <div class="userInfo">
            <div class="avtar">头像</div>
            <div class="info"></div>
        </div>
        <div class="content">
            <ul>
                <li><span class="itemIcon"><i-icon type="tasklist_fill" size="24"/></span> 收藏</li>
                <li><span class="itemIcon"><i-icon type="like_fill"  size="24"/></span>关注</li>
                <li><span class="itemIcon"><i-icon type="accessory"  size="24"/></span>历史记录</li> 
            </ul>
        </div>
        <div class="footer">
            退出登录
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value1: ''
        }
    },
    computed: {},
    methods: {},
    mounted() {}
}
</script>

<style lang="less" scoped>
page{
    padding: 10px;
    background: #f2f2f2;
}
.personal{
    height: 100vh;
    padding:5px;
    background: #f2f2f2;
    font-size: 14px;
}
.userInfo{
    margin-bottom: 10px;
    background: #fff;
}
.content{
    margin-bottom: 10px;
    background: #fff;
}
.footer{
    background: #fff;
    text-align: center;
    line-height: 40px;
}
</style>
