// 获取右上角胶囊按钮的坐标
const myMixin = {
    data() {
        return {
            top: 0,
            height: 0,
        }
    },
    created() {
        // 获取右上角胶囊按钮的位置信息,
        const position = wx.getMenuButtonBoundingClientRect()
        const { top, height } = position
        console.log('top', top, height)
        this.top = Math.floor(top)
        this.height = Math.floor(height)
    }
}
export default myMixin;