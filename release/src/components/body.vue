<template>
  <div class="">
    <div class="body_container shadow-3">
      <h6>Como você está se sentindo hoje?</h6>
    </div>
    <div class="cont column">
      <div class="">
        <mBody></mBody>
      </div>
      <div class="">
        <mButton></mButton>
      </div>
      <div class="">
        <router-view></router-view>
      </div>
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
  .body_container
    width 100%
    margin-top 2%
    padding 4% 1% 4% 1%
    text-align center
    background-color  #7ed4af
    color #ffffff
</style>
