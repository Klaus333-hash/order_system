<template>
  <div class="rating" v-loading="visible">
    <div class="start-content bor_T">
      <div class="complex">
        <div class="box">
          <p class="score">{{seller.score}}</p>
          <p class="comp">综合评分</p>
          <p class="des">高于周边商家{{seller.rankRate}}%</p> 
        </div>
      </div>
      <div class="starts">
        <div class="one">
          <span class="service">服务态度</span>
          <star :size="36" :score="seller.serviceScore" class="middle"></star>
          <span>{{seller.serviceScore}}</span>
        </div>
        <div class="two">
          <span class="taste">味道评分</span>
          <star :size="36" :score="seller.foodScore" class="middle"></star>
          <span>{{seller.foodScore}}</span>
        </div>
        <div class="three">
          <span class="time">送达时间</span>
          <span class="middle">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
    <div class="bor_T trans"></div>
    <div class="comments-content">
      <div class="all bor_T" id="btn">
        <button class="total" :class="[type==2 ? 'now' : '']"   @click="satisfied(2)">全部 {{ratingsNum}}</button>
        <button class="satisfied" :class="[type==1 ? 'now' : '']" @click="satisfied(1)">满意 {{satisfiedNum}}</button>
        <button class="dissatisfied" :class="[type==0 ? 'now' : '']" @click="satisfied(0)">不满意 {{dissatisfiedNum}}</button>
      </div>
      <div class="has-content bor_T">
        <span class="icon-check_circle" :class="{'old-icon': showUseful}" @click="check_content" ref="iconCheck"></span>
        <span class="check">只看有内容的评价</span>
      </div>
      <div class="comments">
        <ul>
          <li v-show="showUseful ? item.text : true" v-for="(item, i) in ratings" :key="i"> 
            <span class="avatar">
              <img :src="item.avatar" alt="">
            </span>
            <div class="user">
              <span class="username">{{item.username}}</span>
              <span class="ratetime">{{item.rateTime | formatData}}</span>
              <div class="star">
                <star :size="24" :score="item.score" class="stars"></star>
                <span v-show="item.deliveryTime" class="deliveryTime">{{item.deliveryTime}}分钟送达</span>
              </div>
              <p class="comment">{{item.text}}</p>
              <div v-show="item.recommend && item.recommend.length" class="recommend">
                <span class="icon-thumb_up"></span>
                <span class="foods" v-for="food in item.recommend" :key="food">
                  {{food}}
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from '../star/star.vue'
import { mapMutations } from 'vuex'
import shoppingCart from '../cart/shopping_cart.vue'

export default {
  data() {
    return {
      showUseful: false,
      ratingsNum: '',
      dissatisfiedNum: '',
      satisfiedNum: '',
      visible: true,
      type: 0
    }
  },
  created() {
    this.getRatings()
  },
  mounted () {
    // this.getActive(2)
  },
  methods: {
    ...mapMutations([
       'setRatings'
    ]),
    getRatings(type = 2) {
      this.type = type
      this.axios.get('/api/ratings').then((res) => {
        this.visible = false
        res = res.data
        if (res.errno === 0) {
          this.ratingsNum = res.data.length
          this.dissatisfiedNum = res.data.filter(v => v.rateType === 1).length
          this.satisfiedNum = res.data.filter(v => v.rateType === 0).length
          if (type === 2) this.$store.commit('setRatings', res.data)
          else if (type === 0) {
            this.$store.commit('setRatings', res.data.filter(v => v.rateType === 1))
          }
          else if (type === 1) {
            this.$store.commit('setRatings', res.data.filter(v => v.rateType === 0))
          }
        } 
      })
    },
    check_content() {
      this.showUseful = !this.showUseful
      //  let iconClasslist = this.$refs.iconCheck.classList
      //  if(iconClasslist[1] === 'old-icon') {
      //   //  this.$refs.iconCheck.classList.remove("old-icon")
      //    this.showUseful = false
      //  } else {
      //   //  this.$refs.iconCheck.classList.add("old-icon")
      //    this.showUseful = true
      //  }
    },
    satisfied (type) {
      this.getRatings(type)
    }
  },
  computed: {
    seller() {
      return this.$store.state.seller
    },
    ratings() {
      return this.$store.state.ratings
    }
  },
  components: {
    star,
    shoppingCart
  }
}
</script>

