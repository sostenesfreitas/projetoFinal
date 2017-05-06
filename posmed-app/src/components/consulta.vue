<template>
  <div class="body ">
    <div slot="header" class="toolbar bg-secondary">
      <q-toolbar-title :padding="0">
        Cadastro Consulta
      </q-toolbar-title>
    </div>
    <div class="content flex justify-around ">

      <div class="con">
        <div class="list">
          <p class="caption text-center">Consulta</p>
          <hr>
          <div class="item two-lines">
             <div class="item-content row items-center wrap">
               <div style="margin-right: 10px;" class="item-label">Diagnostico:</div>
               <input class="auto" v-model="consultaDiagnostico">
             </div>
           </div>
         <div class="item two-lines">
            <div class="item-content row items-center wrap">
              <div style="margin-right: 10px;" class="item-label">Cuidados:</div>
              <input class="auto" v-model="cuidadosDescricao">
            </div>
          </div>
          <div class="item two-lines">
              <div class="item-content row items-center wrap">
                <div style="margin-right: 10px;" class="item-label">Paciente:</div>
                <input class="auto" v-model="cpf">
              </div>
            </div>
            <div class="item two-lines">
               <div class="item-content row items-center wrap">
                 <div style="margin-right: 10px;" class="item-label">Medico:</div>
                 <q-select type="radio" v-model="select" :options="selectOptions"></q-select>
               </div>
             </div>
        </div>
      </div>

        <div class="con">
          <div class="list">
            <p class="caption text-center">Medicamentos</p>
            <hr>
            <div class="item two-lines">
               <div class="item-content row items-center wrap">
                 <div style="margin-right: 10px;" class="item-label">Nome:</div>
                 <input class="auto" v-model="medicamentosNome">
               </div>
             </div>
           <div class="item two-lines">
              <div class="item-content row items-center wrap">
                <div style="margin-right: 10px;" class="item-label">Frequencia:</div>
                <input class="auto" v-model="medicamentosFrequencia">
              </div>
            </div>
            <div class="item two-lines">
               <div class="item-content row items-center wrap">
                 <div style="margin-right: 10px;" class="item-label">Posologia:</div>
                 <input class="auto" v-model="medicamentosPosologia">
               </div>
             </div>
             <div class="item-content row items-center wrap justify-start">

               <div class="item two-lines">
                  <div class="item-content row items-center wrap">
                    <div style="margin-right: 10px;" class="item-label">Inicio:</div>
                    <q-select type="radio" v-model="select" :options="selectOptions"></q-select>
                  </div>
                </div>
                <div class="item two-lines">
                   <div class="item-content row items-center wrap">
                     <div style="margin-right: 10px;" class="item-label">Termino:</div>
                     <q-select type="radio" v-model="select" :options="selectOptions"></q-select>
                   </div>
                 </div>
             </div>
          </div>
        </div>

        <div class="con">
          <div class="list">
            <p class="caption text-center">Metas</p>
            <hr>
            <div class="item two-lines">
               <div class="item-content row items-center wrap">
                 <div style="margin-right: 10px;" class="item-label">Descricao:</div>
                 <input class="auto" v-model="metasDescricao">
               </div>
             </div>
           <div class="item two-lines">
              <div class="item-content row items-center wrap">
                <div style="margin-right: 10px;" class="item-label">Frequencia:</div>
                <input class="auto" v-model="metasFrequencia">
              </div>
            </div>
            <div class="item two-lines">
               <div class="item-content row items-center wrap">
                 <div style="margin-right: 10px;" class="item-label">Prazo:</div>
                 <input class="auto" v-model="metasPrazo">
               </div>
             </div>
          </div>
        </div>
    </div>

    <button class="positive outline absolute-bottom-right" style="right: 18px; bottom: 18px;" v-on:click="create()">Cadastrar</button>
  </div>
</template>
<script>

import axios from 'axios'
let selectOptions = []
export default {
  data () {
    return {
      model: '',
      consultaDiagnostico: 'louco',
      cuidadosDescricao: 'paulada',
      medicamentosNome: 'litio',
      medicamentosFrequencia: 'todo dia',
      medicamentosPeriodo: '01/01',
      medicamentosPosologia: 'sei la',
      metasDescricao: 'parar de ser doido',
      metasFrequencia: 'todo dia',
      metasPrazo: 'sempre',
      select: 'medicos',
      cpf: '00903380498',
      selectOptions
    }
  },
  mounted () {
    this.getMedicos()
  },
  methods: {
    create () {
      var c = []
      c = {
        diagnostico: this.consultaDiagnostico,
        medico: [{
          crm: this.select[0],
          nome: this.select[1]
        }],
        cuidados: [{
          descricao: this.cuidadosDescricao
        }],
        medicamentos: [{
          nome: this.medicamentosNome,
          frequencia: this.medicamentosFrequencia,
          periodo: [{
            data_inicial: '01/01',
            data_final: '02/02'
          }],
          posologia: this.medicamentosPosologia
        }],
        metas: [{
          descricao: this.metasDescricao,
          frequencia: this.metasFrequencia,
          prazo: this.metasPrazo
        }]
      }
      axios({
        method: 'post',
        url: 'http://localhost:8081/consulta',
        params: {
          obj: c,
          molecule: 'consulta',
          type: 'create'
        }
      }).then(response => {
        console.log(response)
        this.findAndUpdate(this.cpf, response.data._id)
      }).catch(error => {
        console.log(error)
      })
    },
    getMedicos () {
      axios({
        method: 'post',
        url: 'http://localhost:8081/medicos',
        params: {
          molecule: 'medico',
          type: 'findAll'
        }
      }).then(response => {
        selectOptions.length = 0
        response.data.forEach(value => {
          selectOptions.push({
            label: (value.name),
            value: [(value.crm), (value.name)]
          })
        })
      }).catch(error => {
        console.log(error)
      })
    },
    findAndUpdate (cpf, _id) {
      axios({
        method: 'post',
        url: 'http://localhost:8081/paciente',
        params: {
          cpf: cpf,
          molecule: 'paciente',
          type: 'findOneAndUpdate',
          consultas: _id
        }
      }).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="styl">
  .body
    width 100%
    color #858585
  .con
    width 30%
    margin-top 3%

</style>
