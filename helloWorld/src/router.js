import Vue from 'vue'
import VueRouter from 'vue-router'
// import auth from './components/auth'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: load('index'),
      children: [
        {path: '',
          component: load('body'),
          children: [
              {path: '/soso', component: load('soso')},
              {path: '/sintoma', component: load('sintoma')},
              {path: '/mal', component: load('mal')},
              {path: '', component: load('texto')}
          ]},
      {path: '/medico', component: load('medico')},
      {path: '/chat', component: load('chat')},
      {path: '/medicamento', component: load('medicamentos')}
      ]}
  ]
})
/** const routes = [
  {
    path: '/',
    component: load('index'),
    children: [
      {path: '',
        component: load('body'),
        children: [
            {path: '/soso', component: load('soso')},
            {path: '/sintoma', component: load('sintoma')},
            {path: '/mal', component: load('mal')},
            {path: '', component: load('texto')}
        ]},
    {path: '/medico', component: load('medico')},
    {path: '/chat', component: load('chat')},
    {path: '/medicamento', component: load('medicamentos')}
    ]}
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  auth.authUser().then(() => {
    next()
  })
})

export default router
**/
