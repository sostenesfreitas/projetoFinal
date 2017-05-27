<template>
  <div>
    <div class="layout-padding">
      <iframe src="http://posmed.sytes.net:8083">

      </iframe>
      <div id="demo">
        <q-search v-model="query"></q-search>
        <div v-for="item in tableFilter">
          <div v-for="(head, key) in columns" @click="test(item)">{{item[key]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
export default {

  created () {
    this.getMedico()
  },
  data () {
    return {
      pacientes: [],
      medico: '',
      columns: {
        name: {
          displayname: 'name',
          sortorder: 1
        }
      },
      query: ''
    }
  },
  computed: {
    tableFilter: function () {
      return this.findBy(this.pacientes, this.query, 'name')
    }
  },
  methods: {
    findBy (list, value, column) {
      return list.filter((item) => {
        return item[column].includes(value)
      })
    },
    test (name) {
      this.$socket.emit('listenForMetas', name.name)
      console.log(name.name)
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
        console.log(this.pacientes)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  iframe
    width 100%
    height 500px
</style>
