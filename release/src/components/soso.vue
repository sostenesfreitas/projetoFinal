<template>
  <div class="soso">
    <div class="sosoPainel">
      <h4>Mais ou menos.</h4>
    </div>
  <h5>{{pergunta}}</h5>
<router-link to='/sintoma'><button type="button" name="button">Sim</button></router-link>
<button type="button" name="button">Não</button>
</div>
</template>
<script>
  export default {
    name: 'Explicacao',
    data () {
      return {
        pergunta: 'Você tem alguma queixa de saúde ?'
      }
    }
  }
</script>
<style lang="styl" scoped>
  .soso
    text-align center
    color #808B96
  .sosoPainel
    background-color #808B96
    color #f5f6f1
    padding 2%
    margin-bottom 5%
  .soso button
    padding 5%
    width 48%
    margin-top 10%
    font-size 40px
    border-radius 5px
</style>