<style scoped lang="scss">
.rating {
  position: relative;
  height: calc(100vh - 175px);
  overflow-y: scroll;
}

.start-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .complex {
    width: 138px;
    position: relative;
    &::after {
    content: '';
    width: 1px;
    height: 70%;
    top: 15%;
    background-color: rgba(7,17,27,0.1);
    position: absolute;
    right: 0;
    transform: scaleX(.5);
  }
    .box {
      padding: 18px 0;
      p {
      text-align: center;
      &.score {
        line-height: 28px;
        font-size: 24px;
        color: rgb(255,153,0);
        padding-bottom: 6px;
      }
      &.comp {
        line-height: 12px;
        font-size: 12px;
        color: rgb(7, 17, 27);
        padding-bottom: 8px;
      }
      &.des {
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
        padding-bottom: 6px;
      }
    }
    }
    
  }
  .starts {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 24px;
    flex-direction: column;
    line-height: 18px;
    font-size: 12px;
    color: rgb(7, 17, 27);
    .one, .two, .three {
      display: flex;
      width: 189px;
      justify-content: flex-start;
      .middle {
        padding: 0 12px;
      }
    }
    .one {
      padding-bottom: 8px;
    }
    .two {
      padding-bottom: 8px;
    }
  }
}
.trans {
  height: 18px;
  background-color: rgb(249, 250, 250);
}
.comments-content {
  padding-top: 18px;
  padding-left: 18px;
  position: relative;
  .all {
    padding-bottom: 18px;
    button {
      border: 0;
    }
    .total {
      color: #666;
      background-color: rgb(67, 174, 236);
    }
    .satisfied {
      color: #666;
      background-color: rgb(199, 229, 247);
    }
    .dissatisfied {
      color: #666;
      background-color: rgb(238, 236, 236);
    }
    .now {
      color: #fff !important;
    }
  }
  .has-content {
    height: 50px;
    line-height: 50px;
    .icon-check_circle {
      color: rgb(147,153,159);
      font-size: 24px;
      line-height: 50px;
    }
    .old-icon {
      color: rgb(67, 174, 236);
    }
    .check {
      color: rgb(147,153,159);
      font-size: 12px;
      vertical-align: top;
    }
  }
  .comments {
    ul {
      padding-bottom: 46px;
      li {
        display: flex;
        position: relative;
        padding-top: 18px;
        .avatar {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background-repeat: no-repeat;
        img {
          width: 28px;
          height: 28px;
          border-radius: 50%;
        }
      }
      .user {
        line-height: 12px;
        font-size: 10px;
        padding-left: 12px;
        .username {
          color: rgb(7, 17, 27);
        }
        .ratetime {
          position: absolute;
          color: rgb(147, 153, 159);
          padding-right: 0;
          right: 18px;
        }
        .star {
          display: flex;
          margin-top: 4px;
          .stars {
            margin: 0 6px 6px 0;
          }
          .deliveryTime {
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
         
        }
         .comment {
            line-height: 18px;
            font-size: 12px;
            color: rgb(7, 17, 27);
            padding-bottom: 8px;
          }
          .recommend {
            font-size: 0;
            .icon-thumb_up{
              line-height: 16px;
              font-size: 12px;
              color: rgb(0, 160, 220);
              padding-right: 8px;
              vertical-align: text-bottom;
            }
            .foods {
              position: relative;
              max-width: 60px;
              display: inline-block;
              background-color: rgb(255, 255, 255);
              line-height: 12px;
              font-size: 9px;
              color: rgb(147, 153, 159);
              border-radius: 2px;
              margin-right: 8px;
              padding: 2px 6px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              &::after {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                z-index: 1;
                width: 200%;
                height: 200%;
                border: 1px solid rgba(7, 17, 27, .1);
                transform: scale(.48, .46);
                transform-origin: 0 0;
                border-radius: 6px;
              }
            }
          }
      }
      }
    }  
  }
}
// * {
//   touch-action: none;
// }
</style>
