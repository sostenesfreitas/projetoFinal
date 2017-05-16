<template>
  <div class="container">
    <div class="c card column">
      <div class="card-title" style="background-color: #e4e4e4">
        Medicamento
      </div>
      <div class="card-content column" v-for="medicamento in medicamentos">
        <p>Nome: {{medicamento.nome}}</p>
        <p>Frequencia: {{medicamento.frequencia}}</p>
        <p>Posologia: {{medicamento.posologia}}</p>
        <button type="button" class="bg-positive push text-white" @click="feito(medicamento)">Feito</button>
      </div>
    </div>

    <div class="c card column">
      <div class="card-title" style="background-color: #e4e4e4">
        Metas
      </div>
      <div class="card-content column" v-for="meta in metas">
        <p>Descrição: {{meta.descricao}}</p>
        <p>Frequencia: {{meta.frequencia}}</p>
        <p>Prazo: {{meta.prazo}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { LocalStorage, Toast } from 'quasar'
var metas = []
var medicamentos = []
export default {
  data () {
    return {
      metas,
      medicamentos,
      option: false
    }
  },
  created () {
    this.getMetas()
  },
  methods: {
    feito (indicador) {
      Toast.create('test ' + indicador)
      this.$socket.emit('Indicador', indicador)
    },
    getMetas () {
      var email = LocalStorage.get.item('email')
      axios({
        method: 'post',
        url: 'http://192.168.0.103:8081/paciente',
        params: {
          molecule: 'paciente',
          type: 'populate',
          email: email,
          populate: 'consultas'
        }
      }).then(response => {
        var t = response.data
        t.consultas.forEach(r => {
          r.metas.forEach(meta => {
            metas.length = 0
            metas.push(meta)
          })
          r.medicamentos.forEach(medicamento => {
            medicamentos.length = 0
            medicamentos.push(medicamento)
          })
        })
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
<style lang="styl" scoped>
  .c
    background-color #ffffff
    margin-top 4%
    border-radius 5px
  .container
    width 100%
    padding 0 4% 0 4%
    background-color #0a3f5e
  .card-title
    padding 0
</style>
