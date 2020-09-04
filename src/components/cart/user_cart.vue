<template>
  <div class="mask">
    <div class="cart">
      <div class="top">
        <span class="title">购物车</span>
        <span class="clean" @click="clean">清空</span>
      </div>
      <ul>
        <li class="bor_T" v-for="(item, i) in cart" :key="item.name">
          <div class="food">{{cart[i].name}}</div>
          <div class="choose">
            <span class="price-icon">￥</span>
            <span class="price">{{cart[i].price}}</span>
            <span class="decrease iconfont icon-icon-" @click="food(0, i)"></span>
            <span class="count">{{cart[i].count}}</span>
            <span class="increase iconfont icon-AddwithcircleF" @click="food(1, i)"></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  watch : {
    cart: function (val) {
      this.food()
    }
  },
  // props: ['cart'],
  methods: {
    food (type, i) {
      // localStorage.getItem('cartList', this.cart)
      // console.log(this.cart)
      if (type === 0 && this.cart[i].count > 0) {
        this.cart[i].count--
        this.$store.state.counts--
        this.cart[i].count === 0 && this.cart.splice(i, 1)
      } else if (type === 1) {
        this.cart[i].count++
        this.$store.state.counts++
      }
      // console.log(this.cart)
      this.$store.commit('setCart', this.cart)
      this.$parent.$parent.initCount()
      // this.$parent.getPrice()
      // localStorage.setItem('cartList', JSON.stringify(this.cart))
    },
    clean () {
      this.$store.state.cart = []
      this.$store.state.counts = 0
    }
  },
  mounted () {    
  },
  computed: {
     counts () {
       return this.$store.state.counts
     },
     price () {
       return this.$store.state.price
     },
     cart () {
       return this.$store.state.cart
     }
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