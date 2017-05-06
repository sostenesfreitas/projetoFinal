<template>
  <div>
  <div slot="header" class="toolbar bg-secondary">
      <q-toolbar-title :padding="0">
        Listagem de Médicos
      </q-toolbar-title>
    </div>
    <div class="body column justify-center">
              <p class="caption text-center">Medico</p>
              <hr>
              <div class="medico card" v-for="medico in medicos">
              <div class="column inline">
                <p>Nome: {{medico.name}}</p>
                <p>Crm: {{medico.crm}}</p>
                <p>Especializacao: {{medico.especializacao}}</p>
                <div class="btn row justify-around">
                  <button class="push primary ">Editar</button>
                  <button class="push negative ">Excluir</button>
                </div>

                </div>
            </div>
    </div>
  </div>
</template>
<script>

import axios from 'axios'
let medicos = []
export default {
  data () {
    return {
      medicos
    }
  },
  mounted () {
    this.findAll()
  },
  methods: {
    findAll () {
      axios({
        method: 'post',
        url: 'http://localhost:8081/medicos',
        params: {
          molecule: 'medico',
          type: 'findAll'
        }
      }).then(response => {
        this.medicos = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="styl" scoped>

  button
    margin-bottom 4%
  div
   width 100%
  .body
    padding 1%
  .medico
    width 20%
  p
   color #636363
  .medico
    margin-left 40%
    padding 1%
</style>
