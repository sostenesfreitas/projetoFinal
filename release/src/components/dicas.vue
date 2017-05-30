<template>
  <div class="bem">
    <div class="card c">
      <div class="bemPainel">
        <h6>Estou Bem.</h6>
      </div>
      <h6>{{parabens}}</h6>
      <h6>{{aceita}}</h6>
      <p>{{tituloDica}}</p>
      <p>{{dica}}</p>
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
  import { LocalStorage } from 'quasar'
  import axios from 'axios'
  var moment = require('moment')
  export default {
    name: 'Explicacao',
    data () {
      return {
        option: true,
        parabens: 'Parabéns! Continue o bom trabalho.',
        aceita: 'Aceita uma dica de saúde ?',
        tituloDica: 'Recomendações para quem tem catarata.',
        dica: 'Evitar a exposição aos raios UVA dos equipamentos bronzeadores. Os raios ultravioleta solares (UVB) são menos prejudiciais.'
      }
    },
    created () {
      this.getPaciente()
    },
    methods: {
      getPaciente () {
        var email = LocalStorage.get.item('email')
        axios({
          method: 'post',
          url: 'http://posmed.sytes.net:8081/paciente',
          params: {
            molecule: 'paciente',
            type: 'populate',
            email: email,
            populate: 'consultas'
          }
        }).then(response => {
          LocalStorage.set('idB', response.data._id)
        }).catch(error => {
          console.log(error)
        })
      },
      send () {
        moment.locale('pt-br')
        var idb = LocalStorage.get.item('idB')
        var data = {
          estado: 'Bem',
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
  .bem
    color #808B96
    text-align center

  .bemPainel
    background-color #4CAF50
    color #f5f6f1
    padding 2%
    margin-bottom 5%
</style>
