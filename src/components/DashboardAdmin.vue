<template>
  <v-container>

    <div class="mt-5 mb-5">
      <h1>Selamat Datang {{currentUser.email}}</h1>
    </div>

    <div class="mb-5">
      <button class="btn save-btn" v-b-modal.modal-1>&#43; Tambah Admin</button>
    </div>

    <div class="row">
      <div v-for="user in adminList" :key="user.id" class="col-4 col-md-4 col-sm-12">
        <div class="card">
          <div class="card-header">
            {{user.nama}} <b-badge variant="primary" v-if="user.email == currentUser.email">Aktif</b-badge>
          </div>

          <div class="card-body">
            <div class="mb-4">
              <div class="mb-2 label"><strong class="labelForm">Email</strong></div>
              {{user.email}}
            </div>

            <div>
              <div class="mb-2 label"><strong class="labelForm">Phone</strong></div>
              {{user.phone}}
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal size="lg" ref="modalAdd" id="modal-1" title="Tambah Admin" v-bind:hide-footer="true">
      <div class="card">
        <div class="card-header"><strong class="labelForm">Formulir Tambah Admin</strong></div>
        <div class="card-body">
          <b-form @submit.prevent="validateAndSubmit">
            <!-- Field Nama Lengkap -->
            <b-form-group>
              <div class="mb-2 label"><strong class="labelForm">Nama Lengkap *</strong></div>
              <b-form-input
                class="form-control"
                v-model="admin.nama"
                id="fullName"
                placeholder="Nama Lengkap"></b-form-input>
            </b-form-group>
       
            
            <!-- Field Phone -->
            <b-form-group>
              <div class="mb-2 label"><strong class="labelForm">Nomor Telpon *</strong></div>
              <b-form-input class="form-control" v-model="admin.phone" id="phone" placeholder="08xx" :state="formOnlyNumber"></b-form-input>
            </b-form-group>

            <!-- Field Email -->
            <b-form-group>
              <div class="mb-2 label"><strong class="labelForm">Email *</strong></div>
              <b-form-input class="form-control" v-model="admin.email" id="email" placeholder="email@email.com"></b-form-input>
            </b-form-group>
               
            <div class="btn-group">
              <button type="submit" class="btn save-btn mr-2" :disabled=isDisable()>Tambah User</button>
              <button class="btn btn-light" @click="batal">Batal</button>
            </div>
          </b-form>

        </div>

      </div>
    </b-modal>

    <b-modal size="lg" ref="modalOk" hide-footer>
        <div class="container">
            <div class="d-block text-center">
              <h4>Admin berhasil ditambahkan</h4>
            </div>
        </div>
    </b-modal>


  </v-container>
</template>

<script>
import {auth ,db} from "../firebase/firebase"
  export default {
    name:"dashboard",
    data(){
        return {
            currentUser : {},
            admin:{
              nama:"",
              email:"",
              phone:"",
            },
            adminList : [],
        };
    },

    computed:{
      formOnlyNumber(){
          var regex = /^[0-9]+$/;
               
          if(this.admin.phone == ""){
            return null
          }else{
            if(regex.test(this.admin.phone)){

              return true;              
            }else{

              return false
            }
          }
        },

    },

    methods: {
      loadAdmin() {
        var userRef = db.collection('admin');
        userRef.onSnapshot(snap => {
          this.userList = [];
          snap.forEach(doc => {
            var user =doc.data();
            user.id = doc.id;
            this.adminList.push(user);
          })
         
        });

        
      },
      getCurrentUser() {
        var currentUser = auth.currentUser;
        this.currentUser = currentUser;
        

      },
      validateAndSubmit(e){
            e.preventDefault();
            this.errors = [];
            
            if(this.errors.length === 0){
              db.collection('admin').add({
                nama:this.admin.nama,
                email:this.admin.email,
                phone:this.admin.phone,
            }).then(() => {
                this.openModal()
              });
            }

        },
        openModal() {
            this.$refs['modalOk'].show();
            window.setTimeout(() => {
                this.$refs['modalAdd'].show();
            }, 2000);
        },

        batal(){
          this.$refs['modalOk'].hide();
        },
        isDisable(){
            if(this.admin.nama == ""){return true;}
            if(this.admin.email == ""){return true;}
            if(this.admin.phone == "" || !this.formOnlyNumber){return true;}
 
            return false;
        },
    },
    created(){
      this.getCurrentUser();
      this.loadAdmin();
    }
  }
</script>
