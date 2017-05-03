<template>
  <q-layout>
      <!-- Header Toolbar -->
      <div slot="header" class="toolbar c">
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
      <!-- Tab Footer -->
      <q-tabs slot="footer" class="c">
        <q-tab icon="feedback" route="/" exact replace>Feedback</q-tab>
        <q-tab icon="local_pharmacy" route="/medicamento" replace>Medicamentos</q-tab>
      </q-tabs>
    <router-view></router-view>
</q-layout>
</template>

<script>
import { LocalStorage } from 'quasar'
var user = {
  id: LocalStorage.get.item('id'),
  avatar: LocalStorage.get.item('avatar'),
  name: LocalStorage.get.item('name')
}
export default {
  name: 'app',
  data: function () {
    return {
      user
    }
  },
  methods: {
    logout () {
      LocalStorage.remove('id')
      LocalStorage.remove('avatar')
      LocalStorage.remove('name')
      window.location.reload()
    }
  }
}
</script>

<style lang="styl" scoped>
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
