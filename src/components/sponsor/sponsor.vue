<template>
  <v-container>

    <div class="mt-5 mb-5">
      <h1>Daftar Sponsor</h1>
    </div>

    <div>
      <button class="btn save-btn mb-5" v-b-modal.modal-1>&#43; Tambah Sponsor</button>
    </div>

    <table class="table table-hover">
        <thead class="table-borderless">
            <tr class="tr-top">
                <th scope="col">No.</th>
                <th scope="col">Nama Sponsor</th>
            </tr>
        </thead>
        <tbody class="tbody">
            <tr v-for="(sponsor,index) in sponsorList" :key="sponsor.id"  v-b-modal.modal-2 @click="click(sponsor.id)"  class="content">
                <th scope=row class="th-bottom">{{index+1}}</th>
                <td>{{sponsor.name}}</td>
                
            </tr>
        </tbody>
    </table>

    

    <b-modal size="lg" ref="modalAdd" id="modal-1" title="Tambah Sponsor" v-bind:hide-footer="true">
      <div class="card">
        <div class="card-header"><strong class="labelForm">Formulir Tambah Sponsor</strong></div>
        <div class="card-body">
          <b-form @submit.prevent="validateAndSubmit">
            <!-- Field Nama Event -->
            <b-form-group>
              <div class="mb-2 label"><strong class="labelForm">Nama Sponsor</strong></div>
              <b-form-input
                class="form-control"
                v-model="sponsor.name"
                id="eventName"
                placeholder="Nama Media Partner"></b-form-input>
            </b-form-group>

            <!-- Field tanggal event -->
            <!-- <b-form-group>
                <div class="mb-2 label"><strong class="labelForm">Tanggal Event</strong></div>
                <b-form-datepicker id="datepickerEnd-invalid" :state="birthdateValid" class="mb-2" v-model="event.date"></b-form-datepicker>
                
                <b-form-invalid-feedback id="input-live-feedback-end">
                  Tanggal yang dimasukan tidak valid
                </b-form-invalid-feedback>
            </b-form-group> -->
       
            
            <!-- Field Upload Image -->
            <b-form-group>
              <div class="mb-2 label"><strong class="labelForm">Upload Image</strong></div>
              <b-form-file 
                  :file-name-formatter="formatNames"
                  @change="previewImage" 
                  accept="image/*">
              </b-form-file>
              <div>
                <p>Progress: {{uploadValue.toFixed()+"%"}}
                <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
              </div>
              <br>
              <!-- <div v-if="imageData!=null">
                  <img class="preview" :src="picture">
                  
              </div> -->
            </b-form-group>
            

            <!-- Field Email -->
            <!-- <b-form-group>
              <div class="mb-2 label"><strong class="labelForm">Deskripsi Event</strong></div>
              <b-form-textarea
                id="textarea"
                v-model="event.description"
                placeholder="Masukan deskripsi event"
                rows="3"
                max-rows="6"
                ></b-form-textarea>
            </b-form-group> -->
               
            <div class="btn-group">
              <button type="submit" class="btn save-btn mr-2" :disabled=isDisable()>Tambah Sponsor</button>
              <button class="btn btn-light" @click="batal">Batal</button>
            </div>
          </b-form>

        </div>

      </div>
    </b-modal>

    <b-modal size="lg" ref="modalOk" hide-footer>
        <div class="container">
            <div class="d-block text-center">
              <h4>Sponsor berhasil ditambahkan</h4>
            </div>
        </div>
    </b-modal>
    
    <!-- Modal Edit Event -->
    <b-modal size="lg" ref="modalEdit" id="modal-2" title="Edit Media Partner" v-bind:hide-footer="true">
      <div class="card">
        <div class="card-header"><strong class="labelForm">Formulir Ubah Sponsor</strong></div>
        <div class="card-body">
          <b-form @submit.prevent="validateAndSubmitEdit">
            <b-img-lazy class="mb-4" :src="headerPhotos"></b-img-lazy>
            <!-- Field Nama Event -->
            <b-form-group>
              <div class="mb-2 label"><strong class="labelForm">Nama Sponsor</strong></div>
              <b-form-input
                class="form-control"
                v-model="targetSponsor.name"
                id="eventName"
                placeholder="Nama Event"></b-form-input>
            </b-form-group>

            <!-- Field tanggal event -->
            <!-- <b-form-group>
                <div class="mb-2 label"><strong class="labelForm">Tanggal Event</strong></div>
                <b-form-datepicker id="datepickerEnd-invalid" :state="birthdateValidEdit" class="mb-2" v-model="targetMedia.date"></b-form-datepicker>
                
                <b-form-invalid-feedback id="input-live-feedback-end">
                  Tanggal yang dimasukan tidak valid
                </b-form-invalid-feedback>
            </b-form-group> -->
       
            
            <!-- Field Upload Image -->
            <b-form-group>
              <div class="mb-2 label"><strong class="labelForm">Upload Image</strong></div>
              <b-form-file 
                :file-name-formatter="formatNames" 
                accept="image/*"
                 @change="previewImage">
              </b-form-file>
              <div>
                <p>Progress: {{uploadValue.toFixed()+"%"}}
                <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
              </div>
              <br>

            </b-form-group>
            
            

            <!-- Field Email -->
            <!-- <b-form-group>
              <div class="mb-2 label"><strong class="labelForm">Deskripsi Event</strong></div>
              <b-form-textarea
                id="textarea"
                v-model="targetMedia.description"
                placeholder="Masukan deskripsi event"
                rows="3"
                max-rows="6"
                ></b-form-textarea>
            </b-form-group> -->
               

            <button type="submit" style="color:white" class="btn btn-block save-btn mb-2" :disabled=isDisableEdit()>Ubah Sponsor</button>
            
          </b-form>
          <button type="submit" class="btn btn-block btn-light mr-2" v-b-modal.modal-del >Hapus Sponsor</button>

        </div>

      </div>
    </b-modal>

    <b-modal size="lg" ref="modalOk" hide-footer>
        <div class="container">
            <div class="d-block text-center">
              <h4>Sponsor berhasil ditambahkan</h4>
            </div>
        </div>
    </b-modal>


    <b-modal size="lg" ref="modalOkEdit" hide-footer>
        <div class="container">
            <div class="d-block text-center">
              <h4>Sponsor berhasil diubah</h4>
            </div>
        </div>
    </b-modal>

    <b-modal size="lg" ref="modalDelete" id="modal-del" hide-footer>
       <div class="detail">
            <p class="title">Sponsor ini akan dihapus ? </p>
            <hr>
            <div class="btn-group">
                <button type="submit" class="btn btn-danger mr-2" @click="deleteEvent">Delete</button>
                <button class="btn btn-light" @click="hideModal">Cancel</button>
            </div>
        </div>
  </b-modal>


  </v-container>
