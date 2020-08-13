import VueRouter from 'vue-router'

import goods from './components/goods/goods.vue'
import header from './components/header/header.vue'
import ratings from './components/ratings/ratings.vue'
import seller from './components/seller/seller.vue'

var router = new VueRouter({
    routes: [
        {path: '/goods', component: goods},
        {path: '/header', component: header},
        {path: '/ratings', component: ratings},
        {path: '/seller', component: seller}
    ],
    linkActiveClass: 'mui-active'
})

export default router