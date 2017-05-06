<template>
  <q-layout>
    <div class="container flex justify-center shadow-3">
      <div class="cont">
        <router-link to='/paciente'><button class="btn primary outline full-width" v-on:click="create()">Cadastrar Paciente</button>
        </router-link>
        <router-link to='/pacientes'><button class="btn primary outline full-width">Listar Pacientes</button>
        </router-link>
        <br>
        <router-link to='/medico'><button class="btn primary outline full-width" v-on:click="create()">Cadastrar Médico</button>
        </router-link>
        <router-link to='/medicos'><button class="btn primary outline full-width">Listar Médicos</button>
        </router-link>

      </div>
    </div>
  </q-layout>
</template>
<script>
</script>

<style lang="styl">
  .cont
    width 20%
    margin-top 25%
  .container
    width 100%
    background: url(../assets/pos.png) no-repeat center
</style>
