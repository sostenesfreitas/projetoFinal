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
                    <q-datetime v-model="modelInicio" type="date" label="Selecionar data"></q-datetime>
                  </div>
                </div>
                <div class="item two-lines">
                   <div class="item-content row items-center wrap">
                     <div style="margin-right: 10px;" class="item-label">Termino:</div>
                     <q-datetime v-model="modelTermino" type="date" label="Selecionar data"></q-datetime>
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


           <button class="btn positive outline full-width" v-on:click="findAndUpdate('00903380498')">VAI FILHÃO</button>

  </div>
</template>
<script>

import axios from 'axios'
let selectOptions = []
export default {
  data () {
    return {
      modelInicio: '',
      modelTermino: '',
      consultaDiagnostico: '',
      cuidadosDescricao: '',
      medicamentosNome: '',
      medicamentosFrequencia: '',
      medicamentosPeriodo: '',
      medicamentosPosologia: '',
      metasDescricao: '',
      metasFrequencia: '',
      metasPrazo: '',
      select: '',
      cpf: '',
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
            data_inicial: this.modelInicio,
            data_final: this.modelTermino
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
        url: 'http://posmed.sytes.net:8081/consulta',
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
        url: 'http://posmed.sytes.net:8081/medicos',
        params: {
          molecule: 'medico',
          type: 'findAll'
        }
      }).then(response => {
        selectOptions.length = 0
        response.data.forEach(value => {
          selectOptions.push({
            label: (value.name),
            value: [(value.crm), (value.name), (value._id)]
          })
        })
      }).catch(error => {
        console.log(error)
      })
    },
    findAndUpdate (cpf, _id) {
      axios({
        method: 'post',
        url: 'http://posmed.sytes.net:8081/paciente',
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
    },
    findMetaAndUpdate (id) {
      var meta = {
        descricao: this.metasDescricao,
        frequencia: this.metasFrequencia,
        prazo: this.metasPrazo
      }
      axios({
        method: 'post',
        url: 'http://posmed.sytes.net:8081/consulta',
        params: {
          _id: id,
          molecule: 'consulta',
          type: 'findMetaAndUpdate',
          metas: meta
        }
      }).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },
    getPacientes (cpf) {
      axios({
        method: 'post',
        url: 'http://posmed.sytes.net:8081/paciente',
        params: {
          cpf: cpf,
          molecule: 'paciente',
          type: 'find'
        }
      }).then(response => {
        this.findPacienteAndUpdate(response.data._id)
      }).catch(error => {
        console.log(error)
      })
    },
    findPacienteAndUpdate (id) {
      axios({
        method: 'post',
        url: 'http://posmed.sytes.net:8081/medicos',
        params: {
          _id: this.select[2],
          molecule: 'medico',
          type: 'findPacienteAndUpdate',
          paciente: id
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
