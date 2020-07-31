<template>
  <v-container>
    <div class="mt-5 mb-3">
        <h1>Tambah User Baru</h1>
    </div>

    <br />
    <div class="card">
      <div class="card-header"><strong class="labelForm">Formulir Tambah User</strong></div>
      <div class="card-body">
        <b-form @submit.prevent="validateAndSubmit">
          <!-- Field Nama Lengkap -->
          <b-form-group>
            <div class="mb-2 label"><strong class="labelForm">Nama Lengkap *</strong></div>
            <b-form-input
              class="form-control"
              v-model="user.fullName"
              id="fullName"
              placeholder="Nama Lengkap"></b-form-input>
          </b-form-group>

          <!-- Field Role -->
          <b-form-group>
            <div class="mb-2 label"><strong class="labelForm">Role *</strong></div>
            <b-form-select
              v-model="user.role" 
              class="form-control">
                <b-form-select-option value="Admin">Admin</b-form-select-option>
                <b-form-select-option value="Ketua">Ketua</b-form-select-option>
                <b-form-select-option value="Anggota">Anggota</b-form-select-option>
                 
            </b-form-select>
          </b-form-group>

          <!-- Field Jenis Kelamin -->
          <b-form-group>
            <div class="mb-2 label"><strong class="labelForm">Jenis Kelamin *</strong></div>
            <b-form-radio v-model="user.gender" name="gender" value="Laki-Laki">Laki-Laki</b-form-radio>
            <b-form-radio v-model="user.gender" name="gender" value="Perempuan">Perempuan</b-form-radio>
          </b-form-group>

          <!-- Field tanggal lahir -->
          <b-form-group>
            <div class="mb-2 label"><strong class="labelForm">Tanggal Lahir *</strong></div>
            <b-form-datepicker id="datepickerEnd-invalid" :state="birthdateValid" class="mb-2" v-model="user.birthdate"></b-form-datepicker>
            
            <b-form-invalid-feedback id="input-live-feedback-end">
              Tanggal yang anda masukan tidak valid
            </b-form-invalid-feedback>

          </b-form-group>

          <!-- Field Angkatan -->
          <b-form-group>
            <div class="mb-2 label"><strong class="labelForm">Angkatan *</strong></div>
            <div class="row">
              <div class="col-4 col-sm-12 col-md-2">
                <b-form-radio name="generation" v-model="user.generation" value="2020"> 2020 </b-form-radio>
              </div>
              <div class="col-4 col-sm-12 col-md-10">
                <b-form-radio name="generation" v-model="user.generation" value="2019"> 2019 </b-form-radio>
              </div>
              <div class="col-4 col-sm-12 col-md-2">
                <b-form-radio name="generation" v-model="user.generation" value="2018"> 2018 </b-form-radio>
              </div>
              <div class="col-4 col-sm-12 col-md-10">
                <b-form-radio name="generation" v-model="user.generation" value="2017"> 2017 </b-form-radio>
              </div>
              <div class="col-4 col-sm-12 col-md-2">
                <b-form-radio name="generation" v-model="user.generation" value="2016"> 2016 </b-form-radio>
              </div>
              <div class="col-4 col-sm-12 col-md-10">
                <b-form-radio name="generation" v-model="user.generation" value="< 2016"> Sebelum 2016 </b-form-radio>
              </div>
            </div>
          </b-form-group>

          <!-- Field Program studi dan fakultas -->
          <b-form-group>
            <div class="row">
              <div class="col-6 col-sm-12 col-md-6">
                <div class="mb-2 label"><strong class="labelForm">Program Studi *</strong></div>
                <b-form-input class="form-control" :state="formStudyProgramTextOnlyLetter" v-model="user.studyProgram" id="studyProgram" placeholder="Psikologi / Sistem Informasi/ ..."></b-form-input>
              </div>

              <div class="col-6 col-sm-12 col-md-6">
                <div class="mb-2 label"><strong class="labelForm">Fakultas *</strong></div>
                <b-form-input class="form-control" :state="formFacultyTextOnlyLetter" v-model="user.faculty" id="Fakultas" placeholder="Fakultas ..."></b-form-input>
              </div>

            </div>
          </b-form-group>

          <!-- Field universitas -->
          <b-form-group>
            <div class="mb-2 label"><strong class="labelForm">Universitas *</strong></div>
            <b-form-input class="form-control" v-model="user.university" id="university" placeholder="Universitas ..." ></b-form-input>
          </b-form-group>

          <!-- Field Alamat -->
          <b-form-group>
            <div class="mb-2 label"><strong class="labelForm">Alamat Utama *</strong></div>
            <b-form-input class="form-control" v-model="user.address1" id="address1" placeholder="Jalan Alamat 1 No. 1 ..."></b-form-input>
          </b-form-group>

          <b-form-group>
            <div class="mb-2 label"><strong class="labelForm">Alamat Lainnya (Jika ada)</strong></div>
            <b-form-input class="form-control" v-model="user.address2" id="address2" placeholder="Jalan Alamat 2 No. 1 ..."></b-form-input>
          </b-form-group>


          <!-- Field Phone -->
          <b-form-group>
            <div class="mb-2 label"><strong class="labelForm">Nomor Telpon *</strong></div>
            <b-form-input class="form-control" v-model="user.phone" id="phone" placeholder="08xx" :state="formOnlyNumber"></b-form-input>
          </b-form-group>

          <!-- Field Email -->
          <b-form-group>
            <div class="mb-2 label"><strong class="labelForm">Email *</strong></div>
            <b-form-input class="form-control" v-model="user.email" id="email" placeholder="email@email.com"></b-form-input>
          </b-form-group>

          <!-- Field surat keterangan mahhasiswa aktif -->
          <b-form-group>
            <div class="mb-2 label"><strong class="labelForm">Surat Keterangan Mahasiswa Aktif *</strong></div>
            <b-form-input class="form-control" v-model="user.activeStudentCard" id="address1" placeholder="Jalan Alamat 2 No. 1 ..."></b-form-input>
          </b-form-group>
        
          <div class="btn-group">
            <button type="submit" class="btn save-btn mr-2" :disabled=isDisable()>Tambah User</button>
            <button class="btn btn-light" @click="batal">Batal</button>
          </div>
        </b-form>
         


    



      </div>

    </div>

    <b-modal size="lg" ref="modalOk" hide-footer>
        <div class="container">
            <div class="d-block text-center">
              <h4>User berhasil ditambahkan</h4>
            </div>
        </div>
    </b-modal>

  </v-container>
