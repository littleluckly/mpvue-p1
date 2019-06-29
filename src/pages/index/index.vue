<template>
    <div>
        <i-panel title="无标题输入框">
            <i-input :value="value1" title="窝居深圳" placeholder="搜索好房" @change="handleChange" maxlength="200" />
            <i-icon type="search" />
        </i-panel>
    </div>
</template>

<script>
// Use Vuex
import store from './store'
import Counter from '@/components/counter'

export default {
    data() {
        return {
            value1: ''
        }
    },
    computed: {
        count() {
            return store.state.count
        }
    },
    methods: {
        handleChange(e) {
            console.log(e, 1)
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
