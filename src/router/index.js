import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import Home from '../views/Home.vue'

import users from "../components/Users/users.vue"
import addUser from "../components/Users/addUser.vue"
import detailUser from "../components/Users/detailUser.vue"
import editUser from "../components/Users/editUser.vue"

import MainLayout from '../components/MainLayout'



Vue.use(VueRouter)
Vue.use(Vuetify)

  const routes = [
   // home path
  //  {
  //   path:'*',
  //   redirect:{name:'Home'}
  // },
  {
    path: '/admin',
    name: 'main',
    component: MainLayout,
    children :[
      {
        name:'Home',
        path:'dashboard',
        component:Home

      },
      {
        name:'users',
        path:'users',
        component:users,
      },
      {
        name:'addUser',
        path:'addUser',
        component: addUser
      },
      {
        path: 'user/:id',
        name: 'detailUser',
        component: detailUser
      },
      {
        path: 'editUser/:id',
        name: 'editUser',
        component: editUser
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