<template>
  <v-container>

    <div class="mt-5 mb-5">
      <h1>Daftar Timeline</h1>
    </div>

    <div>
      <button class="btn save-btn mb-5" v-b-modal.modal-1>&#43; Tambah Timeline</button>
    </div>

    <table class="table table-hover">
        <thead class="table-borderless">
            <tr class="tr-top">
                <th scope="col">No.</th>
                <th scope="col">Nama Kegiatan</th>
                <th scope="col">Tanggal Kegiatan</th>
            </tr>
        </thead>
        <tbody class="tbody">
            <tr v-for="(timeline,index) in timeLineList" :key="timeline.id"  v-b-modal.modal-2 @click="click(timeline.id)"  class="content">
                <th scope=row class="th-bottom">{{index+1}}</th>
                <td>{{timeline.nama_aktivitas}}</td>
                <td>{{timeline.tanggal}}</td>
                
            </tr>
        </tbody>
    </table>

    

    <b-modal size="lg" ref="modalAdd" id="modal-1" title="Tambah Kegiatan" v-bind:hide-footer="true">
      <div class="card">
        <div class="card-header"><strong class="labelForm">Formulir Tambah Kegiatan</strong></div>
        <div class="card-body">
          <b-form @submit.prevent="validateAndSubmit">
            <!-- Field Nama Event -->
            <b-form-group>
              <div class="mb-2 label"><strong class="labelForm">Nama Kegiatan</strong></div>
              <b-form-input
                class="form-control"
                v-model="timeline.nama_aktivitas"
                id="eventName"
                placeholder="Nama Kegiatan"></b-form-input>
            </b-form-group>

            <!-- Field tanggal event -->
            <b-form-group>
                <div class="mb-2 label"><strong class="labelForm">Tanggal</strong></div>
                <b-form-datepicker id="datepickerEnd-invalid" :state="birthdateValid" class="mb-2" v-model="timeline.tanggal"></b-form-datepicker>
                
                <b-form-invalid-feedback id="input-live-feedback-end">
                  Tanggal yang dimasukan tidak valid
                </b-form-invalid-feedback>
            </b-form-group>
       
            
            <!-- Field Upload Image -->
            <!-- <b-form-group>
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
              <div v-if="imageData!=null">
                  <img class="preview" :src="picture">
                  
              </div>
            </b-form-group> -->
            

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
              <button type="submit" class="btn save-btn mr-2" :disabled=isDisable()>Tambah Kegiatan</button>
              <button class="btn btn-light" @click="batal">Batal</button>
            </div>
          </b-form>

        </div>

      </div>
    </b-modal>

    <b-modal size="lg" ref="modalOk" hide-footer>
        <div class="container">
            <div class="d-block text-center">
              <h4>Timeline berhasil ditambahkan</h4>
            </div>
        </div>
    </b-modal>
    
    <!-- Modal Edit Event -->
    <b-modal size="lg" ref="modalEdit" id="modal-2" title="Edit Event" v-bind:hide-footer="true">
      <div class="card">
        <div class="card-header"><strong class="labelForm">Formulir Ubah Timeline</strong></div>
        <div class="card-body">
          <b-form @submit.prevent="validateAndSubmitEdit">
    
            <!-- Field Nama Event -->
            <b-form-group>
              <div class="mb-2 label"><strong class="labelForm">Nama Kegiatan</strong></div>
              <b-form-input
                class="form-control"
                v-model="targetTimeline.nama_aktivitas"
                id="eventName"
                placeholder="Nama Kegiatan"></b-form-input>
            </b-form-group>

            <!-- Field tanggal event -->
            <b-form-group>
                <div class="mb-2 label"><strong class="labelForm">Tanggal Kegiatan</strong></div>
                <b-form-datepicker id="datepickerEnd-invalid" :state="birthdateValidEdit" class="mb-2" v-model="targetTimeline.tanggal"></b-form-datepicker>
                
                <b-form-invalid-feedback id="input-live-feedback-end">
                  Tanggal yang dimasukan tidak valid
                </b-form-invalid-feedback>
            </b-form-group>
       
            
            <!-- Field Upload Image -->
            <!-- <b-form-group>
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

            </b-form-group> -->
            
            

            <!-- Field Email -->
            <!-- <b-form-group>
              <div class="mb-2 label"><strong class="labelForm">Deskripsi Event</strong></div>
              <b-form-textarea
                id="textarea"
                v-model="targetTimeline.description"
                placeholder="Masukan deskripsi event"
                rows="3"
                max-rows="6"
                ></b-form-textarea>
            </b-form-group> -->
               

            <button type="submit" style="color:white" class="btn btn-block save-btn mb-2" :disabled=isDisableEdit()>Ubah Kegiatan</button>
            
          </b-form>
          <button type="submit" class="btn btn-block btn-light mr-2" v-b-modal.modal-del >Hapus Kegiatan</button>

        </div>

      </div>
    </b-modal>

    <b-modal size="lg" ref="modalOk" hide-footer>
        <div class="container">
            <div class="d-block text-center">
              <h4>Kegiatan berhasil ditambahkan</h4>
            </div>
        </div>
    </b-modal>


    <b-modal size="lg" ref="modalOkEdit" hide-footer>
        <div class="container">
            <div class="d-block text-center">
              <h4>Kegiatan berhasil diubah</h4>
            </div>
        </div>
    </b-modal>

    <b-modal size="lg" ref="modalDelete" id="modal-del" hide-footer>
       <div class="detail">
            <p class="title">Kegiatan ini akan dihapus ? </p>
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
import {db} from "../../firebase/firebase"
import moment from "moment"
  export default {
    name:"timeline",
    data(){
        return {
            timeline:{
              nama_aktivitas:"",
              tanggal:"",
            },
            timeLineList : [],
            timeLineId : "",
            targetTimeline: {},
        };
    },

    computed:{
      birthdateValid(){
            if(this.timeline.tanggal == ""){
                return null;
            }
            else{
                var currentDate =moment();
                if(moment(this.timeline.tanggal).isBefore(currentDate)){
                    return false;
                }
                return true;
            }
        },

        birthdateValidEdit(){
            if(this.targetTimeline.tanggal == ""){
                return null;
            }
            else{
                var currentDate =moment();
                if(moment(this.targetTimeline.tanggal).isBefore(currentDate)){
                    return false;
                }
                return true;
            }
        },

    },

    methods: {
     
      loadTimeline() {
        var timelineRef = db.collection('timeline').orderBy('tanggal');
        timelineRef.onSnapshot(snap => {
          this.timeLineList = [];
          snap.forEach(doc => {
            var timeline =doc.data();
            timeline.id = doc.id;
            timeline.tanggal = moment(doc.data().tanggal).format("DD MMMM YYYY");

            this.timeLineList.push(timeline);
            
          })
         
        });
        // var storageRef = storage.ref().child('images').child('546FO3IJN82I2LWLV87YV.mp4_snapshot_21.14_[2019.06.28_22.26.16].png');
        // console.log(storageRef.location.path)
      },
      click(timeLineId){
        this.timeLineId = timeLineId;

        db.collection('timeline').doc(this.timeLineId).get().then(doc => {
          // console.log(doc.data());
          this.targetTimeline = doc.data();
        });
        

      },

      validateAndSubmit(e){
            e.preventDefault();
            this.errors = [];
            
            if(this.errors.length === 0){
            db.collection('timeline').add({
                    nama_aktivitas:this.timeline.nama_aktivitas,
                    tanggal:this.timeline.tanggal,
                }).then(() => {
                    this.openModal()
                });
              
            }


        },
        validateAndSubmitEdit(e){
            e.preventDefault();
            this.errors = [];
            if(this.errors.length === 0){
                db.collection('timeline').doc(this.timeLineId).update({
                        nama_aktivitas : this.targetTimeline.nama_aktivitas,
                        tanggal : this.targetTimeline.tanggal,
                    }).then(() => {
                    this.openModalSusksesEdit()

                    })
                .then(() => {
                    this.openModalSusksesEdit()
                    });
                
            }
        },
        deleteEvent(){
            db.collection('timeline').doc(this.timeLineId).delete().then(() =>{
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
            if(this.timeline.nama_aktivitas == ""){return true;}
            if(this.timeline.tanggal == "" || !this.birthdateValid){return true;}

            return false;
        },

        isDisableEdit(){
            if(this.targetTimeline.nama_aktivitas == ""){return true;}
            if(this.targetTimeline.tanggal == "" || !this.birthdateValidEdit){return true;}
 
            return false;
        },
        openModalEdit(timeLineId){
          
          this.$refs['modalEdit'].show();
          this.timeLineId = timeLineId;
          db.collection('event').doc(timeLineId).get().then(doc => {
            this.targetTimeline = doc.data();
          })
        },
        openModalDelete(timeLineId){
          
          this.$refs['modalDelete'].show();
          this.timeLineId = timeLineId;
        },
    },
    created(){
      this.loadTimeline();
    }
  }
</script>
