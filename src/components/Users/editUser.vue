<template>
  <v-container>
    <div class="mt-5 mb-3">
        <h1>Edit user</h1>
    </div>

    <br />
    <div class="card">
      <div class="card-header">Form Add New User</div>
      <div class="card-body">
        <form @submit.prevent="validateAndSubmit">
          <div v-if="errors.length">
                <div 
                class="alert alert-warning" 
                v-bind:key="index" 
                v-for="(error,index) in errors">{{error}}</div>
          </div>


          
          <div class="form-group">
            <div class="mb-2 label">Fullname</div>
            <input class="form-control" v-model="user.fullName" id="fullName" placeholder="Fullname" />
          </div>

            <div class="form-group">
                <div class="label">Role</div>
                <!-- <input class="form-control" id="departemen" placeholder="masukkan departemen" v-model="departemen"> -->
                <select id="role" v-model="user.role" class="form-control">
                    <option value=null>--</option>
                    <option value="Admin">Admin</option>
                    <option value="Leader">Leader</option>
                    <option value="Member">Member</option>
                </select>
            </div>

            <div class="form-group">
              <div class="radio">
                  <div class="label">Gender</div>
                  <input type="radio" name="gender" v-model="user.gender" value=Male> Male
                  <br>
                  <input type="radio" name="gender" v-model="user.gender" value=Female> Female
              </div>

            </div>



            

            <div class="form-group">
                <div class="mb-2 label">Birthdate</div>
                <b-form-datepicker id="datepickerEnd-invalid" :state="birthdateValid" class="mb-2" v-model="user.birthdate"></b-form-datepicker>
                
                <b-form-invalid-feedback id="input-live-feedback-end">
                  The date you entered is invalid
                </b-form-invalid-feedback>
            </div>
        

          <div class="form-group">
            <div class="mb-2 label">Active Student Card</div>
            <input class="form-control" v-model="user.activeStudentCard" id="activeStudentCard" placeholder="Nomor Pokok Mahasiswa / Nomor Induk Mahasiswa" />
          </div>

          <div class="form-group">
            <div class="mb-2 label">Generation</div>
            <input class="form-control" v-model="user.generation" id="generation" placeholder="20xx" />
          </div>
          
          <div class="row">
            <div class="col-sm-6 col-xs-12">
              <div class="form-group">
                <div class="mb-2 label">Study Program</div>
                <input class="form-control" v-model="user.studyProgram" id="studyProgram" placeholder="Psikologi / Sistem Informasi/ ..." />
              </div>
            </div>

            <div class="col-sm-6 col-xs-12">
              <div class="form-group">
                <div class="mb-2 label">Faculty</div>
                <input class="form-control" v-model="user.faculty" id="faculty" placeholder="Fakultas ..." />
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="mb-2 label">University</div>
            <input class="form-control" v-model="user.university" id="university" placeholder="Universitas ..." />
          </div>


          <div class="form-group">
            <div class="mb-2 label">Main Adress</div>
            <input class="form-control" v-model="user.address1" id="address1" placeholder="Jalan Alamat 1 No. 1 ..." />
          </div>

          <div class="form-group">
            <div class="mb-2 label">Secondary Address (if any)</div>
            <input class="form-control" v-model="user.address2" id="address2" placeholder="Jalan Alamat 2 No. 1 ..." />
          </div>

          <div class="form-group">
            <div class="mb-2 label">Phone Number</div>
            <input class="form-control" v-model="user.phone" id="phone" placeholder="08xxxxxxxxxx" />
          </div>

          <div class="form-group">
            <div class="mb-2 label">Email</div>
            <input class="form-control" v-model="user.email" id="email" placeholder="email@email.com" />
          </div>

          <div class="row">
            <div class="col-sm-6 col-xs-12">
                <div class="form-group">
                    <div class="radio">
                        <div class="label">Uploaded Proposal</div>
                        <input type="radio" name="isProposalUploaded" v-model="user.isPropsoalUploaded" value=true> Yes
                        <br>
                        <input type="radio" name="gender" v-model="user.gender" value=false> No
                    </div>

                </div>
            </div>

            <div class="col-sm-6 col-xs-12">
                <div class="form-group">
                    <div class="radio">
                        <div class="label">Verified User</div>
                        <input type="radio" name="isVerified" v-model="user.isVerified" value=true> Yes
                        <br>
                        <input type="radio" name="isVerified" v-model="user.isverified" value=false> No
                    </div>
                </div>

            </div>
          </div>

            

            
          

          <div class="btn-group">
            <button type="submit" class="btn save-btn mr-2">Save</button>
            <button class="btn btn-light" @click="batal">Cancel</button>
          </div>
    

        </form>

      </div>

    </div>

    <b-modal size="lg" ref="modalOk" hide-footer>
        <div class="container">
            <div class="d-block text-center">
              <h4>Edit User Succsess</h4>
            </div>
        </div>
    </b-modal>

  </v-container>
