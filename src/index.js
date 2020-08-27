//导入单文件组件
// import App from './components/App.vue'
import Vue from 'vue' 
import Vuex from 'vuex'
Vue.use(Vuex)

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

import VueRouter from 'vue-router'
Vue.use(VueRouter)



import './lib/mui/css/mui.min.css'
import './common/stylus/index.scss'


import router from './vueRouter.js'
import App from './App.vue'
import store from './store/index.js'
import './vuefiliter'
import '../src/common/js/utils.js'
import './components/loading/index.js'
import './components/loading/v_loading.js'

/* eslint-disable no-new  跳过规则，不需要赋值给任何值*/
const vm = new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
})