import Vue from 'vue'
import VueRouter from 'vue-router'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'



import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'
// import store from './store'
// import { auth } from './firebase/firebase'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueMaterial)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

