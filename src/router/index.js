import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import {auth} from "../firebase/firebase"

import Home from '../views/Home.vue'

import users from "../components/Users/users.vue"
import addUser from "../components/Users/addUser.vue"
import detailUser from "../components/Users/detailUser.vue"
import editUser from "../components/Users/editUser.vue"

import AuthLayout from "../components/Auth/AuthLayout.vue"
import login from "../components/Auth/login.vue"
import signup from "../components/Auth/signup.vue"

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
        path: 'user/edit/:id',
        name: 'editUser',
        component: editUser
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
      {
        name:'signup',
        path:'signup',
        component: signup
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