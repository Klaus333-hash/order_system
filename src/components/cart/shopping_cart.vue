<template>
<div class="down" @click="choice=!choice">
  <div class="foot-cart">
    <div class="icon">
      <div class="icon-shopping_cart" :class="[count > 0 ? 'active' : '']" ref="icon"></div>
      <div class="counts">{{count}}</div>
    </div>
    <div class="box">
      <!-- <div class="price" :class="{price-act: act}">￥0</div> -->
      <div class="price" :class="[count > 0 ? 'price-act' : '']">￥{{price}}</div>
      <div class="deliver">另需配送费￥4元</div>
      <div class="standard">￥20起送</div>
    </div>
  </div>
  <userCart v-show="choice"></userCart>
</div> 
</template>

<script>
import userCart from './user_cart.vue'
export default {
  data () {
    return {
      act :false,
      choice:false
    }
  },
  props: ['count','price'],
  mounted() {
  },
  components: {
    userCart
  }
}
</script>

<style lang="scss" scoped>
.foot-cart {
  position: fixed;
  height: 58px;
  width: 100%;
  bottom: 0;
  z-index: 100;
  .icon{
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 55px;
    width: 55px;
    background-color:  #141d27;
    border-radius: 50%;
    top: 3px;
    left: 15px;
    &.active {
      background-color: rgb(0, 160, 220);
      color: rgb(255, 255, 255);
    }
    .counts {
      position: absolute;
      width: 24px;
      height: 24px;
      border-radius: 12px;
      background-color: rgb(240, 20, 20);
      color: rgb(255, 255, 255);
      right: 0;
      top: -5px;
      text-align: center;
      line-height: 24px;
      font-weight: 700;
      font-size: 9px;
      z-index: 2;
    }
    .icon-shopping_cart {
      position: relative;
      line-height: 44px;
      font-size: 24px;
      height: 44px;
      width: 44px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 22px;
      text-align: center;
      z-index: 1;
    }
  }
  .box {
  display: flex;
  position: absolute;
  width: 100%;
  height: 46px;
  bottom: 0;
  line-height: 24px;
  font-size: 0;
  background-color: #141d27;
  color: rgba(255, 255, 255, 0.4);
  .price {
    position: relative;
    font-weight: 700;
    font-size: 16px;
    padding-top: 12px;
    margin-left: 76px;
    .price-act {
      color: rgb(255, 255, 255);
    }
    &::after {
      content: '';
      height: 60%;
      bottom: 20%;
      width: 1px;
      transform: scaleX(.5);
      position: absolute;
      right: -12px;
      background-color: rgba(255, 255, 255, 0.4);
    }
  }
  .standard {
    position: absolute;
    text-align: center;
    width: 105px;
    height: 100%;
    right: 0;
    font-weight: 700;
    font-size: 12px;
    padding-top: 12px;
    background-color: rgba(255, 255, 255, 0.2);
  }
  .deliver {
    padding-top: 12px;
    font-size: 12px;
    margin-right: 0;
    margin-left: 24px;
  }
  } 
}
</style>