<template>
  <div class="soso">
    <div class="card c text-center">
      <div class="sosoPainel text-center">
        <h6>Mais ou menos.</h6>
      </div>
    <h6>{{pergunta}}</h6>
    <router-link to='/bot'><button type="button" name="button">Sim</button></router-link>
    <button type="button" name="button">Não</button>
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
        pergunta: 'Você tem alguma queixa de saúde ?'
      }
    },
    methods: {
      send () {
        moment.locale('pt-br')
        var idb = LocalStorage.get.item('idB')
        var data = {
          estado: 'Mais ou Menos',
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
  .soso
    text-align center
    color #808B96
  .sosoPainel
    background-color #808B96
    color #f5f6f1
    padding 2%
    margin-bottom 5%

</style>
