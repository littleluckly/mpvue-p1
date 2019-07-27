<template>
    <div class="FormWrap">
        <form @submit="formSubmit" @reset="formReset">
            <picker class="formItem section section_gap" @change="bindPickerChange" :value="index" :range="array">
                <view class="section__title">房源类型：</view>
                <view class="picker formVal">
                    <span name="houseType">{{array[index]||'请选择要发布的类型'}}</span>
                </view>
            </picker>
            <view class="formItem section section_gap">
                <view class="section__title">房源名称:</view>
                <input class="formVal" name="house_name" placeholder="请输入房源名称" />
            </view>

            <picker class="formItem" @change="bindPickerChange" :value="index" :range="region">
                <view class="section__title">所属行政区:</view>
                <view class="picker formVal">
                    <span name="houseType">{{region[index]||'请选择房源类型'}}</span>
                </view>
            </picker>
            <view class="formItem section section_gap">
                <view class="section__title">房源详细地址:</view>
                <textarea class="formVal" name="address" auto-height placeholder="请输入房源地址" />
            </view>
            <view class="formItem section section_gap">
                <view class="section__title">房源户型:</view>
                <input class="formVal" name="layout" placeholder="请输入房源的户型" />
            </view>
            <view class="section section_gap">
                <view class="section__title">radio</view>
                <radio-group name="radio-group">
                    <label>
                        <radio value="radio1" />radio1
                    </label>
                    <label>
                        <radio value="radio2" />radio2
                    </label>
                </radio-group>
            </view>
            <view class="section section_gap">
                <view class="section__title">checkbox</view>
                <checkbox-group name="checkbox">
                    <label>
                        <checkbox value="checkbox1" />checkbox1
                    </label>
                    <label>
                        <checkbox value="checkbox2" />checkbox2
                    </label>
                </checkbox-group>
            </view>
            <view class="btn-area">
                <button form-type="submit">Submit</button>
                <button form-type="reset">Reset</button>
            </view>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            index: null,
            array: ['出租', '出售'],
            region: ['罗湖区', '福田区', '南山区', '宝安区', '龙岗区', '龙华区', '盐田区', '坪山区']
        };
    },
    methods: {
        formSubmit: function(e) {
            console.log('form发生了submit事件，携带数据为：', e);
        },
        formReset: function() {
            console.log('form发生了reset事件');
        },
        bindPickerChange(e) {
            this.index = Number(e.mp.detail.value);
            console.log(e);
        }
    }
};
</script>
<style lang="less" scoped>
@import '../../../style/common.less';
.FormWrap {
    padding: 10px;
    input {
        font-size: 16px;
    }
    .formVal {
        color: @grayText;
        padding: 3px 0;
        border: 1px solid @graylightBg;
    }
    .formItem {
        margin-bottom: 10px;
    }
}
</style>

