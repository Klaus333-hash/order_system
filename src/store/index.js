import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    seller: '',
    ratings: ''
  },
  mutations: {
    setSeller (state, data) {
      state.seller = data
    },
    setRatings (state, data) {
      state.ratings = data
    }
  }
})

export default store