import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    seller: '',
    ratings: '',
    counts: 0,
    price: 0,
    cart: []
  },
  mutations: {
    setSeller (state, data) {
      state.seller = data
    },
    setRatings (state, data) {
      state.ratings = data
    },
    setCounts (state, data) {
      state.counts = data
    },
    setPrice (state, data) {
      state.price = data
    },
    setCart (state, data) {
      state.cart = data
    }
  }
})

export default store