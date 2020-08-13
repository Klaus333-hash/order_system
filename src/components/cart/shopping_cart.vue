<template>
  <div class="foot-cart">
    <div class="trans"></div>
    <div class="box">
      <div class="icon"></div>
      <div class="icon-shopping_cart "></div>
      <div class="price">￥0</div>
      <div class="deliver">另需配送费￥4元</div>
      <div class="standard">￥20起送</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.foot-cart {
  position: fixed;
  height: 58px;
  width: 100%;
  bottom: 0;
  z-index: 99;
  .trans {
    background-color: transparent;
    height: 10px;
    width: 100%;
  }
  .box {
  display: flex;
  // justify-content: space-between;
  line-height: 24px;
  font-size: 0;
  background-color: #141d27;
  color: rgba(255, 255, 255, 0.4);
   .icon{
    position: absolute;
    height: 50px;
    width: 50px;
    background-color:  #141d27;
    border-radius: 25px;
    top: 0;
    left: 15px;
  }
   .icon-shopping_cart {
    position: relative;
    line-height: 44px;
    font-size: 24px;
    height: 44px;
    width: 44px;
    left: 18px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 22px;
    text-align: center;
    bottom: 5px;
    z-index: 1;
    }
  .price {
    font-weight: 700;
    font-size: 16px;
    padding-top: 12px;
    margin-left: 36px;
    margin-right: 12px;
  }
  .standard {
    text-align: center;
    width: 105px;
    height: 100%;
    right: 0;
    font-weight: 700;
    font-size: 12px;
    padding-top: 12px;
  }
  .deliver {
    padding-top: 12px;
    font-size: 12px;
    margin-right: 0;
  }
  } 
}
</style>