<template>
  <div class="goods-box">
    <div class="mui-scroll-wrapper left-control">
      <div class="mui-scroll">
        <div id="left-control">
          <div
            id="segmentedControls"
            v-for="(item,i) in goods"
            :key="item.name"
            class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-vertical  "
            @click="scrollToR(i)" 
          >
            <span class="mui-control-item" :data-index="i" :href="`#content${i+1}`" :id="`leftContent${i + 1}`">
              <div class="control-item">
                <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
                {{item.name}}
              </div>
            </span>
            <div class="bor_T" v-show="(i!==index && index > 0 && i!==index-1) | index == 0 && i!==index "></div>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-scroll-wrapper right-control">
      <div class="mui-scroll right-mui-scroll">
        <div
          v-for="(item, i) in goods"
          class="mui-control-content"
          :key="item.name"
          :id="`content${i + 1}`"
        >
          <h1 class="title" style="border-left: 1px solid #d9dde1;">{{item.name}}</h1>
          <ul>
            <li class="mui-table-view-cell mui-media" v-for="(food, j) in item.foods" :key="food.name">
              <a href="javascript:;" class="foods-massage">
                <img class="mui-media-object mui-pull-left foods-icon" :src="food.icon" />
                <div class="mui-media-body mui-ellipsis">
                  {{food.name}}
                  <p v-show="food.description" class="mui-ellipsis bt extrax">{{food.description}}</p>
                  <div class="extrax bt">
                    <span>月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price" ref="price">
                    <div>
                      ￥<span class="new-price">{{food.price}}</span>
                    <del v-show="food.oldPrice">￥{{food.oldPrice}}</del>
                    </div>
                    <div class="numbers">
                      <span class="decrease iconfont icon-icon-" @click="foodCount(food, 0, j, i)" v-show="food.count > 0"></span>
                      <p class="number" v-if="cart.find(v => v.name === food.name) && food.count > 0">{{food.count}}</p>
                      <span class="increase iconfont icon-AddwithcircleF" @touchend="touchended" @click="foodCount(food, 1, j, i)"></span>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <shoppingCart ref="shopCart" :count="counts"></shoppingCart>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
import shoppingCart from '../cart/shopping_cart.vue'
import cartBall from '../cartBall.vue'

export default {
  data() {
    return {
      goods: {},
      index: 0,
      cart: [], 
      ballLeft: '',
      ballTop: '',
      counts: 0,
      price: ''
    };
  },
  watch: {
    index: function(newIndex) {
      this.scrollToR(newIndex)
    }
  },
  methods: {
    getGoods() {
      this.axios.get("/api/goods").then(res => {
        res = res.data;
        if (res.errno === 0) {
          this.goods = res.data;
          this.initCount();
        }
      });
    },
    scrollToR(i) {
      let controlsElem = document.getElementById("left-control");
      var lastActiveElem = controlsElem.querySelectorAll(".mui-active");
      for (let j = 0; j < lastActiveElem.length; j++) {
        if (lastActiveElem[j].dataset.index != i) {
          lastActiveElem[j].classList.remove("mui-active");
        }
      }
      var currentElem = controlsElem.querySelector(
        ".mui-segmented-control:nth-child(" + (i + 1) + ")"
      );
      currentElem.children[0].classList.add("mui-active");
      let ele = mui(`#content${i + 1}`);
      mui(".right-control")
        .scroll()
        .scrollTo(0, -ele[0].offsetTop);
      this.index = i;
    },
    foodCount(food, type, index, i) {
      let _index
      if (type === 1) {
        _index = this.cart.findIndex(v => v.name === food.name)
        if (_index > -1) {
          this.cart[_index].count ++
          this.goods[i].foods[index].count ++
          this.goods = this.goods.concat([])
      } else {
          this.cart.push({count: 1, name: food.name, price: food.price})
          this.goods[i].foods[index].count = 1
          this.goods = this.goods.concat([])
        }
      } else if (type === 0) {
        _index = this.cart.findIndex(v => v.name === food.name)
        this.cart[_index].count --
        this.goods[i].foods[index].count --
        this.goods = this.goods.concat([])
      }
      localStorage.setItem('cartList', JSON.stringify(this.cart))  
    },
    touchended(e) {
      // console.log(e)
      // console.log(e.changedTouches[0])
      // this.ball = true
      this.ballLeft = Math.floor(e.changedTouches[0].clientX)-12 + 'px'
      this.ballTop = Math.floor(e.changedTouches[0].clientY)-12 + 'px'
      // this.$nextTick(() => {
      //   this.$refs.ballCart.ballControl()
      // })
      // setTimeout(() => {
      //   this.ball = false
      // }, 2000);
      this.$tool.creatEl(cartBall, {ballTop: this.ballTop, ballLeft: this.ballLeft})
      // let getIcon = this.$refs.shopCart.getIcon()
    },
    initCount () {
      localStorage.getItem('cartList') && (this.cart = JSON.parse(localStorage.getItem('cartList')))
      let count = []
      this.cart.map(v => {
        this.counts = 0
        if (v.count > 0) {
          count.push(v.count)
          count.forEach(h => {
            this.counts += h
            console.log(this.counts)
        })
      }
        this.goods.forEach(g => {
          g.foods.forEach(f => {
            if(f.name === v.name) {
              f.count = v.count
              this.goods = this.goods.concat([])
            }
          })
        })
      })
    }
  },
  created() {
    (this.classMap = [
      "decrease",
      "discount",
      "special",
      "invoice",
      "guanrantee"
    ])
    this.getGoods()
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0008,
      bounce: false,
      indicators: false
    });
    let that = this
    setTimeout(() => {
      let controlsElem = document.getElementById("left-control");
      var currentElem = controlsElem.querySelector(
        ".mui-segmented-control:first-child"
      );
      // console.log(currentElem)
      currentElem.children[0].classList.add("mui-active");
      let height = [];
      let items = controlsElem.querySelectorAll(".mui-control-item");
      for (let i = 0; i < items.length; i++) {
        let ele = mui(`#content${i + 1}`);
        height.push(ele[0].offsetTop);
      }
      let scroll = mui(".right-control").scroll;
      document
        .querySelector(".right-control")
        .addEventListener("scroll", function(e) {
          heightY = Math.abs(e.detail.y)
          for(let j = 1; j <= items.length; j++) {
            let leftMenu = document.getElementsByClassName('left-control')
            if (height[j] > heightY && heightY > height[j-1]) {
              if (j == 1) {
                mui(".left-control")
              .scroll()
              .scrollTo(0, 0);
              }
              that.index = j - 1
            } else if (heightY > height[items.length - 1]) {
              that.index = items.length - 1
              mui(".left-control")
              .scroll()
              .scrollTo(0, -(controlsElem.clientHeight-leftMenu[0].clientHeight));
            } 
          }
        });
    }, 500)
  },
  components: {
    shoppingCart,
    cartBall
  }
};
</script>

