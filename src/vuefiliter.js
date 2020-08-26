import Vue from 'vue'
Vue.filter('formatData', function (value) {
  let date = new Date(value)
  let year = date.getFullYear()
  let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth()
  let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate( )
  let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  let minute = date.getMinutes() < 10 ? '0' + date .getMinutes() : date.getMinutes()
  return `${year}-${month}-${day} ${hour}:${minute}`
})
