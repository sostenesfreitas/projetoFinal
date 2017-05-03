<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
      <!-- Tela de login -->
    <div class="login" v-show="!user.id">
      <img class="pos "src="./assets/group-12.png" alt="">
      <button type="button" class="gbtn push negative full-width" @click="login()">
        <i>local_hospital</i>
        Login Gmail</button>
    </div>
    <!-- rotas -->
      <router-view v-show="user.id"></router-view>
  </div>
</template>

<script>
import { LocalStorage } from 'quasar'
var user = {
  name: '',
  email: '',
  id: '',
  avatar: ''
}
export default {
  name: 'app',
  data: function () {
    return {
      user
    }
  },
  created () {
    this.loginCache()
  },
  methods: {
    /* eslint-disable */
    login () {
      OAuth.initialize('d2q_PuwdtbOe4JoXgMVOUCM-BKI')
      OAuth.popup('google')
      .done(function(result) {
        result.me().done(function(data) {
          user.name = data.name
          user.email = data.email
          user.id = data.id
          user.avatar = data.avatar
          LocalStorage.set('id', user.id)
          LocalStorage.set('avatar', user.avatar)
          LocalStorage.set('name', user.name)
        })
      })
      .fail(function (err) {
        if (err) {
          console.log(err.stack)
        }
      })
    },
    loginCache () {
      user.id = LocalStorage.get.item('id')
      user.avatar = LocalStorage.get.item('avatar')
      user.name = LocalStorage.get.item('name')
    }
  }
}
</script>

<style lang="styl" scoped>
div
  width 100%
.login
  background-color #00164e
.pos
  margin 40% 0 40% 9%
</style>
