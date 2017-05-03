<template>
  <div class="question">
    <div class="inner column">
      <label>O que você está sentindo ?</label>
      <input type="text" name="" placeholder="Digite aqui seu sintoma. "value="">
    </div>
    <button type="button" name="button"> Confirmar </button>
  </div>
</template>

<style lang="styl" scoped>
  .inner
    width 90%
    height 150px
    margin-left 5%
    text-align center
    color #ffffff
    border-radius 20px
    background-color #ffffff
    box-shadow 0 4px 50px 0 rgba(0, 0, 0, 0.2), 0 10px 30px 0 rgba(0, 0, 0, 0.19)
  label
    background-color #808B96
    width 100%
    font-size 20px
    border-radius 20px 20px 0 0px
    text-align center
    padding 5%
  input
    width 100%
    font-size 40px
    text-align center
    padding-top 4%
  .question button
    width 70%
    background-color#808B96
    font-size 30px
    color #ffffff
    padding 5%
    border-radius 10px
    margin 5% 0 0 15%
</style>
