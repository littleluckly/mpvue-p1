<template>
    <div>
        <counter :initNum="100">
            <i-button type="primary">这是一个按钮</i-button>
        </counter>
        <i-button @click="toWelcome" type="info">to welcom</i-button>
    </div>
</template>

<script>
// Use Vuex
import store from './store'
import card from '@/components/card'
import Counter from '@/components/counter'

export default {
    components: { card, Counter },
    data() {
        return {
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
    computed: {
        count() {
            return store.state.count
        }
    },
    methods: {
        increment() {
            store.commit('increment')
        },
        decrement() {
            store.commit('decrement')
        },
        bindPickerChange(e) {
            console.log(e)
            this.index = e.target.value
        },
        radioChange(e) {
            console.log('radio发生change事件，携带value值为：', e.target.value)
        },
        toWelcome() {
            const url = '../index/main'
            mpvue.navigateTo({ url })
        }
    },
    mounted() {
        console.log(this.$root.$mp.query)
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
