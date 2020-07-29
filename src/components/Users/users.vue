<template>

<v-container>

  <div class="mt-5 mb-3">
    <h1>List of Users</h1>
  </div>

  <div class="mb-5">
    <router-link to="/admin/addUser">
        <button class="btn btn-info">&#43; Add New User</button>
    </router-link>
  </div>

  <table class="table table-hover">
      <thead class="table-borderless">
          <tr class="tr-top">
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Study Program</th>
              <th scope="col">Faculty</th>
              <th scope="col">University</th>
              <th scope="col">Role</th>
              
          </tr>
      </thead>
      <tbody class="tbody">
          <tr v-for="(user,index) in userList" :key="user.id" v-on:click="click(user)"  class="content">
              <th scope=row class="th-bottom" v-bind="add()">{{index+1}}</th>
              <td>{{user.fullName}}</td>
              <td>{{user.studyProgram}}</td>
              <td>{{user.faculty}}</td>
              <td>{{user.university}}</td>
              <td>{{user.role}}</td>
              
          </tr>
      </tbody>
  </table>
  


</v-container>



</template>

<script>

import { db } from '../../firebase/firebase'
// import router from '../../router'

  export default {
    name: 'usersList',
    data () {
      return {
        userList: [],
        counter2: 1
  
      }
    },

    methods: {
      async loadUser() {
        var userRef = await db.collection('user');
        userRef.onSnapshot(snap => {
          this.userList = [];
          snap.forEach(doc => {
            var user =doc.data();
            console.log(user);
            user.id = doc.id;
            this.userList.push(user);
          })
          console.log(this.userList);
        })
        
      },

      add(){
          this.counter2 ++;
      },

      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
    },
    created(){
      this.loadUser();
    }

  }
</script>