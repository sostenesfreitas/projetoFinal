<template>
  <div class="bem">
    <div class="bemPainel">
      <h4>Estou Bem.</h4>
    </div>
    <h6>{{parabens}}<h6>
    <h6>{{aceita}}</h6>
    <p>{{tituloDica}}</p>
    <p>{{dica}}</p>
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

<style>

.bem {
  color: #808B96;
  text-align: center;
}
.bemPainel {
  background-color: #4CAF50;
  color: #f5f6f1;
  padding: 2%;
  border-radius: 10px;
  margin-bottom: 5%;
}

</style>
