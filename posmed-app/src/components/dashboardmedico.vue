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
					<q-parallax src="https://static.sharecare.com/promo/avatars/physician_avatar.png" :height="150">
						<div slot="loading">Loading...</div>
					</q-parallax>

					<div class="card-title text-center">
						Drª Maria Izabel

					</div>


					<div class="card-title">
						<p > - Pacientes</p>
						<q-search v-model="searchModel"></q-search>
					</div>

					<div class="list item-delimiter">
						<q-collapsible icon="face" label="Marcus Santos">
							<div>
								Milagre! Cura da visão. Aqui você não ganha mais $$$
							</div>
						</q-collapsible>
						<q-collapsible icon="face" label="Sostenes Freitas">
							<div>
								Sostenes Freitas
							</div>
						</q-collapsible>
						<q-collapsible icon="face" label="Fernando Careca">
							<div>
								Fernando "Careca"
							</div>
						</q-collapsible>

					</div>

				
					

					<br>
						<q-pagination v-model="page" :mim="1" :max="17"></q-pagination>
					

				</div>
				<div class="card" style="width: 200%; padding-right: 10px">
					
					<div class="card">
						<div class="item two-lines">
							<img class="item-primary" :src="'https://exelord.github.io/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg'">
							<div class="item-content">
								<div>Marcus Santos</div>
								<div>Amil</div>
							</div>
						</div>

						

					

							 <q-collapsible icon="alarm_add" label="Metas">
							


							<div class="list">
								
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
									<i class="item-secondary">delete_forever</i>
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
									<i class="item-secondary">delete_forever</i>
								</div>
								<hr class="inset">
							
							</div>

							<div class="card">
								<div class="card-title">
									<button class="primary" @click="clickMethod()">
										<i class="material-icons">add</i>
										Incluir Meta
									</button>
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
									<i class="item-secondary">delete_forever</i>
								</div>
								
								<br>
							</div>


							<div class="card">
								<div class="card-title">
									<button class="secondary" @click="clickMethod()">
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
					<q-parallax src="https://static.sharecare.com/promo/avatars/physician_avatar.png" :height="150">
						<div slot="loading">Loading...</div>
					</q-parallax>

					<div class="card-title text-center">
						Drª Maria Izabel

					</div>


					<div class="card-title">
						<p > - Pacientes</p>
					</div>
					<div class="list item-delimiter">
						<q-collapsible icon="face" label="Luna">
							<div>
								Milagre! Cura da visão. Aqui você não ganha mais $$$
							</div>
						</q-collapsible>
						<q-collapsible icon="face" label="Glauber">
							<div>
								Sostenes Freitas
							</div>
						</q-collapsible>
						<q-collapsible icon="face" label="Melo">
							<div>
								Fernando "Careca"
							</div>
						</q-collapsible>
					</div>


				</div>
			</div>

		</div>
	</div>
</div>
</template>
<style lang="stylus">
	.container
		padding-top 10px
	
</style>