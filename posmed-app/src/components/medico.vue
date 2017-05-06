<template>
  <div class="">
    <div slot="header" class="toolbar bg-secondary">
      <q-toolbar-title :padding="0">
        Cadastro de Medico
      </q-toolbar-title>
    </div>
    <div class="body flex justify-center">

      <div class="list">
        <p class="caption text-center">Medico</p>
        <hr>
        <div class="item two-lines">
           <div class="item-content row items-center wrap">
             <div style="margin-right: 10px;" class="item-label">Nome:</div>
              <input class="auto" v-model="name">
          </div>
          </div>
          <div class="item two-lines">
            <div class="item-content row items-center wrap">
              <div style="margin-right: 10px;" class="item-label">CRM:</div>
                <input class="auto" v-model="crm">
              </div>
            </div>
          <div class="item two-lines">
            <div class="item-content row items-center wrap">
              <div style="margin-right: 10px;" class="item-label">Especializacao:</div>
                <input class="auto" v-model="especializacao">
              </div>
          </div>
                   <button class="btn positive outline full-width" v-on:click="create()">Cadastrar</button>
          </div>
    </div>
  </div>

</template>
<script>

import axios from 'axios'

export default {
  data () {
    return {
      model: '',
      name: '',
      crm: '',
      especializacao: ''
    }
  },
  methods: {
    create () {
      var c = []
      c = {
        name: this.name,
        crm: this.crm,
        especializacao: this.especializacao
      }
      axios({
        method: 'post',
        url: 'http://localhost:8081/medicos',
        params: {
          obj: c,
          molecule: 'medico',
          type: 'create'
        }
      }).then(response => {
        console.log(response.data)
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
