<template>
  <div class="bem">
    <div class="card c">
      <div class="bemPainel">
        <h6>Estou Bem.</h6>
      </div>
      <h6>{{parabens}}</h6>
      <h6>{{aceita}}</h6>
      <p>{{tituloDica}}</p>
      <p>{{dica}}</p>
    </div>
  </div>
</template>

<script>
  import { LocalStorage } from 'quasar'
  import axios from 'axios'
  export default {
    name: 'Explicacao',
    data () {
      return {
        parabens: 'Parabéns! Continue o bom trabalho.',
        aceita: 'Aceita uma dica de saúde ?',
        tituloDica: 'Recomendações para quem tem catarata.',
        dica: 'Evitar a exposição aos raios UVA dos equipamentos bronzeadores. Os raios ultravioleta solares (UVB) são menos prejudiciais.'
      }
    },
    created () {
      this.getPaciente()
    },
    methods: {
      getPaciente () {
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
          LocalStorage.set('idB', response.data._id)
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style lang="styl" scoped>
  .c
    border-radius 5px
  .bem
    color #808B96
    text-align center

  .bemPainel
    background-color #4CAF50
    color #f5f6f1
    padding 2%
    margin-bottom 5%
</style>
