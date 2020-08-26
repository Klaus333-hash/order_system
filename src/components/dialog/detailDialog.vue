<template>
  <div class="detail">
    <div class="detail-box clearfix">
      <div class="detail-text">{{seller.name}}</div>
      <div class="star-wrapper">
        <star :size="48" :score="seller.score"></star>
      </div>
      <div class="discounts">
        <div class="line"></div>
        <div class="text">优惠信息</div>
        <div class="line"></div>
      </div>
      <ul v-if="seller.supports" class="supports">
        <li class="support-item" v-for="(item, i) in seller.supports" :key="i">
          <span class="icon" :class="classMap[seller.supports[i].type]"></span>
          <span class="text">{{seller.supports[i].description}}</span>
        </li>
      </ul>
      <div class="discounts">
        <div class="line"></div>
        <div class="text">商家公告</div>
        <div class="line"></div>
      </div>
      <div class="message">
        <p class="content">{{seller.bulletin}}</p>
      </div>
    </div>
    <div class="detail-close" @click="closeDetail">
      <i class="icon-close"></i>
    </div>
  </div>
</template>

<script>
import star from '../star/star.vue'
export default {
  props: ['seller'],
  components: {
    star
  },
  data () {
    return {
      classMap: ['decrease','discount','special','invoice','guanrantee']
    }
  },
  methods: {
    closeDetail() {
      this.$parent.showDetail = false;
    }
  }
};
</script>

<style lang="scss" scoped>
 @import "../../common/stylus/mixin.scss";
.detail {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: auto;
  transition: all 0.5s;
  background: rgba(7, 17, 27, 0.8);
  backdrop-filter: blur;
  z-index: 999;
  color: #ffffff;
  .detail-box {
    width: 100%;
    min-height: 100%;
    text-align: center;
    .detail-text {
      font-size: 16px;
      font-weight: 700;
      margin-top: 64px;
      /* padding-bottom: 64px; */
    }
    .star-wrapper {
      margin-top: 16px;
    }
    .discounts {
      display: flex;
      width: 80%;
      margin: 28px auto 24px auto;
      .line {
        flex: 1;
        position: relative;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        top: -6px;
      }
      .text {
        padding: 0 12px;
        font-size: 14px;
        font-weight: 700;
      }
    }
    .supports {
      width: 80%;
      margin: 0 auto;
      text-align: left;
      .support-item {
        padding: 0 12px;
        margin-bottom: 12px;
        font-size: 0;

        &:last-child {
          margin-bottom: 0;
        }
        .icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          background-size: 16px 16px;
          background-repeat: no-repeat;
          margin-right: 6px;
          vertical-align: top;
          &.decrease {
            @include bg-image("header/decrease_2");
          }
          &.discount {
            @include bg-image("header/discount_2");
          }
          &.special {
            @include bg-image("header/special_2");
          }
          &.invoice {
            @include bg-image("header/invoice_2");
          }
          &.guanrantee {
            @include bg-image("header/guarantee_2");
          }
        }
        .text {
          line-height: 16px;
          font-size: 12px;
        }
      }
    }
    .message {
      width: 80%;
      margin: 0 auto;
      .content {
        padding: 0 12px;
        line-height: 24px;
        font-size: 12px;
        color: rgb(255, 255, 255);
        text-align: left;
      }
    }
  }
  .detail-close {
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0 auto;
    clear: both;
    font-size: 32px;
    color: rgba(255, 255, 255, 0.5);
  }
}
</style>