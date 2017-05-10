<template>
  <div class="">
    <div slot="header" class="toolbar bg-secondary">
      <q-toolbar-title :padding="0">
        Listagem de Pacientes
      </q-toolbar-title>
    </div>
    <div class="body column justify-center">
              <p class="caption text-center">Paciente</p>
              <hr>
              <div class="card" v-for="paciente in pacientes">
                <div class="card-header">Paciente: {{paciente.name}} {{paciente.sobrenome}}</div>
                <div class="card-content">
                  <div class="card-content-inner">CPF: {{paciente.cpf}}</div>
                  <div class="card-content-inner">ID: {{paciente._id}}</div>
                </div>
              </div>
    </div>
        <button class="btn positive outline full-width" v-on:click="findAll()">Listar pacientes</button>

    </div>
  </div>

</template>
<script>

import axios from 'axios'
var pacientes = []
export default {
  data () {
    return {
      pacientes
    }
  },
  methods: {
    findAll () {
      var c = []
      c = {
        pacientes: this.pacientes
      }
      axios({
        method: 'post',
        url: 'http://posmed.sytes.net:8081/paciente',
        params: {
          obj: c,
          molecule: 'paciente',
          type: 'findAll'
        }
      }).then(response => {
        this.pacientes = response.data
        console.log(pacientes)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="styl" scoped>
  .body
    width 100%
    padding 1%
  .list
    width 35%
    height 580px
  .ietm
    height 30px
  .caption
    margin 0
  .item.two-lines
    height 60px
  .btn
    margin-top 4%
</style>
