import Vue from 'vue'
import App from './App'
import store from './stores/index'
import './icons/index.js' // icon

Vue.config.productionTip = false
App.mpType = 'app'

// const app = new Vue(App)
// app.$mount()

const app = new Vue(App)
app.$mount()

// new Vue({
//     store,
//     render: h => h(App)
// }).$mount();