</template>

<script>
import moment from 'moment'

import { db } from "../../firebase/firebase"
export default {
    name : "addUser",
    data(){
        return{
            user:{
                activeStudentCard:"",
                address1:"",
                address2:"",
                birthdate:"",
                email:"",
                faculty:"",
                fullName:"",
                gender:"",
                generation:"",
                phone:"",
                role:"",
                studyProgram:"",
                university:"",
            },
            errors:[],            
        }
    },

    computed:{
        birthdateValid(){
            if(this.user.birthdate == ""){
                return null;
            }
            else{
                var currentDate =moment();
                if(moment(this.user.birthdate).isAfter(currentDate)){
                    return false;
                }
                return true;
            }
        },
        formStudyProgramTextOnlyLetter(){
          var regex = /^[A-Za-z\s]+$/;
               
          if(this.user.studyProgram == ""){
            return null
          }else{
            if(regex.test(this.user.studyProgram)){

              return true;              
            }else{

              return false
            }
          }
        },
        formFacultyTextOnlyLetter(){
          var regex = /^[A-Za-z\s]+$/;
               
          if(this.user.faculty == ""){
            return null
          }else{
            if(regex.test(this.user.faculty)){

              return true;              
            }else{

              return false
            }
          }
        },
        formOnlyNumber(){
          var regex = /^[0-9]+$/;
               
          if(this.user.phone == ""){
            return null
          }else{
            if(regex.test(this.user.phone)){

              return true;              
            }else{

              return false
            }
          }
        }
        
    },

    methods: {
        
        isDisable(){
            if(this.user.activeStudentCard == ""){return true;}
            if(this.user.address1 == ""){return true;}
            if(this.birthdateValid == null || !this.birthdateValid){return true;}
            if(this.user.role == ""){return true;}
            if(this.user.studyProgram == "" || !this.formStudyProgramTextOnlyLetter){return true;}
            if(this.user.university == ""){return true;}
            if(this.user.email == ""){return true;}
            if(this.user.faculty == "" || !this.formFacultyTextOnlyLetter){return true;}
            if(this.user.fullName == ""){return true;}
            if(this.user.gender == ""){return true;}
            if(this.user.generation == ""){return true;}
            if(this.user.phone == "" || !this.formOnlyNumber){return true;}
 
            return false;
        },

        validateAndSubmit(e){
            e.preventDefault();
            this.errors = [];
            if(!this.birthdateValid){
                this.errors.push("Your Birthdate is Invalid");
            }
            if(this.errors.length === 0){
              db.collection('user').add({
                activeStudentCard:this.user.activeStudentCard,
                address1:this.user.address1,
                address2:this.user.address2,
                birthdate:moment(this.user.birthdate).format("YYYY-MM-DD"),
                email:this.user.email,
                faculty:this.user.faculty,
                fullName:this.user.fullName,
                gender:this.user.gender,
                generation:this.user.generation,
                phone:this.user.phone,
                role:this.user.role,
                studyProgram:this.user.studyProgram,
                university:this.user.university,
                isProposalUploaded : false,
                isVerified : false,
            }).then(() => {
                this.openModal()
              });
            }

        },
        openModal() {
            this.$refs['modalOk'].show();
            window.setTimeout(() => {
                this.$router.push("/admin/users");
            }, 2000);
        },

        batal(){
          this.$router.push("/admin/users");
        }



    }

}
</script>

<style>
.save-btn{
  background-color: #3282B8;
  color: white;
}
</style>