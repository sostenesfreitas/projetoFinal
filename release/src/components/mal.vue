<template>
  <div class="mal">
    <div class="malPainel">
      <h4>Estou mal.</h4>
    </div>
  <h5 id='mal'>{{pergunta}}</h5>
  <div slot="footer" class="secondary toolbar absolute-bottom flex wrap">
    <button type="button" name="button">Tenho dúvidas sobre o que estou sentindo</button>
    <button type="button" name="button">Não estou me sentindo bem!</button>
    <router-link to="/chat" style="color: #ffffff; margin-left: 45%">
      <button type="button" name="button">Outro</button>
    </router-link>
</div>
</div>
</template>
<script>
  export default {
    name: 'Explicacao',
    data () {
      return {
        pergunta: 'Qual o problema ?'
      }
    }
  }
</script>
<style lang="styl" scoped>
  .mal
    text-align center
    color #808B96
  .malPainel
    background-color #A569BD
    color #f5f6f1
    padding 2%
    margin-bottom 3%
  #mal
    margin-bottom 5%
  .mal button
    font-size 13px
    width 100%
    padding 4%
</style>
