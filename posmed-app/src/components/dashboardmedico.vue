<template>
<q-layout>
  <!-- login -->
  <div class="l" v-if="!medico._id">
    <img class="imagem" src="../assets/p.png" alt="">
    <div class="co column ">
      <input class="text-white" v-model="crm" placeholder="Crm">
      <input class="text-white" v-model="password" placeholder="Password">
      <button type="button" class="gbtn push negative full-width" @click="login(crm, password)">
          Login</button>
    </div>
  </div>
  <!-- Header -->
  <div slot="header" class="toolbar bg-secondary" v-if="medico._id">
    <q-toolbar-title :padding="0">
      DASHBOARD | MEDICO | POSMED

    </q-toolbar-title>
    <button style="margin-left: 40%" @click="logout()">
          <i>exit_to_app</i>
        </button>
  </div>
  <!-- Medico -->
  <div class="container row" v-if="medico._id">
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
        <q-search v-model="query"></q-search>
        <br>
        <div v-for="item in tableFilter" style="cursor:pointer">
					<hr />
          <div class="text-center" v-for="(head, key) in columns" @click="getPaciente(item)" style="color: #8c8c8c; width:auto">
          	<h6 >{{item[key]}}</h6>
						<i style="padding-top: 2%">account_circle</i>
          </div>
        </div>
      </div>
      <br>
    </div>
		<!-- Metas, Medicamentos -->
    <div class="card layout-view" style="width: 150%; padding-right: 10px; padding-left: 10px" v-show="paciente">
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
					        <div> {{meta.periodo}}</div>
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
            <div class="item two-lines" v-for="e in estado">
              <div class="item-primary  text-white"
              :style="e.estado === 'Mal' ? 'background-color: #A569BD' : 'background-color: #808B96' && e.estado === 'Bem' ? 'background-color: #21BA45' : 'background-color: #808B96'">
                <i class="material-icons">face</i>
              </div>
              <div class="item-content has-secondary">
                <div>{{e.estado}}</div>
                <div>{{e.created}}</div>
              </div>
              <i class="item-secondary">event_available</i>
            </div>
            <hr class="inset">
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
// let pacientes = []
var user = {
  name: '',
  email: '',
  id: '',
  avatar: ''
}

export default {
  data () {
    return {
      query: '',
      medico,
      crm: '15580',
      password: '123456',
      paciente,
      pacientes: [],
      user,
      message: null,
      messages: [],
      estado: [],
      indicadores: [],
      metas: [],
      columns: {
        name: {
          displayname: 'name',
          sortorder: 1
        }
      },
    }
  },
  created () {
    moment.locale('pt-br')
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
  computed: {
    tableFilter: function () {
      return this.findBy(this.pacientes, this.query, 'name')
    }
  },
  methods: {
    getFeedback () {
      axios({
        method: 'post',
        url: 'http://posmed.sytes.net:8081/feedback',
        params: {
          molecule: 'feedback',
          type: 'findIndicadorMeta',
          id: this.user._id
        }
      }).then(response => {
        this.estado = response.data
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    getMedicamento () {
      axios({
        method: 'post',
        url: 'http://posmed.sytes.net:8081/indicadorMedicamento',
        params: {
          molecule: 'indicadorMedicamento',
          type: 'findIndicadorMeta',
          id: this.user._id
        }
      }).then(response => {
        this.indicadores = response.data
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    getMetas () {
      axios({
        method: 'post',
        url: 'http://posmed.sytes.net:8081/indicadormeta',
        params: {
          molecule: 'indicadormeta',
          type: 'findIndicadorMeta',
          id: this.user._id
        }
      }).then(response => {
        this.metas = response.data
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    login (crm, password)  {
      axios({
        method: 'post',
        url: 'http://posmed.sytes.net:8081/medicos',
        params: {
          crm: crm,
          password: password,
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
    logout () {
      window.location.reload()
    },
    findBy (list, value, column) {
      return list.filter((item) => {
        return item[column].includes(value)
      })
    },
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
              type: 'numeric',
              label: 'Frequência',
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
              handler: (data) => {
                if  (JSON.stringify(data.nome) || JSON.stringify(data.posologia) || JSON.stringify(data.frequencia))
                  {
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
                      Toast.create('Medicamento Cadastrado')
                    })
                  }).catch(error => {
                    console.log(error)
                    Toast.create('Erro ao cadastrar o medicamento!')
                  })
                this.$socket.emit('listenForMedicine', data)
                }
                else
                {
                  Dialog.create({
                    title: 'Atenção!',
                    message: 'Todos os campos são obrigatórios!'
                  })
                }
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
              type: 'numeric',
              label: 'Frequencia',
              model: ''
            },
            periodo: {
              type: 'numeric',
              label: 'Periodo',
              model: ''
            }
          },
          buttons: [
            'Cancel',
            {
              label: 'Ok',
              handler: (data) => {
                if (JSON.stringify(data.descricao) || JSON.stringify(data.frequencia) || JSON.stringify(data.periodo) )
                {
                  axios({
                    method: 'post',
                    url: 'http://posmed.sytes.net:8081/consulta',
                    params: {
                      _id: consulta._id,
                      molecule: 'consulta',
                      type: 'findMetaAndUpdate',
                      metas: data
                    }
                  }).then(response => {
                    paciente.consultas.forEach( v => {
                      v.metas.push(data)
                      Toast.create("Metas Cadastrado")
                    })
                    this.$socket.emit('listenForMetas', data)
                  }).catch(error => {
                    console.log(error)
                    Toast.create("Erro ao cadastrar metas do paciente")
                  })
                }
                else{
                  Dialog.create({
                    title: 'Atenção!',
                    message: 'Todos os campos são obrigatórios!'
                  })
                }
              }
            }
          ]
        })
      ]
    },
		delMeta (index, consulta, meta, paciente) {
      Dialog.create({
        title: 'Atenção',
        message: 'Deseja cancelar a Meta cadastrada?',
        buttons: [
          {
            label: 'Não',
            handler () {
            }
          },
          {
            label: 'Sim',
            handler () {
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
                Toast.create('Meta excluída!')
              }).catch(error => {
                Toast.create('Erro ao cancelar a meta!')
              })
            }
          }
        ]
      })
    },
    delMedi (index, consulta, medicamento, paciente) {
      Dialog.create({
        title: 'Atenção',
        message: 'Deseja excluir o medicamento cadastrado?',
        buttons: [
          {
            label: 'Não',
            handler () {
            }
          },
          {
            label: 'Sim',
            handler () {
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
                  Toast.create('Medicamento excluído!')
              }).catch(error => {
                Toast.create('Erro ao excluír o medicamento!')
              })
            }
          }
        ]
      })
    },
    getPaciente (user) {
      this.user = user
      this.getMsg()
      this.getMetas()
      this.getMedicamento()
      this.getFeedback()
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
        // this.paciente = response.data
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
    .imagem
      margin 10% 0 0 37%
    input
      margin 15px 0 15px 0
    .l
      width 100%
      background-color #00164e
    .co
      width 30%
      margin 5% 0 0 34%
		.container
			width 100%
		.hello
			width 100%
			padding 4%
</style>
