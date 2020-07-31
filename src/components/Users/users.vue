<template>

<v-container>

  <div class="mt-5 mb-3">
    <h1>List of Users</h1>
  </div>

  <div class="mb-5">
    <router-link to="/admin/addUser">
        <button class="btn save-btn">&#43; Add New User</button>
    </router-link>
  </div>

  <table class="table table-hover">
      <thead class="table-borderless">
          <tr class="tr-top">
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Program Studi</th>
              <th scope="col">Fakultas</th>
              <th scope="col">Instansi</th>
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
        <b-form @submit.prevent="validateAndSubmit">
          <!-- Field Nama Lengkap -->
          <b-form-group>
            <div class="mb-2 label"><strong class="labelForm">Nama Lengkap *</strong></div>
            <b-form-input
              class="form-control"
              v-model="target.fullName"
              id="fullName"
              placeholder="Nama Lengkap"></b-form-input>
          </b-form-group>

          <!-- Field Role -->
          <b-form-group>
            <div class="mb-2 label"><strong class="labelForm">Role *</strong></div>
            <b-form-select
              v-model="target.role" 
              class="form-control">
                <b-form-select-option value="Admin">Admin</b-form-select-option>
                <b-form-select-option value="Ketua">Ketua</b-form-select-option>
                <b-form-select-option value="Anggota">Anggota</b-form-select-option>
                 
            </b-form-select>
          </b-form-group>

          <!-- Field Jenis Kelamin -->
          <b-form-group>
            <div class="mb-2 label"><strong class="labelForm">Jenis Kelamin *</strong></div>
            <b-form-radio v-model="target.gender" name="gender" value="Laki-Laki">Laki-Laki</b-form-radio>
            <b-form-radio v-model="target.gender" name="gender" value="Perempuan">Perempuan</b-form-radio>
          </b-form-group>

          <!-- Field tanggal lahir -->
          <b-form-group>
            <div class="mb-2 label"><strong class="labelForm">Tanggal Lahir *</strong></div>
            <b-form-datepicker id="datepickerEnd-invalid" :state="birthdateValid" class="mb-2" v-model="target.birthdate"></b-form-datepicker>
            
            <b-form-invalid-feedback id="input-live-feedback-end">
              Tanggal yang anda masukan tidak valid
            </b-form-invalid-feedback>

          </b-form-group>

          <!-- Field Angkatan -->
          <b-form-group>
            <div class="mb-2 label"><strong class="labelForm">Angkatan *</strong></div>
            <div class="row">
              <div class="col-4 col-sm-12 col-md-2">
                <b-form-radio name="generation" v-model="target.generation" value="2020"> 2020 </b-form-radio>
              </div>
              <div class="col-4 col-sm-12 col-md-10">
                <b-form-radio name="generation" v-model="target.generation" value="2019"> 2019 </b-form-radio>
              </div>
              <div class="col-4 col-sm-12 col-md-2">
                <b-form-radio name="generation" v-model="target.generation" value="2018"> 2018 </b-form-radio>
              </div>
              <div class="col-4 col-sm-12 col-md-10">
                <b-form-radio name="generation" v-model="target.generation" value="2017"> 2017 </b-form-radio>
              </div>
              <div class="col-4 col-sm-12 col-md-2">
                <b-form-radio name="generation" v-model="target.generation" value="2016"> 2016 </b-form-radio>
              </div>
              <div class="col-4 col-sm-12 col-md-10">
                <b-form-radio name="generation" v-model="target.generation" value="< 2016"> Sebelum 2016 </b-form-radio>
              </div>
            </div>
          </b-form-group>

          <!-- Field Program studi dan fakultas -->
          <b-form-group>
            <div class="row">
              <div class="col-6 col-sm-12 col-md-6">
                <div class="mb-2 label"><strong class="labelForm">Program Studi *</strong></div>
                <b-form-input class="form-control" :state="formStudyProgramTextOnlyLetter" v-model="target.studyProgram" id="studyProgram" placeholder="Psikologi / Sistem Informasi/ ..."></b-form-input>
              </div>

              <div class="col-6 col-sm-12 col-md-6">
                <div class="mb-2 label"><strong class="labelForm">Fakultas *</strong></div>
                <b-form-input class="form-control" :state="formFacultyTextOnlyLetter" v-model="target.faculty" id="Fakultas" placeholder="Fakultas ..."></b-form-input>
              </div>

            </div>
          </b-form-group>

          <!-- Field universitas -->
          <b-form-group>
            <div class="mb-2 label"><strong class="labelForm">Institusi *</strong></div>
            <b-form-input class="form-control" v-model="target.university" id="university" placeholder="Universitas / Politeknik ..." ></b-form-input>
          </b-form-group>

          <!-- Field Alamat -->
          <b-form-group>
            <div class="mb-2 label"><strong class="labelForm">Alamat Utama *</strong></div>
            <b-form-input class="form-control" v-model="target.address1" id="address1" placeholder="Jalan Alamat 1 No. 1 ..."></b-form-input>
          </b-form-group>

          <b-form-group>
            <div class="mb-2 label"><strong class="labelForm">Alamat Lainnya (Jika ada)</strong></div>
            <b-form-input class="form-control" v-model="target.address2" id="address2" placeholder="Jalan Alamat 2 No. 1 ..."></b-form-input>
          </b-form-group>


          <!-- Field Phone -->
          <b-form-group>
            <div class="mb-2 label"><strong class="labelForm">Nomor Telpon *</strong></div>
            <b-form-input class="form-control" v-model="target.phone" id="phone" placeholder="08xx" :state="formOnlyNumber"></b-form-input>
          </b-form-group>

          <!-- Field Email -->
          <b-form-group>
            <div class="mb-2 label"><strong class="labelForm">Email *</strong></div>
            <b-form-input class="form-control" v-model="target.email" id="email" placeholder="email@email.com"></b-form-input>
          </b-form-group>

          <!-- Field surat keterangan mahhasiswa aktif -->
          <b-form-group>
            <div class="mb-2 label"><strong class="labelForm">Surat Keterangan Mahasiswa Aktif *</strong></div>
            <b-form-input class="form-control" v-model="target.activeStudentCard" id="address1" placeholder="Jalan Alamat 2 No. 1 ..."></b-form-input>
          </b-form-group>

          <!-- Field Propsoal -->
          <b-form-group>
            <div class="mb-2 label"><strong class="labelForm">Proposal</strong></div>
            <span v-if="!target.isProposalUploaded" style="color:	#FF0000">Belum Upload Proposal</span>
            <b-form-input class="form-control" id="address1" placeholder="Proposal"></b-form-input>
          </b-form-group>

          <!-- Field bukti pembayaram -->
          <b-form-group>
            <div class="mb-2 label"><strong class="labelForm">Bukti Pembayaran</strong></div>
            <b-form-input class="form-control" id="address1" placeholder="Bukti Pembayaran"></b-form-input>
          </b-form-group>

          <!-- Field status verifikasi pembayaran -->
          <b-form-group>
            <div class="mb-2 label"><strong class="labelForm">Verifikasi Pembayaran</strong></div>
            <b-form-select
              v-model="target.isVerified" 
              class="form-control">
                <b-form-select-option value="Belum Membayar">Belum Membayar</b-form-select-option>
                <b-form-select-option value="Menunggu Pembayaran">Menunggu Pembayaran</b-form-select-option>
                <b-form-select-option value="Terverifikasi">Terverifikasi</b-form-select-option>
                <b-form-select-option value="Ditolak">Ditolak</b-form-select-option>
                 
            </b-form-select>
          </b-form-group>

          


          <button type="submit" class="btn save-btn mr-2 btn-block" :disabled=isDisable()>Ubah User</button>

        </b-form>

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
        formStudyProgramTextOnlyLetter(){
          var regex = /^[A-Za-z\s]+$/;
               
          if(this.target.studyProgram == ""){
            return null
          }else{
            if(regex.test(this.target.studyProgram)){

              return true;              
            }else{

              return false
            }
          }
        },
        formFacultyTextOnlyLetter(){
          var regex = /^[A-Za-z\s]+$/;
               
          if(this.target.faculty == ""){
            return null
          }else{
            if(regex.test(this.target.faculty)){

              return true;              
            }else{

              return false
            }
          }
        },
        formOnlyNumber(){
          var regex = /^[0-9]+$/;
               
          if(this.target.phone == ""){
            return null
          }else{
            if(regex.test(this.target.phone)){

              return true;              
            }else{

              return false
            }
          }
        }
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
        isDisable(){
            if(this.target.activeStudentCard == ""){return true;}
            if(this.target.address1 == ""){return true;}
            if(this.birthdateValid == null || !this.birthdateValid){return true;}
            if(this.target.role == ""){return true;}
            if(this.target.studyProgram == "" || !this.formStudyProgramTextOnlyLetter){return true;}
            if(this.target.university == ""){return true;}
            if(this.target.email == ""){return true;}
            if(this.target.faculty == "" || !this.formFacultyTextOnlyLetter){return true;}
            if(this.target.fullName == ""){return true;}
            if(this.target.gender == ""){return true;}
            if(this.target.generation == ""){return true;}
            if(this.target.phone == "" || !this.formOnlyNumber){return true;}
 
            return false;
        },


    },
    created(){
      this.loadUser();
    }

  }
</script>



