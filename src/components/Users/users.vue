<template>

<v-container>

  <div class="mt-5 mb-3">
    <h1>List of Users</h1>
  </div>

  <div class="mb-5">
    <router-link to="/admin/addUser">
        <button class="btn add-btn">&#43; Add New User</button>
    </router-link>
  </div>

  <table class="table table-hover">
      <thead class="table-borderless">
          <tr class="tr-top">
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Program Studi</th>
              <th scope="col">Fakultas</th>
              <th scope="col">Universitas</th>
              <th scope="col">Role</th>
              <th scope="col"></th>
          </tr>
      </thead>
      <tbody class="tbody">
          <tr v-for="(user,index) in userList" :key="user.id"  v-b-modal.modal-1 @click="click(user.id)"  class="content">
              <th scope=row class="th-bottom" v-bind="add()">{{index+1}}</th>
              <td>{{user.fullName}}</td>
              <td>{{user.studyProgram}}</td>
              <td>{{user.faculty}}</td>
              <td>{{user.university}}</td>
              <td>{{user.role}}</td>
              <td>{{user.isVerified}}</td>
              
          </tr>
      </tbody>
  </table>

  <b-modal ref="modalDetail" id="modal-1" title="Detail User" v-bind:hide-footer="true">
      <div class="card">
      <div class="card-header">Detail User</div>
      <div class="card-body">
        <form @submit.prevent="validateAndSubmit">
          <div v-if="errors.length">
                <div 
                class="alert alert-warning" 
                v-bind:key="index" 
                v-for="(error,index) in errors">{{error}}</div>
          </div>


          
          <div class="form-group">
            <div class="mb-2 label">Nama Lengkap</div>
            <input class="form-control" v-model="target.fullName" id="fullName" placeholder="Fullname" />
          </div>

            <div class="form-group">
                <div class="label">Role</div>
                <!-- <input class="form-control" id="departemen" placeholder="masukkan departemen" v-model="departemen"> -->
                <select id="role" v-model="target.role" class="form-control">
                    <option value=null>--</option>
                    <option value="Admin">Admin</option>
                    <option value="Leader">Leader</option>
                    <option value="Member">Member</option>
                </select>
            </div>

            <div class="form-group">
              <div class="radio">
                  <div class="label">Jenis Kelamin</div>
                  <input type="radio" name="gender" v-model="target.gender" value="Male"> Male
                  <br>
                  <input type="radio" name="gender" v-model="target.gender" value="Female"> Female
              </div>

            </div>



            

            <div class="form-group">
                <div class="mb-2 label">Tanggal Lahir</div>
                <b-form-datepicker id="datepickerEnd-invalid" :state="birthdateValid" class="mb-2" v-model="target.birthdate"></b-form-datepicker>
                
                <b-form-invalid-feedback id="input-live-feedback-end">
                  The date you entered is invalid
                </b-form-invalid-feedback>
            </div>
        

          <div class="form-group">
            <div class="mb-2 label">Surat Keterangan Mahasiswa Aktif</div>
            <input class="form-control" v-model="target.activeStudentCard" id="activeStudentCard" placeholder="Nomor Pokok Mahasiswa / Nomor Induk Mahasiswa" />
          </div>

          <div class="form-group">
            <div class="mb-2 label">Angkatan</div>
            <div class="radio">
              
              <div class="row">
                <div class="col-4 col-sm-12 col-md-4">
                  <input type="radio" name="gender" v-model="target.generation" value="2020"> 2020
                </div>
                <div class="col-4 col-sm-12 col-md-8">
                  <input type="radio" name="gender" v-model="target.generation" value="2019"> 2019
                </div>
                <div class="col-4 col-sm-12 col-md-4">
                  <input type="radio" name="gender" v-model="target.generation" value="2018"> 2018
                </div>
                <div class="col-4 col-sm-12 col-md-8">
                  <input type="radio" name="gender" v-model="target.generation" value="2017"> 2017
                </div>
                <div class="col-4 col-sm-12 col-md-4">
                  <input type="radio" name="gender" v-model="target.generation" value="2016"> 2016
                </div>
                <div class="col-4 col-sm-12 col-md-8">
                  <input type="radio" name="gender" v-model="target.generation" value="< 2016"> Sebelum 2016
                </div>
              </div>
              
            </div>
          </div>
          
          <div class="row">
            <div class="col-sm-6 col-xs-12">
              <div class="form-group">
                <div class="mb-2 label">Program Studi</div>
                <input class="form-control" v-model="target.studyProgram" id="studyProgram" placeholder="Psikologi / Sistem Informasi/ ..." />
              </div>
            </div>

            <div class="col-sm-6 col-xs-12">
              <div class="form-group">
                <div class="mb-2 label">Fakultas</div>
                <input class="form-control" v-model="target.faculty" id="faculty" placeholder="Fakultas ..." />
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="mb-2 label">Universitas</div>
            <input class="form-control" v-model="target.university" id="university" placeholder="Universitas ..." />
          </div>


          <div class="form-group">
            <div class="mb-2 label">Alamat Utama</div>
            <input class="form-control" v-model="target.address1" id="address1" placeholder="Jalan Alamat 1 No. 1 ..." />
          </div>

          <div class="form-group">
            <div class="mb-2 label">Alamat Lainnya (Jika Ada)</div>
            <input class="form-control" v-model="target.address2" id="address2" placeholder="Jalan Alamat 2 No. 1 ..." />
          </div>

          <div class="form-group">
            <div class="mb-2 label">Nomor Telpon</div>
            <input class="form-control" v-model="target.phone" id="phone" placeholder="08xxxxxxxxxx" />
          </div>

          <div class="form-group">
            <div class="mb-2 label">Email</div>
            <input class="form-control" v-model="target.email" id="email" placeholder="email@email.com" />
          </div>

          <div class="row">
            <div class="col-sm-6 col-xs-12">
                <div class="form-group">
                    <div class="radio">
                        <div class="label">Uploaded Proposal</div>
                        <input type="radio" name="isProposalUploaded" v-model="target.isPropsoalUploaded" value=true> Yes
                        <br>
                        <input type="radio" name="gender" v-model="target.isProposalUploaded" value=false> No
                    </div>

                </div>
            </div>

            <div class="col-sm-6 col-xs-12">
                <div class="form-group">
                    <div class="radio">
                        <div class="label">Verified User</div>
                        <input type="radio" name="isVerified" v-model="target.isVerified" value=true> Yes
                        <br>
                        <input type="radio" name="isVerified" v-model="target.isverified" value=false> No
                    </div>
                </div>

            </div>
          </div>

          <button type="submit" class="btn save-btn btn-block mr-2">Ubah Data</button>
   

        </form>
        <br/>
        <button class="btn btn-light btn-block" v-b-modal.modal-del>Hapus User</button>

      </div>

    </div>
  </b-modal>

  <b-modal size="lg" ref="modalOk" hide-footer>
      <div class="container">
          <div class="d-block text-center">
            <h4>Edit User Succsess</h4>
          </div>
      </div>
  </b-modal>

  <b-modal size="lg" ref="modalDelete" id="modal-del" hide-footer>
       <div class="detail">
            <p class="title">User ini akan dihapus ? </p>
            <hr>
            <div class="btn-group">
                <button type="submit" class="btn btn-danger mr-2" @click="deleteUser()">Delete</button>
                <button class="btn btn-light" @click="hideModal">Cancel</button>
            </div>
        </div>
  </b-modal>

  


  


