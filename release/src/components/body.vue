<template>
  <div class="t">
    <div class="card c">
      <div class="body_container">
        <h6>Como você está se sentindo hoje?</h6>
      </div>
      <div class="">
        <mButton></mButton>
      </div>
    </div>
      <div class="">
        <router-view></router-view>
      </div>
  </div>
</template>
<script>
import mButton from './body-button.vue'
import mBody from './body.vue'
export default {
  name: 'body',
  components: {
    mBody,
    mButton
  }
}
</script>
<style lang="styl" scoped>
  .t
    padding 0 4% 0 4%
  .c
    border-radius 5px
    margin-top 2%
  .body_container
    width 100%
    padding 2% 1% 2% 1%
    text-align center
    background-color #099c8e
    color #ffffff
</style>
