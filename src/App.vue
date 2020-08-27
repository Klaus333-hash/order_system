<template>
  <div class="app-container">
    <v-header :seller="seller" @showDialog="showDialog"></v-header>
    <div id="slider" class="mui-slider bor_T">
      <div
        id="sliderSegmentedControl"
        class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <router-link class="link-item" to="/goods">商品</router-link>
        <router-link class="link-item" to="/ratings">评价</router-link>
        <router-link class="link-item" to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
    <transition mode="in-out">
      <detailDialog v-show="showDetail" :seller="seller"></detailDialog>
    </transition>
    <loading></loading>
  </div>
</template>

<script>
import header from "./components/header/header.vue";
import detailDialog from "./components/dialog/detailDialog.vue";
import { mapMutations } from "vuex";
import loading from './components/loading/index.vue'
export default {
  data() {
    return {
      seller: {},
      showDetail: false
    };
  },
  created() {
    this.getSeller();
  },
  methods: {
    ...mapMutations(["setSeller"]),
    getSeller() {
      this.axios.get("/api/seller").then(res => {
        res = res.data;
        if (res.errno === 0) {
          this.seller = res.data;
          this.$store.commit("setSeller", res.data);
        }
      });
    },
    showDialog() {
      this.showDetail = true;
    }
  },
  mounted() {},
  components: {
    "v-header": header,
    detailDialog,
    loading
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  background-color: white;
  height: 100%;

  .mui-slider {
    width: 100%;
    height: 40px;
    display: flex;
    line-height: 40px;
    overflow-y: hidden;
    overflow-x: hidden;
    .mui-control-item {
      font-size: 14px;
      flex: 1;
      text-align: center;
    }

    .link-item.mui-active {
      color: red;
    }
  }
}
#sliderSegmentedControl {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.v-enter,
.v-leave-to {
  opacity: 0;
  background: rgba(7, 17, 27, 0);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s;
}
</style>