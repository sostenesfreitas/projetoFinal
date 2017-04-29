<template>
<div class="user_container">
  <img :src="img" class="foto avatar">
  <div class="user">
    <p>{{user}}</p>
 </div>
 <button style="margin-left: 40%" v-show="user.uid" @click="logout">
    <i>exit_to_app</i>
  </button>
</div>
</template>

<script>
// import auth from './auth'

// const user = auth.getUser()
export default {
  name: 'index',
  data: function () {
    return {
      user: 'miojo',
      consulta: 'MV#545454',
      medico: 'Pompeu Pompilho',
      img: 'http://www.ultracurioso.com.br/wp-content/uploads/2015/08/miojo1.jpg'
    }
  },
  methods: {
    logout () {
      console.log('test')
    }// auth.logout
  }

}
</script>

<style>
.user_container{
  display: flex;
}

p{
  margin: 1%;
  font-size: 15px;
}
.user{
  flex: 1 1 auto;
  margin: 3% 1% 2% 2%;
}
img.avatar {
  margin: 2% 1% 1% 1%;
  height: 55px;
  width: 55px;
}
#logo {
  border-radius: 100%;
  width: 20%;
  height: 20%;
  margin: 1%;
}
.btn {
    margin-top: 5%;
    height: 70px
}
</style>
