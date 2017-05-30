<template>
  <q-layout>
    <div class="layout-view container">
      <div class="c card column" v-for="medicamento in medicamentos">
        <div class="card-title row justify-between" style="background-color: #e4e4e4">
          <h6>Medicamento</h6>
          <div class="row justify-right">
            <router-link to="/map" style="padding: 5px"><i>my_location</i></router-link>
            <button type="button" class="bg-positive push text-white" @click="feito(medicamento)">Feito</button>
          </div>
        </div>
        <div class="card-content column" >
          <p>Nome: {{medicamento.nome}}</p>
          <p>Frequencia: {{medicamento.frequencia}}</p>
          <p>Posologia: {{medicamento.posologia}}</p>
        </div>
      </div>

      <div class="c card column" v-for="meta in metas">
        <div class="card-title row justify-between" style="background-color: #e4e4e4">
          <h6>Metas</h6>
          <button type="button" class="bg-positive push text-white" @click="done(meta)">Feito</button>
        </div>
        <div class="card-content column">
          <p>Descrição: {{meta.descricao}}</p>
          <p>Frequencia: {{meta.frequencia}}</p>
          <p>Prazo: {{meta.prazo}}</p>
        </div>
      </div>
    </div>
  </q-layout>
</template>
<script>
import axios from 'axios'
import { LocalStorage, Toast } from 'quasar'
var moment = require('moment')
export default {
  data () {
    return {
      metas: [],
      medicamentos: [],
      option: true
    }
  },
  created () {
    this.getMetas()
    this.$options.sockets.listenForMedicine = (message) => {
      this.medicamentos.push(message)
    }
    this.$options.sockets.listenForMetas = (message) => {
      this.metas.push(message)
    }
  },
  methods: {
    feito (medicamento) {
      moment.locale('pt-br')
      var idb = LocalStorage.get.item('idB')
      var data = {
        id_paciente: idb,
        nome: medicamento.nome,
        frequencia: medicamento.frequencia,
        periodo: medicamento.periodo,
        posologia: medicamento.posologia,
        created: moment().format('LLL')
      }
      this.$socket.emit('Medicamento', data)
      axios({
        method: 'post',
        url: 'http://posmed.sytes.net:8081/indicadorMedicamento',
        params: {
          molecule: 'indicadorMedicamento',
          type: 'create',
          obj: data
        }
      }).then(response => {
        Toast.create('Indicador enviado')
      }).catch(error => {
        console.log(error)
      })
    },
    done (meta) {
      moment.locale('pt-br')
      var idb = LocalStorage.get.item('idB')
      var data = {
        descricao: meta.descricao,
        frequencia: meta.frequencia,
        prazo: meta.prazo,
        created: moment().format('LLL'),
        id_paciente: idb
      }
      this.$socket.emit('Meta', data)
      axios({
        method: 'post',
        url: 'http://posmed.sytes.net:8081/indicadormeta',
        params: {
          molecule: 'indicadormeta',
          type: 'create',
          obj: data
        }
      }).then(response => {
        Toast.create('Meta concluidas')
      }).catch(error => {
        console.log(error)
      })
    },
    getMetas () {
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
        var t = response.data
        t.consultas.forEach(r => {
          this.metas.length = 0
          this.medicamentos.length = 0
          this.metas = r.metas
          this.medicamentos = r.medicamentos
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