</template>

<script>
import {db, storage} from "../../firebase/firebase"
// import moment from "moment"
  export default {
    name:"sponsor",
    data(){
        return {
            sponsor:{
              name:"",
              photo:"",
            },
            sponsorList : [],
            headerPhotos:"",
            sponsorId : "",
            targetSponsor: {},
            imageData : null,
            picture : null,
            uploadValue :0,
        };
    },

      

    methods: {
      previewImage(event) {
        this.uploadValue=0;
        this.picture=null;
        this.imageData = event.target.files[0];
      },
      loadSponsor() {
        var sponsorRef = db.collection('sponsors');
        sponsorRef.onSnapshot(snap => {
          this.sponsorList = [];
          snap.forEach(doc => {
            var sponsor =doc.data();
            sponsor.id = doc.id;
            this.sponsorList.push(sponsor);
            
          })
         
        });
        // var storageRef = storage.ref().child('images').child('546FO3IJN82I2LWLV87YV.mp4_snapshot_21.14_[2019.06.28_22.26.16].png');
        // console.log(storageRef.location.path)
      },
      click(sponsorId){
        this.sponsorId = sponsorId;

        db.collection('sponsors').doc(this.sponsorId).get().then(doc => {
          // console.log(doc.data());
          this.targetSponsor = doc.data();
          var gsReference = storage.refFromURL(this.targetSponsor.photo);  
          gsReference.getDownloadURL().then(link => {
              this.headerPhotos = link;
          })
          
        });
        

      },
      formatNames(files) {
        if (files.length === 1) {
          return files[0].name
        } else {
          return `${files.length} files selected`
        }
      },

      validateAndSubmit(e){
            e.preventDefault();
            this.errors = [];
            
            if(this.errors.length === 0){
              this.picture=null;
              const storageRef = storage.ref().child(`images/sponsors/${this.imageData.name}`).put(this.imageData);
              storageRef.on(`state_changed`, snapshot => {
                this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
              }, error =>{console.log(error.message)}, () => {
                this.uploadValue=100;
                storageRef.snapshot.ref.getDownloadURL().then((url) => {
                  this.picture = url
                  db.collection('sponsors').add({
                      name:this.sponsor.name,
                      photo : `gs://kmmb-website.appspot.com/images/sponsors/${this.imageData.name}`,
                  }).then(() => {
                      this.openModal();
                      this.uploadValue=0;
                      
                    });
                })
              }) 
              
            }
            

        },
        validateAndSubmitEdit(e){
            e.preventDefault();
            this.errors = [];
            if(this.imageData != null){
                var filename = this.targetSponsor.photo.split('/').pop().split('#')[0].split('?')[0];
                var target = storage.ref().child('images/sponsors/'+ filename)
                target.delete();

                if(this.errors.length === 0){
              
                  const storageRef = storage.ref().child(`images/sponsors/${this.imageData.name}`).put(this.imageData);
                  storageRef.on(`state_changed`, snapshot => {
                    this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                  }, error =>{console.log(error.message)}, () => {
                    this.uploadValue=100;
                    storageRef.snapshot.ref.getDownloadURL().then((url) => {
                      this.picture = url
                      db.collection('sponsors').doc(this.sponsorId).update({
                          name : this.targetSponsor.name,
                          photo : `gs://kmmb-website.appspot.com/images/sponsors/${this.imageData.name}`
                      }).then(() => {
                        this.openModalSusksesEdit()
                        this.uploadValue=0;
                      })
                    .then(() => {
                        this.openModalSusksesEdit()
                        this.uploadValue=0;
                      });
                    })
                  }) 
                  
                }
            }
            else{
              db.collection('sponsors').doc(this.sponsorId).update({
                    name : this.targetSponsor.name,

                }).then(() => {
                  this.openModalSusksesEdit()
                  this.uploadValue=0;
                })
              .then(() => {
                  this.openModalSusksesEdit()
                  this.uploadValue=0;
                });
            }
           
        },
        deleteEvent(){
          var filename = this.targetSponsor.photo.split('/').pop().split('#')[0].split('?')[0];
          var target = storage.ref().child('images/sponsors/'+ filename)

          target.delete();
            db.collection('sponsors').doc(this.sponsorId).delete().then(() =>{
                this.hideModal();
            })
        },
        openModal() {
            this.$refs['modalOk'].show();
            window.setTimeout(() => {
                this.$refs['modalAdd'].hide();
            }, 2000);
        },

        openModalSusksesEdit() {
            this.$refs['modalOkEdit'].show();
            window.setTimeout(() => {
                this.$refs['modalOkEdit'].hide();
            }, 2000);
            this.$refs['modalEdit'].hide();
        },

        hideModal(){
          this.$refs['modalDelete'].hide();
          this.$refs['modalEdit'].hide();
        },

        batal(){
          this.$refs['modalOk'].hide();
        },
        isDisable(){
            if(this.sponsor.name == ""){return true;}
 
            return false;
        },

        isDisableEdit(){
            if(this.targetSponsor.name == ""){return true;}
 
            return false;
        },
        openModalEdit(sponsorId){
          
          this.$refs['modalEdit'].show();
          this.sponsorId = sponsorId;
          db.collection('media-partner').doc(sponsorId).get().then(doc => {
            this.targetSponsor = doc.data();
          })
        },
        openModalDelete(sponsorId){
          
          this.$refs['modalDelete'].show();
          this.sponsorId = sponsorId;
        },
    },
    created(){
      this.loadSponsor();
    }
  }
</script>
