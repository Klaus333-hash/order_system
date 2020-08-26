<template>
  <div ref="ball" id="ball" class="ball" @click="ballControl">
  </div>
</template>

<script>
export default {
props: ['ballTop', 'ballLeft'],
methods: {
  ball() {
    let ball = this.$refs['ball']
    ball.style.top = this.ballTop
    ball.style.left = this.ballLeft
    ball.style.transition = 'left 0, top 0'
  },
  ballControl() {
    let ball = this.$refs['ball']
    let screenTop = window.screen.height
    let screenWidth = window.screen.width
    ball.style.top = `${-screenTop+20}px`
    ball.style.left = `${(screenWidth-60)/4}px`
    ball.style.transition = 'left .5s linear, top .5s ease-in'
    setTimeout(() => {
      ball.style.top = `${screenTop-40}px`
      ball.style.left = '30px'
    }, 100);
      
  } 
},
created() {
  
},
mounted() {
  setTimeout(()=>{
      this.ball()
    },50)
  setTimeout(()=>{
      this.ballControl()
    },100)
}
}
</script>

<style lang="scss" scoped>
.ball {
    position: absolute;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: rgb(0,160,220);
    z-index: 2;
}
</style>