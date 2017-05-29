<template>
  <div class="soso">
    <div class="card c text-center">
      <div class="sosoPainel text-center">
        <h6>Mais ou menos.</h6>
      </div>
    <h6>{{pergunta}}</h6>
    <router-link to='/bot'><button type="button" name="button">Sim</button></router-link>
    <button type="button" name="button">Não</button>
    </div>
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
  .c
    border-radius 5px
  .soso
    text-align center
    color #808B96
  .sosoPainel
    background-color #808B96
    color #f5f6f1
    padding 2%
    margin-bottom 5%

</style>
