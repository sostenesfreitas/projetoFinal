<template>
  <q-layout>
    <div class="layou-view">
      <router-link to="/chat" style="float: right">
        <i>more_vert</i>
      </router-link>
      <iframe src="http://posmed.sytes.net:8083">
      </iframe>
    </div>
  </q-layout>
</template>
<style lang="styl" scoped>
  div
    width 100%
  iframe
    width 100%
    height 95%
</style>
