<template>
  <q-layout>
    <div class="layout-view">

      <!-- Input Footer -->
      <div class="hello">
        <!-- Message received from peer -->
        <div class="msg" v-for="m in messages">
          <div class="chat-other" v-if="!isUser(m.uid)">
            <div class="chat-user">
              <img :src="m.user">
            </div>
            <div class="chat-date">
              <timeago :auto-update="autoUpdate" :max-time="86400 * 365" :locale="en-US" class="timeago" :since="m.created - 60000"></timeago>
            </div>
            <div class="chat-message">
              <p>
                {{m.msg}}
              </p>
            </div>
          </div>
          <div class="chat-you" v-if="isUser(m.uid)">
            <div class="chat-user">
              <img :src="m.user">
            </div>
            <div class="chat-date">
              <timeago :auto-update="autoUpdate" :max-time="86400 * 365" :locale="en-US" class="timeago" :since="m.created - 60000"></timeago>
            </div>
            <div class="chat-message">
              <p>
                {{m.msg}}
              </p>
            </div>
          </div>
        </div>
      </div>
  </div>
  <div slot="footer" class="toolbar c">
    <input @keyup.enter="send(message)" class="full-width text-white" type="text" v-model="message" placeholder="Digite aqui...">
  </div>
  </q-layout>
</template>
<script>
import axios from 'axios'
var md5 = require('js-md5')
var user = {
  name: '',
  email: '',
  uid: '',
  idB: '',
  avatar: ''
}
import { LocalStorage } from 'quasar'
export default {
  data () {
    return {
      user,
      message: null,
      messages: []
    }
  },
  created () {
    this.loginCache()
    this.getMsg()
    this.$options.sockets.listenForMessage = (message) => {
      this.messages.push(message)
    }
  },
  methods: {
    /* eslint-disable */
    loginCache () {
      user.avatar = LocalStorage.get.item('avatar')
      user.name = LocalStorage.get.item('name')
      user.idB = LocalStorage.get.item('idB')
    },
    send (message) {
      let hora = new Date().getTime()
      var data = {
        created: hora,
        uid: user.idB,
        msg: message,
        user: user.avatar,
        chat: md5(user.idB + '15580')
      }
      axios({
        method: 'post',
        url: 'http://posmed.sytes.net:8081/chat',
        params: {
          molecule: 'chat',
          type: 'create',
          obj: data
        }
      }).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
      this.$socket.emit('listenForMessage', data)
      this.message = ''
    },
    isUser (uid) {
      return user.idB === uid
    },
    hora () {
      var hour = new Date().getTime()
      return hour
    },
    getMsg () {
      axios({
        method: 'post',
        url: 'http://posmed.sytes.net:8081/chat',
        params: {
          molecule: 'chat',
          type: 'findChat',
          chat: md5(user.idB + '15580')
        }
      }).then(response => {
        this.messages = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  },
  watch: {
    messages: function () {
      setTimeout(function () {
        var container = this.$el.querySelector('.msg')
        container.scrollTop(999999999)
      }, 100)
    }
  }
}
</script>

<style lang="styl" scoped>
  .c
    background-color: #0a3f5e
  .hello
    width 100%
    padding 4%
</style>
