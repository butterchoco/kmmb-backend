<template>
  <v-container>
    <v-card>
        <b-card>
            <b-card-text>
                <div class="row">
                    <div class="col-xs-12 col-sm-6 col-md-8">
                        <h2 id="judul">
                            {{user.fullName}} ({{user.role}}) 
                            <b-badge v-if="user.isVerified" variant="primary">
                            Verified
                            </b-badge>
                        </h2>
                    </div>

     
                    <div class="col-xs-12 col-sm-6 col-md-4">
                        <div class="d-flex justify-content-end">
                            <button class="btn edit-btn" v-on:click="updateUser()" id="updateUser"><span id="update">Update User</span></button>
                        </div>
                        
                    </div>
                </div>
                
                <div>
                    <h6 id="college">{{user.studyProgram}}, {{user.faculty}}</h6>
                    <h6>{{user.university}}</h6>
                </div>


                <hr>
                <table class="table table-hover table-borderless">
                    
                    <tbody class="tbody">
                        <tr class="content">
                            <td><strong class="key">Student Active Number</strong> </td>
                            <td class="justify-start">{{user.activeStudentCard}}</td>
                        </tr>
                        <tr class="content">
                            <td><strong class="key">Generation</strong> </td>
                            <td class="justify-start">{{user.generation}}</td>
                        </tr>                        
                        <tr class="content">
                            <td><strong class="key">Phone Number</strong> </td>
                            <td class="justify-start">{{user.phone}}</td>
                        </tr>
                        <tr class="content">
                            <td><strong class="key">Email</strong> </td>
                            <td class="justify-start">{{user.email}}</td>
                        </tr>
                        <tr class="content">
                            <td><strong class="key">Main Address</strong> </td>
                            <td class="justify-start">{{user.address1}}</td>
                        </tr>
                        <tr class="content" v-if="user.address != null">
                            <td><strong class="key">Secondary Address</strong> </td>
                            <td class="justify-start">{{user.address2}}</td>
                        </tr>
                        <tr class="content">
                            <td><strong class="key">Birthdate</strong> </td>
                            <td class="justify-start">{{user.birthdate}}</td>
                        </tr>
                        <tr class="content">
                            <td><strong class="key">Gender</strong> </td>
                            <td class="justify-start">{{user.gender}}</td>
                        </tr>
                    </tbody>
                </table>
                
            </b-card-text>
        </b-card>
    </v-card>
    <v-card>
        <b-card>
            <b-card-body>
                <div>
                    <span v-if="user.isProposalUploaded" style="color: #008000">This user has uploaded the proposal</span>
                    <span v-if="!user.isProposalUploaded" style="color:	#FF0000">This user has not uploaded the proposal</span>
                </div>
                
            </b-card-body>
        </b-card>
    </v-card>
    <div class="mt-3">
        <button class="btn delete-btn" v-b-modal.modal-1>
            <v-icon style="color: #E84A5F">mdi-delete</v-icon>
           Delete User
        </button>
    </div>

    <b-modal ref="modal" id="modal-1" title="Confrimation Delete User" v-bind:hide-footer="true">
        <div class="detail">
            <p class="title">This user will be deleted ? </p>
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
import { db } from '../../firebase/firebase'

export default {
    name:"UserDetail",
    data(){
        return{
            user:{},
            options :[
                {text: 'Has Uploaded', value: true},
                {text: 'Has Not Uploaded', value: false}
            ],
            proposalStatus : false,      
        }
    },
    created(){
        this.fetchData();
    },
    watch:{
        "$route": "fetchData"
    },
    methods:{
        fetchData(){
            db.collection('user').doc(this.$route.params.id).get().then(doc => {
                this.user = doc.data();
            })
        },
        updateUser(){
            this.$router.push("/admin/user/edit/"+this.$route.params.id);
        },

        deleteUser(){
            db.collection('user').doc(this.$route.params.id).delete().then(() =>{
                this.$router.push("/admin/users");
            })
        },


        
        // async setStatusUploaded(){
        //     console.log(this.proposalStatus);
        //     await db.collection('user').doc(this.$route.params.id).update({
        //         isProposalUploaded : this.proposalStatus
        //     });
               

        //     this.hideModal();

        // },
        hideModal(){
          this.$refs['modal'].hide();
        },
    }

}
</script>

<style>
.key{
    color:#3282B8 ;
}
.edit-btn{
    border-color: #3282B8;
    color: #3282B8;
}
.delete-btn{
    background-color: white;
    color:#E84A5F;

}

</style>