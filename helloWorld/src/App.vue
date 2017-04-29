<template>
  <div id="q-app">
    <q-layout>
      <div slot="header" class="toolbar c" v-show="user.id">
        <div class="user_container">
          <img :src="user.avatar" class="foto avatar">
          <div class="user">
            <p>{{user.name}}</p>
         </div>
         <button style="margin-left: 40%" v-show="user.id" @click="logout()">
            <i>exit_to_app</i>
          </button>
        </div>
      </div>

      <q-tabs slot="footer" class="c" v-show="user.id">
        <q-tab icon="feedback" route="/" exact replace>Feedback</q-tab>
        <q-tab icon="local_pharmacy" route="/medicamento" replace>Medicamentos</q-tab>
      </q-tabs>

    <div class="login" v-show="!user.id">
      <img class="pos "src="./assets/group-12.png" alt="">
      <button type="button" class="gbtn push negative full-width" @click="login()">
        <i>local_hospital</i>
        Login Gmail</button>
    </div>

    <router-view v-show="user.id"></router-view>
    </q-layout>
  </div>
</template>

<script>
import { Toast } from 'quasar'
/**
import auth from './components/auth'
import login from './components/loginFire.vue'
const user = auth.getUser()**/
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
        })
      })
      .fail(function (err) {
        if (err) {
          console.log(err.stack)
        }
      });
    },
    logout () {
      Toast.create('test' + User.getIdentity())
      user.id = ''
      window.location.reload()
    }
  }
}
</script>

<style lang="styl">
  .login
    background-color #00164e
  .pos
    margin 40% 0 40% 9%
  div
    width 100%
  .user_container
    display flex
  p
    margin: 1%;
    font-size: 15px;
  .user
    flex 1 1 auto
    margin 3% 1% 2% 2%
  img.avatar
    margin 2% 1% 1% 1%
    height 55px
    width 55px
  #logo
    border-radius 100%
    width 20%
    height 20%
    margin 1%
  .btn
    margin-top 5%
    height 70px
  .c
    background-color: #0a3f5e
</style>
