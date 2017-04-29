<template>
  <div class="">
    <div class="t">
      <div class="login">
      <div id="firebaseui-auth-container"></div>
    </div>
    </div>
  </div>
</template>

<script>
import auth from '../components/auth'

const user = auth.getUser()

export default {
  name: 'app',
  data: function () {
    return {
      user
    }
  }
}
</script>

<style lang="styl">
  .t
    height 700px
    background: url(../assets/pos.png) no-repeat center

</style>
