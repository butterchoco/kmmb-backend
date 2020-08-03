<template>

<v-container>

  <div class="mt-5 mb-3">
    <h1>Daftar Peserta</h1>
  </div>


  <table class="table table-hover">
      <thead class="table-borderless">
          <tr class="tr-top">
              <th scope="col">No.</th>
              <th scope="col">Nama Ketua</th>
              <th scope="col">Program Studi</th>
              <th scope="col">Fakultas</th>
              <th scope="col">Instansi</th>
              <th scope="col">Status Pembayaran</th>
          </tr>
      </thead>
      <tbody class="tbody">
          <tr v-for="(user,index) in userList" :key="user.id"  v-b-modal.modal-1 @click="click(user.id)"  class="content">
              <th scope=row class="th-bottom">{{index+1}}</th>
              <td>{{user.namaKetua}}</td>
              <td>{{user.studyProgram}}</td>
              <td>{{user.faculty}}</td>
              <td>{{user.university}}</td>
              <td>{{user.statusVerifikasiPembayaran}}</td>
              
          </tr>
      </tbody>
  </table>

  <b-modal size="lg" ref="modalDetail" id="modal-1" title="Detail User" v-bind:hide-footer="true">
      <div class="card">
      <div class="card-header">Detail Peserta</div>
      <div class="card-body">
        <!-- Field Nama Ketua -->
        <div class="mb-4">
          <div class="mb-2 label"><strong class="labelForm">Nama Lengkap Ketua</strong></div>
          {{target.namaKetua}}
        </div>
        
        <!-- Field Jenis Kelamin -->
        <div class="mb-4">
          <div class="mb-2 label"><strong class="labelForm">Jenis Kelamin</strong></div>
          {{target.gender}}
        </div>

        <!-- Field Tanggal Lahir -->
        <div class="mb-4">
          <div class="mb-2 label"><strong class="labelForm">Tanggal Lahir</strong></div>
          {{target.birthdate | formatDate}}
        </div>

        <!-- Field Nomor Telpon -->
        <div class="mb-4">
          <div class="mb-2 label"><strong class="labelForm">Nomor Telpon</strong></div>
          {{target.phone}}
        </div>

        <!-- Field Email -->
        <div class="mb-4">
          <div class="mb-2 label"><strong class="labelForm">Email</strong></div>
          {{target.email}}
        </div>

        <!-- Field Alamat -->
        <div class="mb-4">
          <div class="mb-2 label"><strong class="labelForm">Alamat Utama</strong></div>
          {{target.address1}}
        </div>

        <div v-if="isAddress2Exist" class="mb-4">
          <div class="mb-2 label"><strong class="labelForm">Alamat Lainnya</strong></div>
          {{target.address2}}
        </div>

        <!-- Field angkatan -->
        <div class="mb-2">
          <div class="mb-2 label"><strong class="labelForm">Angkatan</strong></div>
          {{target.generation}}
        </div>

        <!-- Field Program Studi dan Fakultas         -->
        <div class="mb-3 row">
          <div class="col-6 col-sm-12 col-md-6">
            <div class="mb-2 label"><strong class="labelForm">Program Studi</strong></div>
            {{target.studyProgram}}
          </div>

          <div class="col-6 col-sm-12 col-md-6">
            <div class="mb-2 label"><strong class="labelForm">Fakultas</strong></div>
            {{target.faculty}}
          </div>
        </div>

        <!-- Field Instansi -->
        <div class="mb-4">
          <div class="mb-2 label"><strong class="labelForm">Instansi</strong></div>
            {{target.university}}
        </div>

        <!-- Section Daftar Anggota -->
        <div class="card-header">Data Anggota</div>
        <div class="card-body">
          <div class="row">
            <div class="col-6">
              <!-- Field Nama Ketua -->
              <div class="mb-4">
                <div class="mb-2 label"><strong class="labelForm">Nama Lengkap Anggota 1</strong></div>
                {{target.namaKetua}}
              </div>
              
              <!-- Field Jenis Kelamin -->
              <div class="mb-4">
                <div class="mb-2 label"><strong class="labelForm">Jenis Kelamin</strong></div>
                {{target.gender}}
              </div>

              <!-- Field Tanggal Lahir -->
              <div class="mb-4">
                <div class="mb-2 label"><strong class="labelForm">Tanggal Lahir</strong></div>
                {{target.birthdate | formatDate}}
              </div>

              <!-- Field Nomor Telpon -->
              <div class="mb-4">
                <div class="mb-2 label"><strong class="labelForm">Nomor Telpon</strong></div>
                {{target.phone}}
              </div>

            </div>

            <div class="col-6">
              <!-- Field Nama Ketua -->
              <div class="mb-4">
                <div class="mb-2 label"><strong class="labelForm">Nama Lengkap Anggota 2</strong></div>
                {{target.namaKetua}}
              </div>
              
              <!-- Field Jenis Kelamin -->
              <div class="mb-4">
                <div class="mb-2 label"><strong class="labelForm">Jenis Kelamin</strong></div>
                {{target.gender}}
              </div>

              <!-- Field Tanggal Lahir -->
              <div class="mb-4">
                <div class="mb-2 label"><strong class="labelForm">Tanggal Lahir</strong></div>
                {{target.birthdate | formatDate}}
              </div>

              <!-- Field Nomor Telpon -->
              <div class="mb-4">
                <div class="mb-2 label"><strong class="labelForm">Nomor Telpon</strong></div>
                {{target.phone}}
              </div>
              
            </div>
          </div>
          
        </div>

        <!-- Field Surat Keterangan Mahasiswa -->
        <div class="mb-4">
        <div class="mb-2 label"><strong class="labelForm">Surat Keterangan Mahasiswa</strong></div>
          <div>
            <a class="linkFile" @click="download(target.suratKeteranganMahasiswa[0])">
              {{fileSuratKetMahasiswa1}}
            </a>
          </div>
          
          <div>
            <a class="linkFile" @click="download(target.suratKeteranganMahasiswa[1])">
              {{fileSuratKetMahasiswa2}}
            </a>
          </div>

          <div v-if="sizeMember3" >
            <a class="linkFile" @click="download(target.suratKeteranganMahasiswa[2])">
              {{fileSuratKetMahasiswa3}}
            </a>
          </div>
 
        </div>

        <!-- Field Bukti Pembayaran -->
        <div v-if ="isBuktiPembayaranExist" class="mb-4">
        <div class="mb-2 label"><strong class="labelForm">Bukti Pembayaran</strong></div>
          <a class="linkFile" @click="download(target.berkasPembayaran)">
            {{buktiPembayaran}}
          </a>
        </div>

        <div v-else class="mb-4">
        <div class="mb-2 label"><strong class="labelForm">Bukti Pembayaran</strong></div>
          Belum Upload Bukti Pembayaran
        </div>


        <!-- Field Proposal -->
        <div v-if ="isProposalExist" class="mb-4">
        <div class="mb-2 label"><strong class="labelForm">Proposal</strong></div>
          <a class="linkFile" @click="download(target.proposal)">
            {{proposal}}
          </a>
        </div>

        <div v-else class="mb-4">
        <div class="mb-2 label"><strong class="labelForm">Proposal</strong></div>
          Belum Upload Proposal
        </div>

        

        <b-form @submit.prevent="validateAndSubmit">
          <!-- Field status verifikasi pembayaran -->
          <b-form-group>
            <div class="mb-2 label"><strong class="labelForm">Status Verifikasi Pembayaran</strong></div>
            <b-form-select
              v-model="target.statusVerifikasiPembayaran" 
              class="form-control">
                <b-form-select-option value="Belum Membayar">Belum Membayar</b-form-select-option>
                <b-form-select-option value="Menunggu Pembayaran">Menunggu Pembayaran</b-form-select-option>
                <b-form-select-option value="Terverifikasi">Terverifikasi</b-form-select-option>
                <b-form-select-option value="Ditolak">Ditolak</b-form-select-option>
                 
            </b-form-select>
          </b-form-group>       

          <button style="color:white" type="submit" class="btn save-btn mr-2 btn-block" >Ubah Status Verifikasi Pembayaran</button>

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

