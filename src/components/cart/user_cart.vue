<template>
  <div class="mask">
    <div class="cart">
      <div class="top">
        <span class="title">购物车</span>
        <span class="clean">清空</span>
      </div>
      <ul>
        <li class="bor_T">
          <div class="food">粥</div>
          <div class="choose">
            <span class="price-icon">￥</span>
            <span class="price">10</span>
            <span class="decrease iconfont icon-icon-"></span>
            <span class="count">1</span>
            <span class="increase iconfont icon-AddwithcircleF"></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.mask {
  position: absolute;
  background-color: rgba(7, 17, 27, 0.6);
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 99;
  .cart {
    position: absolute;
    max-height: 70%;
    width: 100%;
    bottom: 46px;
    .top {
      position: relative;
      height: 40px;
      background-color: #f3f5f7;
      padding: 0 18px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      .title {
        line-height: 40px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .clean {
        position: absolute;
        line-height: 40px;
        font-size: 12px;
        color: rgb(0, 160, 220);
        right: 18px;
      }
    }
    ul {
      padding: 0 18px;
      background-color: #fff;
      li {
        display: flex;
        justify-content: space-between;
        height: 48px;
        padding: 12px 0;
        line-height: 24px;
        color: rgb(7, 17, 27);
        .choose {
          font-size: 0;
          .price-icon {
            font-weight: normal;
            color: rgb(240, 20, 20);
            font-size: 10px;
            vertical-align: top;
          }
          .price {
            font-weight: 700;
            color: rgb(240, 20, 20);
            font-size: 14px;
            vertical-align: top;
          }
          .iconfont {
            font-size: 24px;
            &.decrease {
              margin-left: 12px;
            }
          }
          .count {
            display: inline-block;
            width: 24px;
            color: rgb(147, 153, 159);
            font-size: 10px;
            text-align: center;
            margin: 0;
            vertical-align: top;
          }
        }
      }
    }
  }
  span {
  margin-top: 2px;
  font-size: 22px;
  &.decrease {
    color: rgb(0, 160, 220);
  }
  &.increase {
    font-size: 21px;
    padding-top: 1px;
    color: rgb(0, 160, 220);
  }
}
}

</style>>