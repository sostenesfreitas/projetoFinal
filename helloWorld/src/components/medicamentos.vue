<template>
  <div class="cont">
    <div class="row inline wrap justify-between">
      <div class="text-center" style="padding: 3%; color: #505050"  v-for="medicamento in medicamentos">
          <img class="avatar" :src="medicamento.img">
          <h6>{{medicamento.nome}}</h6>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data: function () {
    return {
      medicamentos: [
        {
          nome: 'Rivotril',
          img: 'http://www.leaomuscle.com.br/imagem/index/7982680/G/2015_03_25_23.49.46.jpg'
        },
        {
          nome: 'litio',
          img: 'http://www.mundoboaforma.com.br/wp-content/uploads/2015/09/carbolitium.jpg'
        },
        {
          nome: 'dipirona',
          img: 'http://www.correio24horas.com.br/uploads/RTEmagicC_3bc11fda05.jpg.jpg'
        },
        {
          nome: 'tylenol',
          img: 'http://www.medivida.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/t/y/tylenol-dc.jpg'
        }
      ]
    }
  }
}
</script>

<style lang="styl" scoped>
  div
    width auto
  .cont
    width 100%
    padding 1%
</style>