</template>

<script>
import moment from 'moment'

import { db } from "../../firebase/firebase"
export default {
    name : "editUser",
    data(){
        return{
            user:{},
            // activeStudentCard:"",
            // address1:"",
            // address2:"",
            // birthdate:"",
            // email:"",
            // faculty:"",
            // fullName:"",
            // gender:"",
            // generation:"",
            // phone:"",
            // role:"",
            // studyProgram:"",
            // university:"",
            // isProposalUploaded : false,
            // isVerified : false,   
            errors:[],
            
        }
    },
    computed: {
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
    },

    methods:{
        fetchData(){
            db.collection('user').doc(this.$route.params.id).get().then(doc => {
                this.user = doc.data();
                // this.activeStudentCard = doc.data().activeStudentCard;
                // this.address1 = doc.data().address1;
                // this.role = doc.data().role;
                // this.studyProgram = doc.data().studyProgram;
                // this.university = doc.data().university;
                // // this.user.isProposalUploaded = doc.data().isProposalUploaded;
                // // this.user.isVerified = doc.data().isVerified;
                // this.address2 = doc.data().address2;
                // this.birthdate = doc.data().birthdate;
                // this.faculty = doc.data().faculty;
                // this.fullName = doc.data().fullName;
                // this.gender = doc.data().gender;
                // this.generation = doc.data().generation;
                // this.phone = doc.data().phone;
            })
        },
        validateAndSubmit(e){
            e.preventDefault();
            this.errors = [];
            if(!this.birthdateValid){
                this.errors.push("Your Birthdate is Invalid");
            }
            if(this.errors.length === 0){
                if(this.user.address2 != null){
                    if(this.user.isProposalUploaded == "true"){
                        this.user.isProposalUploaded = true;
                    }   
                    else{
                        this.user.isProposalUploaded =false;
                    }

                    if(this.user.isVerified == "true"){
                        this.user.isVerified = true;
                    }   
                    else{
                        this.user.isVerified =false;
                    }

                    db.collection('user').doc(this.$route.params.id).update({
                        activeStudentCard:this.user.activeStudentCard,
                        address1:this.user.address1,
                        address2:this.user.address2,
                        birthdate:moment(this.birthdate).format("DD MMMM YYYY"),
                        email:this.user.email,
                        faculty:this.user.faculty,
                        fullName:this.user.fullName,
                        gender:this.user.gender,
                        generation:this.user.generation,
                        phone:this.user.phone,
                        role:this.user.role,
                        studyProgram:this.user.studyProgram,
                        university:this.user.university,
                        isProposalUploaded : this.user.isProposalUploaded,
                        isVerified : this.user.isVerified,
                    }).then(() => {
                        this.openModal()
                    });

                }else{
                    if(this.user.isProposalUploaded == "true"){
                        this.user.isProposalUploaded = true;
                    }   
                    else{
                        this.user.isProposalUploaded =false;
                    }

                    if(this.user.isVerified == "true"){
                        this.user.isVerified = true;
                    }   
                    else{
                        this.user.isVerified =false;
                    }

                    db.collection('user').doc(this.$route.params.id).update({
                        activeStudentCard:this.user.activeStudentCard,
                        address1:this.user.address1,
                        birthdate:moment(this.birthdate).format("DD MMMM YYYY"),
                        email:this.user.email,
                        faculty:this.user.faculty,
                        fullName:this.user.fullName,
                        gender:this.user.gender,
                        generation:this.user.generation,
                        phone:this.user.phone,
                        role:this.user.role,
                        studyProgram:this.user.studyProgram,
                        university:this.user.university,
                        isProposalUploaded : this.user.isProposalUploaded,
                        isVerified : this.user.isVerified,
                    }).then(() => {
                        this.openModal()
                    });
                }
            
            }

        },
        openModal() {
            this.$refs['modalOk'].show();
            window.setTimeout(function() {
                window.location.href = "/admin/user/" + this.$route.params.id;
            }, 2000);
        },

        batal(){
          this.$router.push("/admin/user/" + this.$route.params.id);
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