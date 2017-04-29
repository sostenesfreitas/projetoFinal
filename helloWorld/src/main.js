require(`quasar/dist/quasar.${__THEME}.css`)

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
import firebase from 'firebase'
import VueFire from 'vuefire'
import database from './components/database'
import { config } from './components/config'

Vue.use(Quasar)
Vue.use(VueFire)

const initApp = () => {
  firebase.initializeApp(config)
  database.init()
}
initApp()
Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    render: h => h(require('./App'))
  })
})
