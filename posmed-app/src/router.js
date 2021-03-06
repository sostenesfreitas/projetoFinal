import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

export default new VueRouter({
  routes: [
    { path: '/', component: load('dashboardmedico') },
    { path: '/consulta', component: load('consulta') },
    { path: '/paciente', component: load('paciente') },
    { path: '/pacientes', component: load('pacientes') },
    { path: '/medico', component: load('medico') },
    { path: '/medicos', component: load('medicos') },
    { path: '/painel', component: load('Index') },
    { path: '*', component: load('Error404') } // Not found
  ]
})
