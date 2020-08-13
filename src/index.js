//导入单文件组件
// import App from './components/App.vue'
import Vue from 'vue' 

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

import VueRouter from 'vue-router'
Vue.use(VueRouter)



import './lib/mui/css/mui.min.css'
// import mui from './lib/mui/js/mui.min.js'
import './common/stylus/index.scss'
// mui('.mui-scroll-wrapper').scroll({
// 	deceleration: 0.0005 
// });
// require("babel-core").transform("code", {
//     plugins: ["transform-remove-strict-mode"]
//   });

import router from './vueRouter.js'
import App from './App.vue'

/* eslint-disable no-new  跳过规则，不需要赋值给任何值*/
const vm = new Vue({
    el: '#app',
    render: h => h(App),
    router
})