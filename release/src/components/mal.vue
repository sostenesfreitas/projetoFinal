<template>
  <div class="mal">
    <div class="card c text-center">
      <div class="malPainel">
        <h6>Estou mal.</h6>
      </div>
      <h6 id='mal'>{{pergunta}}</h6>
      <div  class="secondary column justify-center">
        <router-link to="/bot"  style="color: #808B96; ">
          <button type="button" name="button">Tenho dúvidas sobre o que estou sentindo</button>
        </router-link>
        <router-link to="/bot" style="color: #808B96; ">
          <button type="button" name="button">Não estou me sentindo bem!</button>
        </router-link>
        <router-link to="/chat" style="color: #808B96;">
          <button type="button" name="button">Outro</button>
        </router-link>
      </div>
    </div>
    <div class="card c text-center" v-if="option">
      <div class=" text-center">
        <h6>Confirmar Estado.</h6>
      </div>
    <button type="button" class="push bg-positive full-width text-white" @click="send()">Ok</button>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import { LocalStorage } from 'quasar'
  var moment = require('moment')
  export default {
    name: 'Explicacao',
    data () {
      return {
        option: true,
        pergunta: 'Qual o problema ?'
      }
    },
    methods: {
      send () {
        moment.locale('pt-br')
        var idb = LocalStorage.get.item('idB')
        var data = {
          estado: 'Mal',
          id_paciente: idb,
          created: moment().format('LLL')
        }
        axios({
          method: 'post',
          url: 'http://posmed.sytes.net:8081/feedback',
          params: {
            molecule: 'feedback',
            type: 'create',
            obj: data
          }
        }).then(response => {
          this.option = false
          console.log(response)
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>
<style lang="styl" scoped>
  .c
    border-radius 5px
  .mal
    text-align center
    color #808B96
  .malPainel
    background-color #A569BD
    color #f5f6f1
    padding 2%
    margin-bottom 3%
  #mal
    margin-bottom 5%
  .mal button
    font-size 13px
    width 100%

</style>
