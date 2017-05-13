<template>
	<q-layout>
		<div slot="header" class="toolbar bg-secondary">
			<q-toolbar-title :padding="0">
				DASHBOARD | MEDICO | POSMED
			</q-toolbar-title>
		</div>


			<div class="container row">
				<div class="card" style="padding-right: 10px; padding-left: 10px;  max-width: 350px;">
					<q-parallax src="http://cdn2.hubspot.net/hub/441120/file-2752707415-jpg/blog-files/dra.-maria-isabel.jpg" :height="150">
						<div slot="loading">Loading...</div>
					</q-parallax>

					<div class="card-title text-center">
						Dra. {{medico.name}}
					</div>

					<div class="list item-delimiter">
						<div class="toolbar text-center">
							<q-toolbar-title :padding="1">
								Pacientes
							</q-toolbar-title>
					</div>
						<br>
						<q-search v-model="searchModel"></q-search>
						<br>

						<div v-for="paciente in pacientes" >
							<q-collapsible icon="face" :label="paciente.name">
								<div>
									Milagre! Cura da visão. Aqui você não ganha mais
								</div>
							</q-collapsible>
						</div>
					</div>

					<br>
					<q-pagination v-model="page" :mim="1" :max="17"></q-pagination>
				</div>
				<div class="card" style="width: 150%; padding-right: 10px">

					<div class="card">
						<div class="item two-lines">
							<img class="item-primary" :src="'https://instagram.frec3-2.fna.fbcdn.net/t51.2885-19/s320x320/13736795_834349220033285_699892460_a.jpg'">
							<div class="item-content">
								<div>Marcus Santos</div>
								<div>Amil</div>
							</div>
						</div>
				 <q-collapsible icon="alarm_add" label="Metas">
				 <div class="class" style="background-color: #ffffff">
						<div class="list" v-for="">
								<div class="list-label inset">Atividade Fisica</div>
								<div class="item two-lines" v-for="n in 2">
									<div class="item-primary bg-grey-6 text-white">
										<i class="material-icons">directions_run</i>
									</div>
									<div class="item-content has-secondary">
										<div>Repouso</div>
										<div>Dormir 8 Horas</div>
										<div>todos os Dias</div>
									</div>
										<div class="item-secondary item-link"><button>	<i class="">delete_forever</i> </button></div>
								</div>
								<hr class="inset">
								<div class="list-label inset">Dieta</div>
								<div class="item two-lines" v-for="n in 1">
									<div class="item-primary bg-primary text-white">
										<i class="material-icons">local_dining</i>
									</div>
									<div class="item-content has-secondary">
										<div>Legumes</div>
										<div>Adicionar ao almoço</div>
										<div>Diaria</div>
									</div>

									<div class="item-secondary item-link"><button>	<i class="">delete_forever</i> </button></div>

								</div>
								<hr class="inset">

							</div>

							<div class="card">
								<div class="card-title">
									<button class="primary" @click="addMark()">
z										<i class="material-icons">add</i>
										Incluir Meta
									</button>
								</div>
							</div>

							</div>
							</q-collapsible>
						 <q-collapsible icon="local_pharmacy" label="Medicamentos">
							<div class="list">

								<div class="item two-lines" v-for="n in 1">
									<div class="item-primary bg-grey-6 text-white">
										<i class="material-icons">healing</i>
									</div>
									<div class="item-content has-secondary">
										<div>Toragesic</div>
										<div>8 Horas em 8 H</div>
										<div>5 Dias</div>
									</div>
									<div class="item-secondary item-link"><button >	<i class="">delete_forever</i> </button></div>
								</div>

								<br>
							</div>


							<div class="card">
								<div class="card-title">
									<button class="secondary" @click="addMedicines()">
										<i class="material-icons">add</i>
										Incluir Medicamentos
									</button>
								</div>
							</div>

							</q-collapsible>





							<q-collapsible icon="done_all" label="Indicadores" >

								<div class="list">
									<div class="item two-lines" v-for="n in 1">
										<div class="item-primary bg-green-6 text-white">
											<i class="material-icons">directions_run</i>
										</div>
										<div class="item-content has-secondary">
											<div>Respouso</div>
											<div>Realizado</div>
											<div>Em cumprimento</div>
										</div>
										<i class="item-secondary">event_available</i>
									</div>
									<hr class="inset">

									<div class="item two-lines" v-for="n in 1">
										<div class="item-primary bg-red-6 text-white">
											<i class="material-icons">healing</i>
										</div>
										<div class="item-content has-secondary">
											<div>Toragesic</div>
											<div>Cancelado</div>
											<div>Reação Alérgica</div>
										</div>
										<i class="item-secondary">event_busy</i>
									</div>
									<hr class="inset">
								</div>
							</q-collapsible>

					</div>


				</div>

				<div class="card" style="padding-right: 10px">
					<q-layout>
    <div class="layout-view">
      <!-- Header Toolbar -->
      <div slot="header" class="c toolbar ">
        <div class="user_container row">
          <div class="">
            <router-link to="/" style="color: #ffffff">
              <i>keyboard_arrow_left</i>
            </router-link>
          </div>
          <div class="user" style="margin-left: 10px;">
            <p>Chat</p>
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
  <div slot="footer" class="toolbar c">
    <input @keyup.enter="send(message)" class="full-width" type="text" v-model="message" placeholder="Digite aqui...">
  </div>
  </q-layout>
				</div>
		</div>


