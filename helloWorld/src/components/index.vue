<template>
  <div class="">
    
    <router-view></router-view>
  </div>
</template>

<script>
import mUser from './user.vue'
export default {
  name: 'body',
  components: {
    mUser
  }
}
</script>

<style>
.c {
  background-color: #0a3f5e
}
</style>
