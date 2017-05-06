<template>
  <div class="">
    <div slot="header" class="toolbar bg-secondary">
      <q-toolbar-title :padding="0">
        Cadastro Paciente
      </q-toolbar-title>
    </div>
    <div class="body flex justify-center">

      <div class="list">
        <p class="caption text-center">Paciente</p>
        <hr>
        <div class="item two-lines">
           <div class="item-content row items-center wrap">
             <div style="margin-right: 10px;" class="item-label">Nome:</div>
              <input class="auto" v-model="name">
          </div>
          </div>
          <div class="item two-lines">
            <div class="item-content row items-center wrap">
              <div style="margin-right: 10px;" class="item-label">Sobrenome:</div>
              <input class="auto" v-model="sobrenome">
            </div>
          </div>
          <div class="item two-lines">
            <div class="item-content row items-center wrap">
              <div style="margin-right: 10px;" class="item-label">Cpf:</div>
                <input class="auto" v-model="cpf">
              </div>
            </div>
          <div class="item two-lines">
            <div class="item-content row items-center wrap">
              <div style="margin-right: 10px;" class="item-label">Nome:</div>
                <input class="auto" v-model="nome">
              </div>
          </div>
          <div class="item two-lines">
            <div class="item-content row items-center wrap">
                    <div style="margin-right: 10px;" class="item-label">Operadora:</div>
                    <input class="auto" v-model="operadora">
                  </div>
                </div>
                <div class="item two-lines">
                   <div class="item-content row items-center wrap">
                     <div style="margin-right: 10px;" class="item-label">Telefone:</div>
                     <input class="auto" v-model="numeroTelefone">
                   </div>
                 </div>
                 <div class="item two-lines">
                    <div class="item-content row items-center wrap">
                      <div style="margin-right: 10px;" class="item-label">Sexo:</div>
                      <input class="auto" v-model="sexo">
                    </div>
                  </div>
                  <div class="item two-lines">
                     <div class="item-content row items-center wrap">
                       <div style="margin-right: 10px;" class="item-label">Nascimento:</div>
                       <input class="auto" v-model="dt_nascimento">
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
      name: 'sostenes',
      sobrenome: 'doido',
      cpf: '00903380498',
      nome: 'amil',
      operadora: 'sei la',
      codigo_ans: '12',
      numeroTelefone: '1231414',
      sexo: 'masculino',
      dt_nascimento: '31/05/1995',
      logradouro: 'sei la',
      numero: '817',
      complemento: 'doido',
      bairro: 'nois',
      cidade: 'voa'
    }
  },
  methods: {
    create () {
      var c = []
      c = {
        name: this.name,
        sobrenome: this.sobrenome,
        cpf: this.cpf,
        convenio: [{
          nome: this.nome,
          operadora: this.operadora,
          codigo_ans: this.codigo_ans
        }],
        telefones: [{
          numero: this.numeroTelefone
        }],
        sexo: this.sexo,
        dt_nascimento: this.dt_nascimento,
        enderecos: [{
          logradouro: this.logradouro,
          numero: this.numero,
          complemento: this.complemento,
          bairro: this.bairro,
          cidade: this.cidade
        }]
      }
      axios({
        method: 'post',
        url: 'http://localhost:8081/paciente',
        params: {
          obj: c,
          molecule: 'paciente',
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
