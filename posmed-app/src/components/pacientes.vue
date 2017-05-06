<template>
  <div class="">
    <div slot="header" class="toolbar bg-secondary">
      <q-toolbar-title :padding="0">
        Listagem de Pacientes
      </q-toolbar-title>
    </div>
    <div class="body flex justify-center">

<div v-for="paciente in pacientes">
  <p>Nome: {{paciente.name}}</p>
  <p>Crm: {{paciente.cpf}}</p>
  <p>Especializacao: {{paciente.sexo}}</p>
</div>
        <button class="btn positive outline full-width" v-on:click="findAll()">Listar pacientes</button>
      
    </div>
  </div>

</template>
<script>

import axios from 'axios'

export default {
  data () {
    return {
      pacientes: []
    }
  },
  methods: {
    findAll () {
      axios({
        method: 'post',
        url: 'http://localhost:8081/paciente',
        params: {
          molecule: 'paciente',
          type: 'findAll'
        }
      }).then(response => {
        console.log(response.data)
        this.pacientes = response.data
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
