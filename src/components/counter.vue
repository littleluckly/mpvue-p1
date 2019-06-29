<template>
    <div class="counter-warp">
        <p>Vuex counter：{{ num }}</p>
        <p>
            <button @click="increment">+</button>
            <button @click="decrement">-</button>
        </p>
        <div>
            <slot></slot>
        </div>
        <picker @change="bindPickerChange" :value="index" :range="array">
            <view class="picker">当前选择：{{array[index]}}</view>
        </picker>
        <radio-group class="radio-group" @change="radioChange">
            <label v-for="(item, index) in items" :key="item.name">
                <radio :value="item.name" :checked="item.checked" />
                {{item.value}}
            </label>
        </radio-group>
    </div>
</template>

<script>
export default {
    props: {
        initNum: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            num: this.initNum,
            index: 0,
            array: ['A', 'B', 'C'],
            items: [
                { name: 'USA', value: '美国' },
                { name: 'CHN', value: '中国', checked: 'true' },
                { name: 'BRA', value: '巴西' },
                { name: 'JPN', value: '日本' },
                { name: 'ENG', value: '英国' },
                { name: 'TUR', value: '法国' }
            ]
        }
    },
    methods: {
        increment() {
            this.num += 1
        },
        decrement() {
            this.num -= 1
        },
        bindPickerChange(e) {
            console.log(e)
            this.index = e.target.value
        },
        radioChange(e) {
            console.log('radio发生change事件，携带value值为：', e.target.value)
        }
    }
}
</script>

<style>
.counter-warp {
    text-align: center;
    margin-top: 100px;
}
.home {
    display: inline-block;
    margin: 100px auto;
    padding: 5px 10px;
    color: blue;
    border: 1px solid blue;
}
</style>
