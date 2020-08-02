import Vue from 'vue'
import VueRouter from 'vue-router'
import moment from 'moment'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'



// import store from './store'
import { auth } from './firebase/firebase'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueMaterial)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueMaterial)

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD MMMM YYYY')
  }
});

let app ='';
auth.onAuthStateChanged(() => {
  if(!app){
    app = new Vue({
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})

