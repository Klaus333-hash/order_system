<template>
    <div>
        <transition name="fade">
            <div v-show="visible" class="mask">
                <div class="content">
                    <i class="iconfont icon-loader"></i>
                    <p>{{text}}</p>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data () {
        return {
            visible: false,
            text: '加载中'
        }
    }
}
</script>

<style lang="scss" scoped>
.mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0);
    z-index: 1009;
    .content {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .icon-loader {
            font-size: 26px;
            margin-bottom: 8px;
            animation: rotate 1s infinite;
        }
        p, i {
            color: rgba($color: #111111, $alpha: .8);
        }
    }
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
@keyframes rotate {
    0% { transform: rotate(0) }
    25% { transform: rotate(90deg) }
    50% { transform: rotate(180deg) }
    75% { transform: rotate(270deg) }
    100% { transform: rotate(360deg) }
}
</style>