<style scoped lang="scss">
@import "../../common/stylus/mixin.scss";

#segmentedControls {
  height: 54px;
  width: 80px;
  display: flex;
  flex-direction: column;
  background-color: #f3f5f7;
  margin-right: 0;
  .bor_T {
    width: 56px;
    left: 12px;
  }

  .icon {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    height: 12px;
    margin-right: 2px;
    background-size: 12px 12px;
    background-repeat: no-repeat;

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

  .mui-control-item {
    text-align: left;
    width: 100%;
    height: 100%;
    line-height: 14px;
    font-size: 12px;
    white-space: normal;
    color: #000;
    border-bottom: 0;
    display: flex;
    // align-items: center;
    .control-item {
      margin: auto 12px;
    }
  }
}

.goods-box {
  display: flex;
  height: 500px;
  overflow: hidden;
  .mui-scroll-wrapper {
    top: 174px;
    bottom: 46px;
    overflow: hidden;
    .mui-scroll {
      position: static;
    }
    &.left-control {
      width: 80px;
    }
    &.right-control {
      left: 80px;
      width: calc(100vw - 80px);
    }
  }
  .mui-control-content {
    display: inline-block;
    width: 100%;
    .title {
      line-height: 36px;
      height: 36px;
      font-size: 12px;
      padding-left: 14px;
      color: rgb(147, 153, 159);
      background-color: #f3f5f7;
    }

    ul {
      li {
        .numbers {
          display: flex;
        }
        a {
          padding: 0 0 18px 0;
          .mui-media-body {
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
            padding: 20px 0 8px 10px;
            .bt {
              margin-top: 8px;
              .span {
                line-height: 24px;
                font-size: 14px;
                font-weight: 700;
                color: rgb(240, 20, 20);
              }

              &.extrax {
                line-height: 10px;
                font-size: 10px;
                color: rgb(147, 153, 159);
                white-space: nowrap;
                text-overflow: ellipsis;
                margin-right: 90px;
              }
             
              
          }
           .price {
                display: flex;
                justify-content: space-between;
                line-height: 28px;
                font-size: 10px;
                font-weight: 700;
                color: red;
                .numbers {
                  margin-right: 18px;
                  p {
                    width: 24px;
                    text-align: center;
                    color: rgb(147, 153, 159);
                  }
                  span {
                    margin-top: 2px;
                    font-size: 22px;
                    &.decrease {
                      color: rgb(0,160,220);
                    }
                    &.increase {
                      font-size: 21px;
                      padding-top: 1px;
                      color: rgb(0,160,220);
                    }
                  }
                }
                }
                .new-price {
                  line-height: 24px;
                  font-size: 12px;
                  font-weight: 700;
                }
                del {
                  font-size: 10px;
                  font-weight: 700;
                  color: rgb(147, 153, 159);
                }
              }

          img {
            width: 88px;
            height: 88px;
            padding-top: 18px;
            padding-left: 18px;
          }
        }
      }
    }
  }
}
.mui-active {
  background-color: white !important;
}

* {
  touch-action: none;
}
</style>