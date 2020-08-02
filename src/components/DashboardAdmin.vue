<template>
  <v-container>

    <div class="mt-5 mb-3">
      <h1>Selamat Datang {{currentUser.email}}</h1>
    </div>

    <div class="mb-5">
      <button class="btn save-btn">&#43; Add Admin</button>
  </div>


  </v-container>
</template>

<script>
import {auth} from "../firebase/firebase"
  export default {
    name:"dashboard",
    data(){
        return {
            currentUser : {}
        };
    },
    methods: {
      getCurrentUser() {
        var currentUser = auth.currentUser;
        this.currentUser = currentUser;

      }
    },
    created(){
      this.getCurrentUser();
    }
  }
</script>
