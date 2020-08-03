<template>
  <v-container>

    <div class="mt-5 mb-5">
      <h1>Daftar Event</h1>
    </div>

    <div>
      <button class="btn save-btn" v-b-modal.modal-1>&#43; Add Event</button>
    </div>

    <div class="row">
      <div v-for="event in eventList" :key="event.id" class="col-4 col-md-4 col-sm-12">
        <div class="card" style="width:400px">
            <img class="card-img-top" :src="headerPhotos" alt="Card image">
            <div class="card-body">
                <h4 class="card-title">{{event.name}}</h4>
                <p>{{event.date}}</p>
                <p class="card-text">{{event.description}}</p>
                <a href="#" class="btn btn-primary">See Profile</a>
            </div>
        </div>
      </div>
    </div>

    <b-modal size="lg" ref="modalAdd" id="modal-1" title="Tambah Event" v-bind:hide-footer="true">
      <div class="card">
        <div class="card-header"><strong class="labelForm">Formulir Tambah Event</strong></div>
        <div class="card-body">
          <b-form @submit.prevent="validateAndSubmit">
            <!-- Field Nama Event -->
            <b-form-group>
              <div class="mb-2 label"><strong class="labelForm">Nama Event</strong></div>
              <b-form-input
                class="form-control"
                v-model="event.name"
                id="eventName"
                placeholder="Nama Event"></b-form-input>
            </b-form-group>

            <!-- Field tanggal event -->
            <b-form-group>
                <div class="mb-2 label"><strong class="labelForm">Tanggal Event</strong></div>
                <b-form-datepicker id="datepickerEnd-invalid" :state="birthdateValid" class="mb-2" v-model="event.date"></b-form-datepicker>
                
                <b-form-invalid-feedback id="input-live-feedback-end">
                  Tanggal yang dimasukan tidak valid
                </b-form-invalid-feedback>
            </b-form-group>
       
            
            <!-- Field Upload Image -->
            <b-form-file 
                multiple 
                :file-name-formatter="formatNames" 
                accept="image/*">
            </b-form-file>

            <!-- Field Email -->
            <b-form-group>
              <b-form-textarea
                id="textarea"
                v-model="event.description"
                placeholder="Masukan deskripsi event"
                rows="3"
                max-rows="6"
                ></b-form-textarea>
            </b-form-group>
               
            <div class="btn-group">
              <button type="submit" class="btn save-btn mr-2" :disabled=isDisable()>Tambah event</button>
              <button class="btn btn-light" @click="batal">Batal</button>
            </div>
          </b-form>

        </div>

      </div>
    </b-modal>

    <b-modal size="lg" ref="modalOk" hide-footer>
        <div class="container">
            <div class="d-block text-center">
              <h4>Event berhasil ditambahkan</h4>
            </div>
        </div>
    </b-modal>


  </v-container>
</template>

<script>
import {db, storage} from "../../firebase/firebase"
import moment from "moment"
  export default {
    name:"event",
    data(){
        return {
            event:{
              name:"",
              date:"",
              phone:"",
              photos:[],
              description:"",
            },
            eventList : [],
            headerPhotos:"",
        };
    },

    computed:{
      birthdateValid(){
            if(this.event.date == ""){
                return null;
            }
            else{
                var currentDate =moment();
                if(moment(this.event.date).isBefore(currentDate)){
                    return false;
                }
                return true;
            }
        },

    },

    methods: {
      loadEvent() {
        var eventRef = db.collection('event');
        eventRef.onSnapshot(snap => {
          this.eventList = [];
          snap.forEach(doc => {
            var event =doc.data();
            event.id = doc.id;
            event.date = moment(doc.data().date).format("DD MMMM YYYY");
            this.eventList.push(event);
            console.log(event.photos);
            var gsReference = storage.refFromURL(event.photos[0]);  
            gsReference.getDownloadURL().then(link => {
                this.headerPhotos = link;
            })
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
              db.collection('event').add({
                name:this.event.name,
                date:this.event.date,
                description:this.event.description,
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
            if(this.event.name == ""){return true;}
            if(this.event.date == "" || !this.birthdateValid){return true;}
            if(this.event.description == ""){return true;}
 
            return false;
        },
    },
    created(){
      this.loadEvent();
    }
  }
</script>
