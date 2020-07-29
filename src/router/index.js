import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import Home from '../views/Home.vue'
import MainLayout from '../components/MainLayout'


Vue.use(VueRouter)
Vue.use(Vuetify)

  const routes = [
  {
    path: '/admin',
    name: 'main',
    component: MainLayout,
    children :[
      {
        name:'Home',
        path:'/',
        component:Home

      },
    ]
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  // },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router