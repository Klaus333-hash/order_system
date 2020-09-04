<template>
  <div class="header">
    <li class="mui-table-view-cell mui-media" style="pointer-events:none;">
      <img class="mui-media-object mui-pull-left" :src="seller.avatar">
      <div class="mui-media-body">
        <span class="brand"></span>
        <span class="headerName">{{seller.name}}</span>
      </div>
      <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟到达</div>    
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <!-- <div  v-if="seller.supports" class="support-count" @click="detailShow">
         <span class="count" >{{seller.supports.length}}个</span>
         <i class="icon-keyboard_arrow_right" ></i>
        </div> -->
    </li>
    <div  v-if="seller.supports" class="support-count" @click="detailShow">
      <span class="count" >{{seller.supports.length}}个</span>
      <i class="icon-keyboard_arrow_right" ></i>
    </div>
    <div class="bot-bulletin">
      <span class="bulletin"></span><span class="bottom-bulletin">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="">
    </div>
  </div>
</template>

<script>
  import star from '../star/star.vue'

  export default {
    data() {
      return {}
    },
    methods: {
      detailShow () {
        this.$emit('showDialog')
        // console.log(this.$refs.active.classList)
        // this.$refs.active.classList.remove('mui-active')
      }
    },
    created() {
      this.classMap = ['decrease','discount','special','invoice','guanrantee']
    },  
    props: ['seller'],
    components: {
      star
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/stylus/mixin.scss";

  .header {
    position: relative;
    background: rgba(7,17,27,0.5);
    color: rgb(255,255,255);
    z-index:99;
    overflow: hidden;
    .mui-table-view-cell:after {
      height: 0;
    }
    li {
      padding: 0;
      position: relative;
      font-size: 0;

      img {
        width: 64px;
        height: 64px;
        margin: 24px 16px 18px 24px;
        border-radius: 2px;
      }

      .mui-media-body {
        margin-top: 26px;
        margin-bottom: 8px;
        .brand {
          @include bg-image('header/brand');
          display: inline-block;
          vertical-align: top;
          width: 30px;
          height: 18px;
          margin-right: 6px;
          background-size:30px 18px;
          background-repeat: no-repeat;
        }
        .headerName {
          line-height: 18px;
          font-size: 16px;
          font-weight: bold;
        }
      }
      .description {
        margin-bottom: 10px;
        line-height: 12px;
        font-size: 12px;
      }
      .support {
        .text {
          line-height: 12px;
          font-size: 10px;
          }
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease {
            @include bg-image('header/decrease_1');
          }
          &.invoice {
            @include bg-image('header/invoice_1');
          }
          &.discount {
            @include bg-image('header/discount_1');
          }
          &.guanrantee {
            @include bg-image('header/guarantee_1');
          }
          &.special {
            @include bg-image('header/special_1');
          }
        }
      }
    }
    .support-count {
        position: absolute;
        right: 12px;
        bottom: 42px;
        padding: 0 8px;
        line-height: 24px;
        height: 24px;
        border-radius: 14px;
        background-color: rgba(0,0,0,0.2);
        font-size: 0;
        .count {
          vertical-align: top;
          font-size: 10px;
          padding-right: 2px;
        }
        i {
          line-height: 24px;
          font-size: 10px;
        }
      }
    .bot-bulletin {
      position: relative;
      line-height: 28px;
      height: 28px;
      background-color: rgba(7,17,27,0.2);
      padding: 0 12px 0 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .bulletin{
        @include bg-image('header/bulletin');
        display: inline-block;
        vertical-align: top;
        width: 22px;
        height: 12px;
        background-size: 22px 12px;
        background-repeat: no-repeat;
        margin-right: 4px;
        margin-top: 8px ;
      }
      .bottom-bulletin {
        vertical-align: top;
        line-height: 29px;
        font-size: 10px;
      }
      .icon-keyboard_arrow_right {
        position: absolute;
        right: 0;
        top: 7px;
      }

    }
    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        filter: blur(10px);
      }
    }
  }
</style>