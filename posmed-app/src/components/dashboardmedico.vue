<template>
	<div class="body">
		<div slot="header" class="toolbar bg-secondary">
			<q-toolbar-title :padding="0">
				DASHBOARD | MEDICO | POSMED
			</q-toolbar-title>
		</div>

		<div class="container">
			<div class="row">
				<div class="card" style="padding-right: 10px; padding-left: 10px">
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
				<div class="card" style="width: 200%; padding-right: 10px">

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

							<div class="list" >

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
										<i class="material-icons">add</i>
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
					<div>
						<div class="layout-padding">
							
							

					
				</div>
			</div>
		</div>
			</div>

		</div>
	</div>
</div>
</template>

<script>
  /* eslint-disable */
import { Dialog, Toast } from 'quasar'
import axios from 'axios'
let medico = ''
let name = ''
let pacientes = []
export default {
	 data () {
		 return {
			medico,
			name,
			pacientes
		 }
	},

	created () {
		this.getMedico('590ddbf60bf5bb5e2423f824')
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
		}

	}
}
</script>
	<style lang="stylus">
		.container
			padding-top 10px
</style>