</v-container>



</template>

<script>
import moment from 'moment'
import { db } from '../../firebase/firebase'
// import router from '../../router'

  export default {
    name: 'usersList',
    data () {
      return {
        userList: [],
        counter2: 1,
        target:{},
        errors : [],
        userId:"",
  
      }
    },

    computed: {
        birthdateValid(){
            if(this.target.birthdate == ""){
                return null;
            }
            else{
                var currentDate =moment();
                if(moment(this.target.birthdate).isAfter(currentDate)){
                    return false;
                }
                return true;
            }
        },
    },

    methods: {
      async loadUser() {
        var userRef = await db.collection('user');
        userRef.onSnapshot(snap => {
          this.userList = [];
          snap.forEach(doc => {
            var user =doc.data();
            user.id = doc.id;
            this.userList.push(user);
          })
         
        })
        
      },


      click(userId){
        this.userId = userId;

        db.collection('user').doc(this.userId).get().then(doc => {
          // console.log(doc.data());
          this.target = doc.data();
        });
        console.log(this.target.gender);

      },


      add(){
          this.counter2 ++;
      },

      validateAndSubmit(e){
            e.preventDefault();
            this.errors = [];
            if(!this.birthdateValid){
                this.errors.push("Your Birthdate is Invalid");
            }
            if(this.errors.length === 0){
                if(this.target.address2 != null){
                    if(this.target.isProposalUploaded == "true"){
                        this.target.isProposalUploaded = true;
                    }   
                    else{
                        this.target.isProposalUploaded =false;
                    }

                    if(this.target.isVerified == "true"){
                        this.target.isVerified = true;
                    }   
                    else{
                        this.target.isVerified =false;
                    }

                    db.collection('user').doc(this.userId).update({
                        activeStudentCard:this.target.activeStudentCard,
                        address1:this.target.address1,
                        address2:this.target.address2,
                        birthdate:moment(this.target.birthdate).format("YYYY-MM-DD"),
                        email:this.target.email,
                        faculty:this.target.faculty,
                        fullName:this.target.fullName,
                        gender:this.target.gender,
                        generation:this.target.generation,
                        phone:this.target.phone,
                        role:this.target.role,
                        studyProgram:this.target.studyProgram,
                        university:this.target.university,
                        isProposalUploaded : this.target.isProposalUploaded,
                        isVerified : this.target.isVerified,
                    }).then(() => {
                        this.openModal()
                    });

                }else{
                    if(this.target.isProposalUploaded == "true"){
                        this.target.isProposalUploaded = true;
                    }   
                    else{
                        this.target.isProposalUploaded =false;
                    }

                    if(this.target.isVerified == "true"){
                        this.target.isVerified = true;
                    }   
                    else{
                        this.target.isVerified =false;
                    }

                    db.collection('user').doc(this.userId).update({
                        activeStudentCard:this.target.activeStudentCard,
                        address1:this.target.address1,
                        birthdate:moment(this.target.birthdate).format("DD MMMM YYYY"),
                        email:this.target.email,
                        faculty:this.target.faculty,
                        fullName:this.target.fullName,
                        gender:this.target.gender,
                        generation:this.target.generation,
                        phone:this.target.phone,
                        role:this.target.role,
                        studyProgram:this.target.studyProgram,
                        university:this.target.university,
                        isProposalUploaded : this.target.isProposalUploaded,
                        isVerified : this.target.isVerified,
                    }).then(() => {
                        this.openModal()
                    });
                }
            
            }

        },

        openModal() {
            this.$refs['modalOk'].show();
            window.setTimeout(() => {
               this.$refs['modalOk'].hide();
            }, 2000);
        },

        deleteUser(){
            db.collection('user').doc(this.userId).delete().then(() =>{
                this.hideModal();
                this.$refs['modalDetail'].hide();
            })
        },
        hideModal(){
          this.$refs['modalDelete'].hide();
        },


    },
    created(){
      this.loadUser();
    }

  }
</script>

<style scoped>
.add-btn{
  background-color: #3282B8;
  color: white;
}
</style>>

