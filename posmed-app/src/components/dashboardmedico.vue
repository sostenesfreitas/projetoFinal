<template>
<q-layout>
  <!-- Header -->
  <div slot="header" class="toolbar bg-secondary">
    <q-toolbar-title :padding="0">
      DASHBOARD | MEDICO | POSMED
    </q-toolbar-title>
  </div>
  <!-- Medico -->
  <div class="container row">
    <div class="card" style="padding-right: 10px; padding-left: 10px;  max-width: 350px;">
      <q-parallax src="http://photos.doctoralia.com/635796699763356882_2.jpg" :height="150">
        <div slot="loading">Loading...</div>
      </q-parallax>
      <div class="card-title text-center">
        Dra. {{ medico.name | capitalize }}
      </div>
      <div class="list item-delimiter">
        <div class="toolbar text-center bg-secondary">
          <q-toolbar-title :padding="1">
            Pacientes
          </q-toolbar-title>
        </div>
        <br>
        <q-search v-model="searchModel"></q-search>
        <br>
        <div v-for="paciente in pacientes" style="cursor:pointer">
					<hr />
          <div class="text-center" @click="getPaciente(paciente)" style="color: #8c8c8c; width:auto">
          	<h6 >{{ paciente.name | capitalize }}</h6>
						<i style="padding-top: 2%">account_circle</i>
          </div>
        </div>
      </div>
      <br>
    </div>
		<!-- Metas, Medicamentos -->
    <div class="card" style="width: 150%; padding-right: 10px; padding-left: 10px" v-show="paciente">
      <div class="card">
        <div class="item two-lines">
          <img class="item-primary" src="http://www.gellog.com.br/assets/imagens/avatar.png">
          <div class="item-content">
            <div>{{ paciente.name | capitalize }}</div>
            <div v-for="convenio in paciente.convenio">
							{{ convenio.operadora | capitalize }}
						</div>
          </div>
        </div>
				<!-- Metas -->
        <q-collapsible icon="alarm_add" label="Metas">
          <div class="class" style="background-color: #ffffff">
            <div class="list" v-for="consulta in paciente.consultas">
              <div class="item two-lines" v-for="meta, key in consulta.metas">
                <div class="item-primary bg-grey-6 text-white">
                  <i class="material-icons">directions_run</i>
                </div>
                <div class="item-content has-secondary">
									<div> {{meta.descricao}}</div>
					        <div> {{meta.frequencia}}</div>
					        <div> {{meta.prazo}}</div>
                </div>
                <div class="item-secondary item-link">
                  <button @click="delMeta(key, consulta, meta, paciente)" >
                    <i class="">delete_forever</i>
                  </button>
                </div>
              </div>
              <hr class="inset">
							<button class="bg-secondary text-white" @click="addMark(consulta, paciente)"  style="margin: 2%">
								<i class="material-icons">add</i>
									Incluir Meta
							</button>
            </div>
          </div>
        </q-collapsible>
				<!-- Medicamentos -->
        <q-collapsible icon="local_pharmacy" label="Medicamentos">
          <div class="list" v-for="consulta in paciente.consultas">
            <div class="item two-lines" v-for="medicamento, key in consulta.medicamentos">
              <div class="item-primary bg-grey-6 text-white">
                <i class="material-icons">healing</i>
              </div>
              <div class="item-content has-secondary">
								<div>{{medicamento.nome}}</div>
				        <div>{{medicamento.frequencia}}</div>
				        <div>{{medicamento.posologia}}</div>
              </div>
              <div class="item-secondary item-link">
                <button @click="delMedi(key, consulta, medicamento, paciente)">
                  <i class="">delete_forever</i>
                </button>
              </div>
            </div>
            <br>
            <button class="secondary" @click="addMedicines(consulta, paciente)" style="margin: 2%">
  						<i class="material-icons">add</i>
  							Incluir Medicamentos
  					</button>
          </div>
        </q-collapsible>
				<!-- Indicadores -->
        <q-collapsible icon="done_all" label="Indicadores">
          <div class="list">
            <div class="item two-lines" v-for="meta in metas">
              <div class="item-primary bg-green-6 text-white">
                <i class="material-icons">directions_run</i>
              </div>
              <div class="item-content has-secondary">
                <div>{{meta.descricao}}</div>
                <div>{{meta.created}}</div>
                <div>Realizado</div>
              </div>
              <i class="item-secondary">event_available</i>
            </div>
            <hr class="inset">

            <div class="item two-lines" v-for="indicador in indicadores">
              <div class="item-primary bg-blue-6 text-white">
                <i class="material-icons">healing</i>
              </div>
              <div class="item-content has-secondary">
                <div>{{indicador.nome}}</div>
                <div>{{indicador.created}}</div>
                <div>Realizado</div>
              </div>
              <i class="item-secondary">event_available</i>
            </div>
            <hr class="inset">
          </div>
        </q-collapsible>
      </div>
    </div>
		<!-- Chat -->
    <div class="card" style="padding-right: 10px;" v-show="paciente">
      <q-layout>
        <div class="layout-view" >
          <!-- Header Toolbar -->
          <div slot="header" class="c toolbar bg-secondary">
            <div class="user_container row">
              <div class="user" style="margin-left: 10px;">
                <h6>Chat</h6>
              </div>
            </div>
          </div>
          <!-- Input Footer -->
          <div class="hello">
            <!-- Message received from peer -->
            <div class="msg" v-for="m in messages">
              <div class="chat-other" v-if="!isUser(m.uid)">
                <div class="chat-user">
                  <img :src="m.user">
                </div>
                <div class="chat-date">
                  <timeago :auto-update="autoUpdate" :max-time="86400 * 365" :locale="en-US" class="timeago" :since="m.created - 60000"></timeago>
                </div>
                <div class="chat-message">
                  <p>
                    {{m.msg}}
                  </p>
                </div>
              </div>
              <div class="chat-you" v-if="isUser(m.uid)">
                <div class="chat-user">
                  <img :src="m.user">
                </div>
                <div class="chat-date">
                  <timeago :auto-update="autoUpdate" :max-time="86400 * 365" :locale="en-US" class="timeago" :since="m.created - 60000"></timeago>
                </div>
                <div class="chat-message">
                  <p>
                    {{m.msg}}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="toolbar bg-secondary ">
          <input @keyup.enter="send(message)" class="full-width text-white" type="text" v-model="message" placeholder="Digite aqui...">
        </div>
      </q-layout>
    </div>
  </div>
