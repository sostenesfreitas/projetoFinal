import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

export default new VueRouter({

  routes: [
    {
      path: '/',
      component: load('Index'),
      children: [
        {path: '',
          component: load('body'),
          children: [
              {path: '/soso', component: load('soso')},
              {path: '/sintoma', component: load('sintoma')},
              {path: '/mal', component: load('mal')},
              {path: '', component: load('dicas')}
          ]},
      {path: '/medico', component: load('medico')},
      {path: '/medicamento', component: load('medicamentos')},
      {path: '/metas', component: load('metas')},
      {path: '/bot', component: load('chatBot')}
      ]
    },
    {path: '/chat', component: load('chat')}
  ]
})
