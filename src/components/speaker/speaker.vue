<template>
  <v-container>

    <div class="mt-5 mb-5">
      <h1>Daftar Speaker</h1>
    </div>

    <div>
      <button class="btn save-btn mb-5" v-b-modal.modal-1>&#43; Tambah Speaker</button>
    </div>

    <table class="table table-hover">
        <thead class="table-borderless">
            <tr class="tr-top">
                <th scope="col">No.</th>
                <th scope="col">Nama Speaker</th>
            </tr>
        </thead>
        <tbody class="tbody">
            <tr v-for="(speaker,index) in speakerList" :key="speaker.id"  v-b-modal.modal-2 @click="click(speaker.id)"  class="content">
                <th scope=row class="th-bottom">{{index+1}}</th>
                <td>{{speaker.name}}</td>
                
            </tr>
        </tbody>
    </table>

    

    <b-modal size="lg" ref="modalAdd" id="modal-1" title="Tambah Speaker" v-bind:hide-footer="true">
      <div class="card">
        <div class="card-header"><strong class="labelForm">Formulir Tambah Speaker</strong></div>
        <div class="card-body">
          <b-form @submit.prevent="validateAndSubmit">
            <!-- Field Nama Event -->
            <b-form-group>
              <div class="mb-2 label"><strong class="labelForm">Nama Speaker</strong></div>
              <b-form-input
                class="form-control"
                v-model="speaker.name"
                id="eventName"
                placeholder="Nama Speaker"></b-form-input>
            </b-form-group>

            <!-- Field Nama Event -->
            <b-form-group>
              <div class="mb-2 label"><strong class="labelForm">Profesi</strong></div>
              <b-form-input
                class="form-control"
                v-model="speaker.profesi"
                id="eventName"
                placeholder="Profesi Speaker"></b-form-input>
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
              <button type="submit" class="btn save-btn mr-2" :disabled=isDisable()>Tambah Speaker</button>
              <button class="btn btn-light" @click="batal">Batal</button>
            </div>
          </b-form>

        </div>

      </div>
    </b-modal>

    <b-modal size="lg" ref="modalOk" hide-footer>
        <div class="container">
            <div class="d-block text-center">
              <h4>Speaker berhasil ditambahkan</h4>
            </div>
        </div>
    </b-modal>
    
    <!-- Modal Edit Event -->
    <b-modal size="lg" ref="modalEdit" id="modal-2" title="Edit Media Partner" v-bind:hide-footer="true">
      <div class="card">
        <div class="card-header"><strong class="labelForm">Formulir Ubah Speaker</strong></div>
        <div class="card-body">
          <b-form @submit.prevent="validateAndSubmitEdit">
            <b-img-lazy class="mb-4" :src="headerPhotos"></b-img-lazy>
            <!-- Field Nama Event -->
            <b-form-group>
              <div class="mb-2 label"><strong class="labelForm">Nama Speaker</strong></div>
              <b-form-input
                class="form-control"
                v-model="targetSpeaker.name"
                id="eventName"
                placeholder="Nama Speaker"></b-form-input>
            </b-form-group>

            <b-form-group>
              <div class="mb-2 label"><strong class="labelForm">Profesi Speaker</strong></div>
              <b-form-input
                class="form-control"
                v-model="targetSpeaker.profesi"
                id="eventName"
                placeholder="Profesi Speaker"></b-form-input>
            </b-form-group>

            <!-- Field tanggal event -->
            <!-- <b-form-group>
                <div class="mb-2 label"><strong class="labelForm">Tanggal Event</strong></div>
                <b-form-datepicker id="datepickerEnd-invalid" :state="birthdateValidEdit" class="mb-2" v-model="targetSpeaker.date"></b-form-datepicker>
                
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
                v-model="targetSpeaker.description"
                placeholder="Masukan deskripsi event"
                rows="3"
                max-rows="6"
                ></b-form-textarea>
            </b-form-group> -->
               

            <button type="submit" style="color:white" class="btn btn-block save-btn mb-2" :disabled=isDisableEdit()>Ubah Speaker</button>
            
          </b-form>
          <button type="submit" class="btn btn-block btn-light mr-2" v-b-modal.modal-del >Hapus Speaker</button>

        </div>

      </div>
    </b-modal>

    <b-modal size="lg" ref="modalOk" hide-footer>
        <div class="container">
            <div class="d-block text-center">
              <h4>Speaker berhasil ditambahkan</h4>
            </div>
        </div>
    </b-modal>


    <b-modal size="lg" ref="modalOkEdit" hide-footer>
        <div class="container">
            <div class="d-block text-center">
              <h4>Speaker berhasil diubah</h4>
            </div>
        </div>
    </b-modal>

    <b-modal size="lg" ref="modalDelete" id="modal-del" hide-footer>
       <div class="detail">
            <p class="title">Speaker ini akan dihapus ? </p>
            <hr>
            <div class="btn-group">
                <button type="submit" class="btn btn-danger mr-2" @click="deleteEvent">Hapus</button>
                <button class="btn btn-light" @click="hideModal">Batal</button>
            </div>
        </div>
  </b-modal>


  </v-container>
</template>

