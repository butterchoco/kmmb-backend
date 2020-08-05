import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import {auth} from "../firebase/firebase"

import Home from '../views/Home.vue'

import users from "../components/Users/users.vue"

import event from "../components/event/event.vue"

import media from "../components/media/media.vue"



import AuthLayout from "../components/Auth/AuthLayout.vue"
import login from "../components/Auth/login.vue"


import MainLayout from '../components/MainLayout'



Vue.use(VueRouter)
Vue.use(Vuetify)

  const routes = [
  //  home path
  {
    path:'/',
    redirect:'/admin/auth'
  },
  {
    path: '/admin',
    name: 'main',
    component: MainLayout,
    meta : {
      requiresAuth : true
    },
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
        name:'event',
        path:'event',
        component:event,
      },
      {
        name:'media',
        path:'media',
        component:media,
      },

    ]
  },
  
  //path auth
  {
    path: '/admin/auth',
    component : AuthLayout,
    children:[
      {
        name:'login',
        path:'',
        component: login
      },
    ]
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser;
  const requiresAuth =to.matched.some(record => record.meta.requiresAuth);

  if(requiresAuth && !currentUser) next('/admin/auth');
  else if (!requiresAuth && currentUser) next('/admin/dashboard');
  else next();

});

export default router