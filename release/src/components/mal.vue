<template>
  <div class="mal">
    <div class="card c text-center">
      <div class="malPainel">
        <h6>Estou mal.</h6>
      </div>
      <h6 id='mal'>{{pergunta}}</h6>
      <div  class="secondary column justify-center">
        <router-link to="/bot"  style="color: #808B96; ">
          <button type="button" name="button">Tenho dúvidas sobre o que estou sentindo</button>
        </router-link>
        <router-link to="/bot" style="color: #808B96; ">
          <button type="button" name="button">Não estou me sentindo bem!</button>
        </router-link>
        <router-link to="/chat" style="color: #808B96;">
          <button type="button" name="button">Outro</button>
        </router-link>
      </div>
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
  .c
    border-radius 5px
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

</style>
