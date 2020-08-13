<template>
    <div class="app-container">
        <v-header :seller='seller'></v-header>
        <div id="slider" class="mui-slider bor_T">
            <div id="sliderSegmentedControl"
                class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <router-link class="mui-control-item" to='/goods'>
                    商品
                </router-link>
                <router-link class="mui-control-item" to='/ratings'>
                    评价
                </router-link>
                <router-link class="mui-control-item" to='/seller'>
                    商家
                </router-link>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import header from './components/header/header.vue'
    // import goods from './components/goods/goods.vue'
    // import mui from './lib/mui/js/mui.min.js'

    export default {
        data() {
            return {
                seller: {}
            }
        },
        created() {
            this.getSeller()
        },
        methods: {
            getSeller() {
                this.axios.get('/api/seller').then((res) => {
                    res = res.data
                    if (res.errno === 0) {
                        this.seller = res.data
                    }
                })
            }
        },
        mounted() {
            // mui('.mui-scroll-wrapper').scroll({
            //     deceleration: 0.0005
            // })
        },
        components: {
            'v-header': header,
        }
    }
</script>

<style lang="scss" scoped>
    .app-container {
        background-color: white;
        height: 100%;

        .mui-slider {
            width: 100%;
            height: 40px;
            display: flex;
            line-height: 40px;
            overflow-y: hidden;
            overflow-x: hidden;
            .mui-control-item {
                font-size: 14px;
                flex: 1;
                text-align: center;
            }

            .mui-control-item.mui-active {
                color: red;
            }
        }
    }

</style>