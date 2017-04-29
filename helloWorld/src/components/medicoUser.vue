<template>
<div class="cont row inline justify-start">
  <div class="">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Dr._Robert_Rey.jpg/200px-Dr._Robert_Rey.jpg" class="foto avatar">
  </div>
  <div class="user">
    <p>{{nome}}</p>
    <p>CRM: {{crm}}</p>
    <p>{{medico}}</p>
 </div>

</div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      nome: 'Doctor Hollywood',
      crm: 'MV#545454',
      medico: 'Cirurgião Plastico'
    }
  }
}
</script>

<style>

.user p{
  font-size: 15px;
  margin: 0
}

img.avatar {
  margin-right: 20%;
  height: 80px;
  width: 80px;
}

.cont  {
  width: 100%;
}

</style>