</q-layout>
</template>

<script>
  /* eslint-disable */
import { LocalStorage } from 'quasar'
import { Dialog, Toast } from 'quasar'
import axios from 'axios'
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
		 	messages: []
		 }
	},

	created () {
		this.getMedico('590ddbf60bf5bb5e2423f824')
		this.loginCache()
    	this.$options.sockets.listenForMessage = (message) => {
        		this.messages.push(message)
   		 	}
	},

	methods: {
		getMedico(id) {
			axios ({
				method: 'post',
				url: 'http://posmed.sytes.net:8081/medicos',
				params: {
					_id: id,
					molecule: 'medico',
					type: 'populate',
					populate: 'pacientes'
				}
			}).then(response => {
				this.medico = response.data
				this.pacientes = this.medico.pacientes
			}).catch(error => {
				console.log(error)
			})
		},

		addMedicines(){

			form: [
			Dialog.create({
				title: 'Incluir Medicamentos',
				message: 'Preescreva o medicamento para o seu paciente',
				form: {
					name: {
						type: 'textbox',
						label: 'Nome',
						model: ''
					},
					age: {
						type: 'numeric',
						label: 'Frequência (Dia)',
						model: 10,
						min: 5,
						max: 90
					},
					comments: {
						type: 'textarea',
						label: 'Observação',
						model: ''
					}
				},
				buttons: [
				'Cancel',
				{
					label: 'Ok',
					handler (data) {
						Toast.create(JSON.stringify(data.name))
					}
				}
				]

			})
			]
		},

		addMark() {
			form: [
		            Dialog.create({
		              title: 'Incluir Metas',
		              message: 'Informe a metas para o seu paciente',
		              form: {
                name: {
                  type: 'textbox',
                  label: 'Descrição',
                  model: ''
                },
                age: {
                  type: 'numeric',
                  label: 'Frequencia (Dias)',
                  model: 10,
                  min: 5,
                  max: 90
                },
                tags: {
                  type: 'chips',
                  label: 'Tipo',
                  model: ['Dieta', 'Atividade Fisica']
                },
                comments: {
                  type: 'textarea',
                  label: 'Observação',
                  model: ''
                }
              },
		              buttons: [
		                'Cancel',
		                {
		                  label: 'Ok',
		                  handler (data) {
		                    Toast.create("Medicamento Cadastrado")
		                  }
		                }
		              ]
		            })
			]
		},
		getPaciente(cpf) {
			axios ({
				method: 'post',
				url: 'http://posmed.sytes.net:8081/paciente',
				params: {
					cpf: cpf,
					molecule: 'paciente',
					type: 'populate',
					populate: 'consultas'
				}
			}).then(response => {
				this.paciente = response.data
				console.log(this.paciente)
			}).catch(error => {
				console.log(error)
			})
		},
		loginCache () {
			user.id = LocalStorage.get.item('id')
			user.avatar = LocalStorage.get.item('avatar')
			user.name = LocalStorage.get.item('name')
		},
		send: function (message) {
			let hora = new Date().getTime()
			var data = {
				created: hora,
				uid: user.uid,
				msg: message,
				user: user.avatar
			}
			this.$socket.emit('listenForMessage', data)
			this.message = ''
		},
		isUser: uid => {
			return user.uid === uid
		},
		hora: function () {
			var hour = new Date().getTime()
			return hour
		}

	},

	watch: {
		messages: function () {
			setTimeout(function () {
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
		.container
			padding-top 10px
		.c
			background-color: #0a3f5e
		.hello
			width 100%
			padding 4%
</style>