<style scoped>
.linkFile{
  color: #E84A5F;
}

</style>



<script>
import moment from 'moment'
import axios from 'axios'
import { db, storage } from '../../firebase/firebase'
// import router from '../../router'

  

  export default {
    name: 'usersList',
    data () {
      return {
        userList: [],
        target:{},
        errors : [],
        userId:"",
        tanggalLahirKetua:"",
        fileSuratKetMahasiswa1:"",
        fileSuratKetMahasiswa2:"",
        fileSuratKetMahasiswa3:"",
        buktiPembayaran:"",
        proposal: "",
        isProposalExist: false,
        isBuktiPembayaranExist : false,
        isAddress2Exist : false,
        sizeMember3 : false,

  
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
      loadUser() {
        var userRef = db.collection('user');
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
          this.tanggalLahirKetua = moment(this.target.birthdate).format("DD MMMM YYYY")
          this.buktiPembayaran = this.target.berkasPembayaran.split('/').pop().split('#')[0].split('?')[0];
          this.proposal = this.target.proposal.split('/').pop().split('#')[0].split('?')[0];
          if(this.proposal){
            this.isProposalExist = true;
          }else{
            this.isProposalExist = false;
          }
          if(this.buktiPembayaran){
            this.isBuktiPembayaranExist = true;
          }else{
            this.isBuktiPembayaranExist = false;
          }
          if(this.target.address2){
            this.isAddress2Exist = true;
          }else{
            this.isAddress2Exist = false;
          }

          if((this.target.suratKeteranganMahasiswa).length == 3){
            this.sizeMember3 = true;
            this.fileSuratKetMahasiswa1 = this.target.suratKeteranganMahasiswa[0].split('/').pop().split('#')[0].split('?')[0];
            this.fileSuratKetMahasiswa2 = this.target.suratKeteranganMahasiswa[1].split('/').pop().split('#')[0].split('?')[0];
            this.fileSuratKetMahasiswa3 = this.target.suratKeteranganMahasiswa[2].split('/').pop().split('#')[0].split('?')[0];
          }else{
            this.sizeMember3 = false;
            this.fileSuratKetMahasiswa1 = this.target.suratKeteranganMahasiswa[0].split('/').pop().split('#')[0].split('?')[0];
            this.fileSuratKetMahasiswa2 = this.target.suratKeteranganMahasiswa[1].split('/').pop().split('#')[0].split('?')[0];
          }
        });
        

      },

      download(url){
        
        var gsReference = storage.refFromURL(url);  
        gsReference.getDownloadURL().then(link => {
          axios({
                url: link,
                method : 'GET',
                responseType : 'blob',
            }).then((response) =>  {
                var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                var fileLink = document.createElement('a');

                fileLink.href = fileURL;
                fileLink.setAttribute('download', url.split('/').pop().split('#')[0].split('?')[0]);
                document.body.appendChild(fileLink);

                fileLink.click();
          })
        })     

      },



      validateAndSubmit(e){
            e.preventDefault();
            this.errors = [];
            if(!this.birthdateValid){
                this.errors.push("Your Birthdate is Invalid");
            }
            if(this.errors.length === 0){
                if(this.target.address2 != null){

                    db.collection('user').doc(this.userId).update({
                        statusVerifikasiPembayaran : this.target.statusVerifikasiPembayaran,
                    }).then(() => {
                        this.openModal()
                    });

                }else{

                    db.collection('user').doc(this.userId).update({
                        statusVerifikasiPembayaran : this.target.statusVerifikasiPembayaran,
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



