<template>
    <div class="content">
      <div class="list">
          <div class="list-label">Pacientes</div>
          <div class="item row justify-between" v-for="paciente in pacientes">
            <img class="item-primary" :src="paciente.imgUrl">
            <div class="item-content has-secondary">
              {{paciente.nome}}
            </div>
            <router-link class="lin" to="{ name: 'chat', params: { imgUrl: paciente.imgUrl}}">
              <i class="item-secondary">
                chat_bubble
              </i>
            </router-link>
          </div>
      </div>

      <div class="">

      </div>

      <div class="">

      </div>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        pacientes: [
          {
            nome: 'sóstenes',
            consulta: 'MV#545454',
            imgUrl: 'https://scontent.frec3-1.fna.fbcdn.net/v/t1.0-9/14639834_1166624550064544_2395708564775887266_n.jpg?oh=5693a9a8aaeccf0e7f73449813632d94&oe=5951E17A'
          },
          {
            nome: 'gustavo',
            consulta: 'MV#545454',
            imgUrl: 'https://scontent.frec3-1.fna.fbcdn.net/v/t1.0-1/p200x200/16830945_1464738056871682_8865135589162466816_n.jpg?oh=fc0e2f31771772f5cd09caeedf4511c5&oe=59640471'
          },
          {
            nome: 'guilherme',
            consulta: 'MV#545454',
            imgUrl: 'https://scontent.frec3-1.fna.fbcdn.net/v/t1.0-9/14925543_10154527491605731_5198909176989896366_n.jpg?oh=87aab5786c28da30c9aaf85b82a151de&oe=594E3338'
          }
        ]
      }
    }
  }
</script>
<style>
.content {
  width: 100%
}
.lin {
  padding: 4% 4% 0 0;
  color: #949494;
  margin-left: 5%
}
</style>