<script>
import {db, storage} from "../../firebase/firebase"
// import moment from "moment"
  export default {
    name:"speaker",
    data(){
        return {
            speaker:{
              name:"",
              profesi:"",
              photo :"",
            },
            speakerList : [],
            headerPhotos:"",
            speakerId : "",
            targetSpeaker: {},
            imageData : null,
            picture : null,
            uploadValue :0,
            avatarImg : ""
        };
    },

      

    methods: {
      previewImage(event) {
        this.uploadValue=0;
        this.picture=null;
        this.imageData = event.target.files[0];
      },
      loadMedia() {
        var speakerRef = db.collection('speakers');
        speakerRef.onSnapshot(snap => {
          this.speakerList = [];
          snap.forEach(doc => {
            var speaker =doc.data();
            speaker.id = doc.id;
            this.speakerList.push(speaker);
            
          })
         
        });
        // var storageRef = storage.ref().child('images').child('546FO3IJN82I2LWLV87YV.mp4_snapshot_21.14_[2019.06.28_22.26.16].png');
        // console.log(storageRef.location.path)
      },
      click(speakerId){
        this.speakerId = speakerId;

        db.collection('speakers').doc(this.speakerId).get().then(doc => {
          // console.log(doc.data());
          this.targetSpeaker = doc.data();
          if(this.targetSpeaker.photo != null){
            var gsReference = storage.refFromURL(this.targetSpeaker.photo);  
            gsReference.getDownloadURL().then(link => {
                this.headerPhotos = link;
            })
          }
          else{
              var gsReferences = storage.refFromURL('gs://kmmb-website.appspot.com/images/speakers/avatar.png');  
            gsReferences.getDownloadURL().then(link => {
                this.headerPhotos = link;
            })
          }
          
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
            
             if(this.imageData != null){
               
                if(this.errors.length === 0){
              
                  const storageRef = storage.ref().child(`images/speakers/${this.imageData.name}`).put(this.imageData);
                  storageRef.on(`state_changed`, snapshot => {
                    this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                  }, error =>{console.log(error.message)}, () => {
                    this.uploadValue=100;
                    storageRef.snapshot.ref.getDownloadURL().then((url) => {
                      this.picture = url
                      db.collection('speakers').add({
                          name : this.speaker.name,
                          profesi : this.speaker.profesi,
                          photo : `gs://kmmb-website.appspot.com/images/speakers/${this.imageData.name}`
                      }).then(() => {
                        this.openModal()
                        this.uploadValue=0;
                        this.speaker = {}
                      })
                    .then(() => {
                        this.openModal()
                        this.uploadValue=0;
                        this.speaker = {}
                      });
                    })
                  }) 
                  
                }
            }
            else{
              db.collection('speakers').add({
                    name : this.speaker.name,
                    profesi : this.speaker.profesi,
                }).then(() => {
                  this.openModal()
                  this.uploadValue=0;
                  this.speaker = {}
                })
              .then(() => {
                  this.openModal()
                  this.uploadValue=0;
                  this.speaker = {}
                });
            }
            

        },
        validateAndSubmitEdit(e){
            e.preventDefault();
            this.errors = [];
            if(this.imageData != null){
                var filename = this.targetSpeaker.photo.split('/').pop().split('#')[0].split('?')[0];
                var target = storage.ref().child('images/speakers/'+ filename)
                target.delete();

                if(this.errors.length === 0){
              
                  const storageRef = storage.ref().child(`images/speakers/${this.imageData.name}`).put(this.imageData);
                  storageRef.on(`state_changed`, snapshot => {
                    this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                  }, error =>{console.log(error.message)}, () => {
                    this.uploadValue=100;
                    storageRef.snapshot.ref.getDownloadURL().then((url) => {
                      this.picture = url
                      db.collection('speakers').doc(this.speakerId).update({
                          name : this.targetSpeaker.name,
                          profesi : this.targetSpeaker.profesi,
                          photo : `gs://kmmb-website.appspot.com/images/speakers/${this.imageData.name}`
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
              db.collection('speakers').doc(this.speakerId).update({
                    name : this.targetSpeaker.name,
                    profesi : this.targetSpeaker.profesi,

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
            if(this.targetSpeaker.photo != null){
                var filename = this.targetSpeaker.photo.split('/').pop().split('#')[0].split('?')[0];
                var target = storage.ref().child('images/speakers/'+ filename)
                target.delete();

            }
          
          
            db.collection('speakers').doc(this.speakerId).delete().then(() =>{
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
            if(this.speaker.name == ""){return true;}
            if(this.speaker.profesi == ""){return true;}
 
            return false;
        },

        isDisableEdit(){
            if(this.targetSpeaker.name == ""){return true;}
            if(this.targetSpeaker.profesi == ""){return true;}
 
            return false;
        },
        openModalEdit(speakerId){
          
          this.$refs['modalEdit'].show();
          this.speakerId = speakerId;
          db.collection('speakers').doc(speakerId).get().then(doc => {
            this.targetSpeaker = doc.data();
          })
        },
        openModalDelete(speakerId){
          
          this.$refs['modalDelete'].show();
          this.speakerId = speakerId;
        },
    },
    created(){
      this.loadMedia();
    }
  }
</script>