</q-layout>
</template>

<script>
/* eslint-disable */
import { Dialog, LocalStorage, Toast } from 'quasar'
import axios from 'axios'
var moment = require('moment')
var md5 = require('js-md5')
let medico = ''
let paciente = ''
let pacientes = []
var user = {
  name: '',
  email: '',
  id: '',
  avatar: ''
}
export default {
  data () {
    return {
      medico,
      paciente,
      pacientes,
      user,
      message: null,
      messages: [],
      indicadores: [],
      metas: []
    }
  },
  created () {
    moment.locale('pt-br')
    this.getMedico()
    this.loginCache()
    this.$options.sockets.listenForMessage = (message) => {
      this.messages.push(message)
    }
    this.$options.sockets.Medicamento = (medicamento) => {
      medicamento.created = moment().format('LLL')
      this.indicadores.push(medicamento)
    }
    this.$options.sockets.Meta = (meta) => {
      meta.created = moment().format('LLL')
      this.metas.push(meta)
    }
  },
  methods: {
    getMedico (id) {
      axios({
        method: 'post',
        url: 'http://posmed.sytes.net:8081/medicos',
        params: {
          _id: '590ddbf60bf5bb5e2423f824',
          molecule: 'medico',
          type: 'populateMedico',
          populate: 'pacientes'
        }
      }).then(response => {
        this.medico = response.data
        this.pacientes = this.medico.pacientes
      }).catch(error => {
        console.log(error)
      })
    },
    addMedicines (consulta, paciente) {
      form: [
        Dialog.create({
          title: 'Incluir Medicamentos',
          message: 'Preescreva o medicamento para o seu paciente',
          form: {
            nome: {
              type: 'textbox',
              label: 'Nome',
              model: ''
            },
            frequencia: {
              type: 'textbox',
              label: 'Frequência (Dia)',
              model: ''
            },
            posologia: {
              type: 'textbox',
              label: 'Posologia',
              model: ''
            }
          },
          buttons: [
            'Cancel',
            {
              label: 'Ok',
              handler (data) {
                Toast.create('Medicamento Cadastrado')
                axios({
					        method: 'post',
					        url: 'http://posmed.sytes.net:8081/consulta',
					        params: {
					          _id: consulta._id,
					          molecule: 'consulta',
					          type: 'findMedicamentoAndUpdate',
					          medicamento: data
					        }
					      }).then(response => {
                  paciente.consultas.forEach( v => {
                    v.medicamentos.push(data)
                  })
					      }).catch(error => {
					        console.log(error)
					      })
              }
            }
          ]
        })
      ]
    },
    addMark (consulta, paciente) {
      form: [
        Dialog.create({
          title: 'Incluir Metas',
          message: 'Informe a metas para o seu paciente',
          form: {
            descricao: {
              type: 'textbox',
              label: 'Descrição',
              model: ''
            },
            frequencia: {
              type: 'textbox',
              label: 'Frequencia (Dias)',
              model: ''
            },
            prazo: {
              type: 'textbox',
              label: 'Prazo',
              model: ''
            }
          },
          buttons: [
            'Cancel',
            {
              label: 'Ok',
              handler (data) {
                Toast.create("Medicamento Cadastrado")
								axios({
					        method: 'post',
					        url: 'http://posmed.sytes.net:8081/consulta',
					        params: {
					          _id: consulta._id, // consulta._id,
					          molecule: 'consulta',
					          type: 'findMetaAndUpdate',
					          metas: data
					        }
					      }).then(response => {
                  paciente.consultas.forEach( v => {
                    v.metas.push(data)
                  })
					      }).catch(error => {
					        console.log(error)
					      })
              }
            }
          ]
        })
      ]
    },
		delMeta (index, consulta, meta, paciente) {
      console.log(index)
			axios({
        method: 'post',
        url: 'http://posmed.sytes.net:8081/consulta',
        params: {
          id: consulta._id,
          molecule: 'consulta',
          type: 'findMetaAndDelete',
          deleteUid: meta._id
        }
      }).then(response => {
        paciente.consultas.forEach( v => {
          v.metas.splice(index, 1)
        })
      }).catch(error => {
        console.log(error)
      })
		},
    delMedi (index, consulta, medicamento, paciente) {
      axios({
        method: 'post',
        url: 'http://posmed.sytes.net:8081/consulta',
        params: {
          id: consulta._id,
          molecule: 'consulta',
          type: 'findMedicamentoDelete',
          deleteUid: medicamento._id
        }
      }).then(response => {
        paciente.consultas.forEach( v => {
          v.medicamentos.splice(index, 1)
        })
      }).catch(error => {
        console.log(error)
      })
    },
    getPaciente (user) {
      this.user = user
      this.getMsg()
      axios({
        method: 'post',
        url: 'http://posmed.sytes.net:8081/paciente',
        params: {
          email: user.email,
          molecule: 'paciente',
          type: 'populate',
          populate: 'consultas'
        }
      }).then(response => {
        this.paciente = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    getMsg () {
      axios({
        method: 'post',
        url: 'http://posmed.sytes.net:8081/chat',
        params: {
          molecule: 'chat',
          type: 'findChat',
          chat: md5(this.user._id + this.medico.crm)
        }
      }).then(response => {
        this.messages = response.data
        console.log(this.user._id)
      }).catch(error => {
        console.log(error)
      })
    },
    loginCache () {
      user.id = LocalStorage.get.item('id')
      user.avatar = LocalStorage.get.item('avatar')
      user.name = LocalStorage.get.item('name')
    },
    send (message) {
      let hora = new Date().getTime()
      var data = {
        created: hora,
        uid: this.medico._id,
        msg: message,
        user: 'http://photos.doctoralia.com/635796699763356882_2.jpg',
        chat: md5(this.user._id + this.medico.crm)
      }
       axios({
        method: 'post',
        url: 'http://posmed.sytes.net:8081/chat',
        params: {
          molecule: 'chat',
          type: 'create',
          obj: data
        }
      }).then(response => {
        this.paciente = response.data
      }).catch(error => {
        console.log(error)
      })
      this.$socket.emit('listenForMessage', data)
      this.message = ''
    },
    isUser (uid) {
      return this.medico._id === uid
    },
    hora () {
      var hour = new Date().getTime()
      return hour
    }
  },
  watch: {
    messages: function () {
      setTimeout(function() {
        var container = this.$el.querySelector('.msg')
        container.scrollTop(999999999)
      }, 100)
    }
  }
}
</script>
	<style lang="stylus">
		.container
			width 100%
		.hello
			width 100%
			padding 4%
</style>
