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
  export default {
    name: 'Explicacao',
    data () {
      return {
        parabens: 'Parabéns! Continue o bom trabalho.',
        aceita: 'Aceita uma dica de saúde ?',
        tituloDica: 'Dicas para viver bem com Diabetes - Tua Saúde',
        dica: 'A diabetes é uma doença que leva ao excesso de açúcar no sangue.'
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
