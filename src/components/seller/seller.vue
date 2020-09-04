<template>
  <div v-loading='show' class="collect_seller">
      <div class="collect all" v-show="!show">
        <div class="title bor_T">
          <div class="left">
            <p class="name">{{seller.name}}</p>
            <star :score="seller.score" :size="36"></star>
            <span class="rating">({{ratingsNum}})</span>
            <span class="sales">月售{{seller.sellCount}}单</span>
          </div>
          <div class="right">
            <div class="icon-favorite" :class="[icon ? 'favorite' : '']" @click="icon=!icon"></div>
            <p class="collected" v-if="!icon">收藏店铺</p>
            <p class="collected" v-if="icon">已收藏</p>
          </div>
        </div>
        <div class="data">
          <div class="price">
            <p class="start">起送价</p>
            <span class="big">{{seller.minPrice}}</span>
            <span class="end">元</span>
          </div>
          <div class="delivery">
            <p class="start">商家配送</p>
            <span class="big">{{seller.deliveryPrice}}</span>
            <span class="end">元</span>
          </div>
          <div class="time">
            <p class="start">平均配送时间</p>
            <span class="big">{{deliveryTime}}</span>
            <span class="end">分钟</span>
          </div>
        </div>
      </div>
      <div class="box"></div>
      <div class="event all">
        <p class="name">公告与活动</p>
        <p class="text">{{seller.bulletin}}</p>
        <ul>
          <li v-for="(item, i) in seller.supports" :key="item.description">
            <div>
              <span class="icon" :class="classMap[i]"></span>
              <span class="sale">{{item.description}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="box"></div>
      <div class="scenery all">
        <p class="name">商家实景</p>
        <div class="img">
          <img v-for="item in seller.pics" :src="item" :key="item" alt="">
        </div>
      </div>
      <div class="box"></div>
      <div class="business all">
        <p class="name">商家信息</p>
        <ul>
          <li v-for="item in seller.infos" :key="item">
            <p class="message">{{item}}</p>
          </li>
        </ul>
      </div>
  </div>
</template>
<script>
import star from '../star/star.vue'
export default {
  data() {
    return {
      ratingsNum: 0,
      show: true,
      deliveryTime: 0,
      classMap: ['decrease','discount','special','invoice','guanrantee'],
      icon: false
    }
  },
  methods: {
    getRatings () {
    this.axios.get('/api/ratings').then((res) => {
      res = res.data
      if (res.errno === 0) {
        this.ratingsNum = res.data.length
        this.$store.commit('setRatings', res.data)
        this.show = false
        let time = []
        let times = 0
        // console.log(res.data)
        res.data.map(v => {
          if (v.deliveryTime) {
             time.push(v.deliveryTime)
             times = 0
             time.map( h => {
               times += h
             })
          }
          // console.log(times)
        })
        this.deliveryTime = parseInt(times/time.length)
        // console.log(this.deliveryTime)
      } 
    })
   }
  },
  created () {
      this.getRatings()
      // console.log(this.seller)
  },
  mounted () {
  },
  computed: {
    seller () {
      return this.$store.state.seller
    },
    ratings () {
      return this.$store.state.ratings
    }
  },
  components: {
    star
  }
}
</script>

<style scoped lang="scss">
@import "../../common/stylus/mixin.scss";

.collect {
  .title {
    display: flex;
    justify-content: space-between;
    padding-bottom: 18px;
    .left {
      font-size: 0;
      .name {
        margin-bottom: 8px;
      }
      .star {
        display: inline-block;
        vertical-align: top;
      }
      span {
        line-height: 16px;
        color: rgb(77, 85, 93);
        font-size: 10px;
        vertical-align: top;
        &.rating {
          margin: 0 12px 0 8px;
        }
      }
    }
    .right {
      width: 40px;
      text-align: center;
      .icon-favorite {
        color: #999;
        margin-bottom: 4px;
        &.favorite {
          color: rgb(240, 20, 20);
        }
      }
      .collected {
        line-height: 10px;
        color: rgb(77, 85, 93);
        font-size: 10px;
      }
    }
  }
  .data {
    display: flex;
    justify-content: space-around;
    padding: 18px 0;
    text-align: center;
    font-size: 0;
    .start {
      line-height: 10px;
      color: rgb(147, 153, 159);
      font-size: 10px;
      margin-bottom: 4px;
    }
    .big, 
    .end {
      line-height: 24px;
      color: rgb(7,17,27);
      font-size: 24px;
    }
    .end {
      font-size: 10px;
    }
  }
}
.event {
  padding: 18px 18px 0 18px;
  .name {
    margin-bottom: 8px;
  }
  .text {
    line-height: 24px;
    color: rgb(240, 20, 20);
    font-size: 12px;
    padding: 0 12px 16px 12px;
  }
  ul {
    position: relative;
    li {
      margin: 0 12px;
      div {
        padding: 16px 0;
        font-size: 0;
        .icon {
          display: inline-block;
          height: 16px;
          width: 16px;
          background-size: 16px 16px;
          background-repeat: no-repeat;
          margin-right: 6px;
          vertical-align: bottom;
          &.decrease {
            @include bg-image("goods/decrease_3");
          } 
          &.discount {
            @include bg-image("goods/discount_3");
          }
          &.special {
            @include bg-image("goods/special_3");
          }
          &.invoice {
            @include bg-image("goods/invoice_3");
          }
          &.guanrantee {
            @include bg-image("goods/guarantee_3");
          }
        }
        .sale {
          line-height: 16px;
          color: rgb(7, 17, 27);
          font-size: 12px;
        }
      }
    }
  }
}
.scenery {
  padding-bottom: 18px;
  .name {
    margin-bottom: 12px;
  }
  .img {
    overflow-x: scroll;
    position: relative;
    display: flex;
    padding-bottom: 18px;
    img {
      flex-shrink:0;
      width: 240px !important;
      height: 180px;
      margin-right: 6px;
    }
  }
}
.business {
  .name {
    margin-bottom: 12px;
  }
  ul {
    position: relative;
    li {
      margin: 0 12px;
      .message {
        line-height: 16px;
        color: rgb(7, 17, 27);
        font-size: 12px;
        padding: 16px 0;
      }
    }
  }
}

li::before {
      content: '';
      display: block;
      height: 1px;
      width: 100%;
      transform: scaleY(.5);
      position: absolute;
      background-color: rgba(7, 17, 27 ,0.1);
      right: 0;
    }
.all {
  padding: 18px 18px 0 18px;
}
.name {
  line-height: 14px;
  color: rgb(7, 17, 27);
  font-size: 14px;
      }
.box {
  background-color: #f9fafa;
  height: 16px;
  box-shadow: inset 0 1px 1px rgba(7,17,27,0.1), 0 1px 1px rgba(7,17,27,0.1);
}
.collect_seller {
  overflow-y: scroll;
  position: relative;
  height: calc(100vh - 175px);
}
</style>
  