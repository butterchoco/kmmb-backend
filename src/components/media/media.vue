<template>
  <v-container>
    <div class="mt-5 mb-5">
      <h1>Daftar Media Partner</h1>
    </div>

    <div>
      <button class="btn save-btn mb-5" v-b-modal.modal-1>&#43; Tambah Media Partner</button>
    </div>

    <table class="table table-hover" aria-describedby="media-partner">
      <thead class="table-borderless">
        <tr class="tr-top">
          <th scope="col">No.</th>
          <th scope="col">Nama Media Partner</th>
          <th scope="col">Paket</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr
          v-for="(media,index) in mediaList"
          :key="media.id"
          v-b-modal.modal-2
          @click="click(media.id)"
          class="content"
        >
          <th scope="row" class="th-bottom">{{index+1}}</th>
          <td>{{media.name}}</td>
          <td>{{media.size}}</td>
        </tr>
      </tbody>
    </table>

    <b-modal
      size="lg"
      ref="modalAdd"
      id="modal-1"
      title="Tambah Media Partner"
      v-bind:hide-footer="true"
    >
      <div class="card">
        <div class="card-header">
          <strong class="labelForm">Formulir Tambah Media Partner</strong>
        </div>
        <div class="card-body">
          <b-form @submit.prevent>
            <!-- Field Nama Event -->
            <b-form-group>
              <div class="mb-2 label">
                <strong class="labelForm">Nama Media Partner</strong>
              </div>
              <b-form-input
                class="form-control"
                v-model="media.name"
                id="eventName"
                placeholder="Nama Media Partner"
              ></b-form-input>
            </b-form-group>

            <!-- Field Upload Image -->
            <b-form-group>
              <div class="mb-2 label">
                <strong class="labelForm">Upload Image</strong>
              </div>
              <b-form-file
                :file-name-formatter="formatNames"
                @change="previewImage"
                accept="image/*"
              ></b-form-file>
              <div>
                <p class="mb-1">
                  Progress: {{uploadValue.toFixed()+"%"}}
                  <progress
                    id="progress"
                    :value="uploadValue"
                    max="100"
                  ></progress>
                </p>
              </div>
            </b-form-group>

            <b-form-group>
              <div class="mb-2 label">
                <strong class="labelForm">Paket</strong>
              </div>
              <b-form-select v-model="media.size" :options="sizeOptions"></b-form-select>
            </b-form-group>

            <div class="btn-group">
              <button
                @click="validateAndSubmit"
                class="btn save-btn mr-2"
                :disabled="isDisable()"
              >Tambah Media Partner</button>
              <button class="btn btn-light" @click="batal">Batal</button>
            </div>
          </b-form>
        </div>
      </div>
    </b-modal>

    <b-modal size="lg" ref="modalOk" hide-footer>
      <div class="container">
        <div class="d-block text-center">
          <h4>Media Partner berhasil ditambahkan</h4>
        </div>
      </div>
    </b-modal>

    <!-- Modal Edit Event -->
    <b-modal
      size="lg"
      ref="modalEdit"
      id="modal-2"
      title="Edit Media Partner"
      v-bind:hide-footer="true"
    >
      <div class="card">
        <div class="card-header">
          <strong class="labelForm">Formulir Ubah Media Partner</strong>
        </div>
        <div class="card-body">
          <b-form @submit.prevent="validateAndSubmitEdit">
            <b-img-lazy class="mb-4" :src="headerPhotos"></b-img-lazy>
            <!-- Field Nama Event -->
            <b-form-group>
              <div class="mb-2 label">
                <strong class="labelForm">Nama Media Partner</strong>
              </div>
              <b-form-input
                class="form-control"
                v-model="targetMedia.name"
                id="eventName"
                placeholder="Nama Event"
              ></b-form-input>
            </b-form-group>

            <!-- Field Upload Image -->
            <b-form-group>
              <div class="mb-2 label">
                <strong class="labelForm">Upload Image</strong>
              </div>
              <b-form-file
                :file-name-formatter="formatNames"
                accept="image/*"
                @change="previewImage"
              ></b-form-file>
              <div>
                <p class="mb-1">
                  Progress: {{uploadValue.toFixed()+"%"}}
                  <progress
                    id="progress"
                    :value="uploadValue"
                    max="100"
                  ></progress>
                </p>
              </div>
              <br />
            </b-form-group>

            <b-form-group>
              <div class="mb-2 label">
                <strong class="labelForm">Paket</strong>
              </div>
              <b-form-select v-model="targetMedia.size" :options="sizeOptions"></b-form-select>
            </b-form-group>

            <button
              type="submit"
              style="color:white"
              class="btn btn-block save-btn mb-2"
              :disabled="isDisableEdit()"
            >Ubah Media Partner</button>
          </b-form>
          <button
            type="submit"
            class="btn btn-block btn-light mr-2"
            v-b-modal.modal-del
          >Hapus Media Partner</button>
        </div>
      </div>
    </b-modal>

    <b-modal size="lg" ref="modalOk" hide-footer>
      <div class="container">
        <div class="d-block text-center">
          <h4>Media partner berhasil ditambahkan</h4>
        </div>
      </div>
    </b-modal>

    <b-modal size="lg" ref="modalOkEdit" hide-footer>
      <div class="container">
        <div class="d-block text-center">
          <h4>Media Partner berhasil diubah</h4>
        </div>
      </div>
    </b-modal>

    <b-modal size="lg" ref="modalDelete" id="modal-del" hide-footer>
      <div class="detail">
        <p class="title">Media partner ini akan dihapus ?</p>
        <hr />
        <div class="btn-group">
          <button type="submit" class="btn btn-danger mr-2" @click="deleteEvent">Hapus</button>
          <button class="btn btn-light" @click="hideModal">Batal</button>
        </div>
      </div>
    </b-modal>
  </v-container>
</template>

<script>
import { db, storage } from "../../firebase/firebase";
// import moment from "moment"
export default {
  name: "media",
  data() {
    return {
      media: {
        name: "",
        size: "",
      },
      sizeOptions: [
        { value: "XL", text: "XL" },
        { value: "L", text: "L" },
        { value: "M", text: "M" },
      ],
      mediaList: [],
      headerPhotos: "",
      mediaId: "",
      targetMedia: {},
      imageData: null,
      uploadValue: 0,
    };
  },

  methods: {
    previewImage(event) {
      this.uploadValue = 0;
      this.imageData = event.target.files[0];
    },
    loadMedia() {
      var mediaRef = db.collection("media-partner");
      mediaRef.onSnapshot((snap) => {
        this.mediaList = [];
        snap.forEach((doc) => {
          var media = doc.data();
          media.id = doc.id;
          this.mediaList.push(media);
        });
      });
    },
    click(mediaId) {
      this.mediaId = mediaId;

      db.collection("media-partner")
        .doc(this.mediaId)
        .get()
        .then((doc) => {
          this.targetMedia = doc.data();
          var gsReference = storage.refFromURL(this.targetMedia.photo);
          gsReference.getDownloadURL().then((link) => {
            this.headerPhotos = link;
          });
        });
    },
    formatNames(files) {
      if (files.length === 1) {
        return files[0].name;
      } else {
        return `${files.length} files selected`;
      }
    },

    validateAndSubmit(e) {
      e.preventDefault();
      if (this.imageData == null || this.imageData == undefined) {
        alert("Masukkan gambar terlebih dahulu !");
        return;
      }
      const storageRef = storage
        .ref()
        .child(`images/media-partner/${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then(() => {
            db.collection("media-partner")
              .add({
                name: this.media.name,
                size: this.media.size,
                photo: `gs://kmmb-website.appspot.com/images/media-partner/${this.imageData.name}`,
              })
              .then(() => {
                this.openModal();
                this.uploadValue = 0;
              });
          });
        }
      );
    },
    validateAndSubmitEdit(e) {
      e.preventDefault();
      this.errors = [];
      if (this.imageData != null) {
        var filename = this.targetMedia.photo
          .split("/")
          .pop()
          .split("#")[0]
          .split("?")[0];
        var target = storage.ref().child("images/media-partner/" + filename);
        target.delete();

        if (this.errors.length === 0) {
          const storageRef = storage
            .ref()
            .child(`images/media-partner/${this.imageData.name}`)
            .put(this.imageData);
          storageRef.on(
            `state_changed`,
            (snapshot) => {
              this.uploadValue =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
              console.log(error.message);
            },
            () => {
              this.uploadValue = 100;
              storageRef.snapshot.ref.getDownloadURL().then(() => {
                db.collection("media-partner")
                  .doc(this.mediaId)
                  .update({
                    name: this.targetMedia.name,
                    size: this.targetMedia.size,
                    photo: `gs://kmmb-website.appspot.com/images/media-partner/${this.imageData.name}`,
                  })
                  .then(() => {
                    this.openModalSusksesEdit();
                    this.uploadValue = 0;
                  })
                  .then(() => {
                    this.openModalSusksesEdit();
                    this.uploadValue = 0;
                  });
              });
            }
          );
        }
      } else {
        db.collection("media-partner")
          .doc(this.mediaId)
          .update({
            name: this.targetMedia.name,
            size: this.targetMedia.size,
          })
          .then(() => {
            this.openModalSusksesEdit();
            this.uploadValue = 0;
          })
          .then(() => {
            this.openModalSusksesEdit();
            this.uploadValue = 0;
          });
      }
    },
    deleteEvent() {
      var filename = this.targetMedia.photo
        .split("/")
        .pop()
        .split("#")[0]
        .split("?")[0];
      var target = storage.ref().child("images/media-partner/" + filename);

      target.delete();
      db.collection("media-partner")
        .doc(this.mediaId)
        .delete()
        .then(() => {
          this.hideModal();
        });
    },
    openModal() {
      this.$refs["modalOk"].show();
      window.setTimeout(() => {
        this.$refs["modalAdd"].hide();
      }, 2000);
    },

    openModalSusksesEdit() {
      this.$refs["modalOkEdit"].show();
      window.setTimeout(() => {
        this.$refs["modalOkEdit"].hide();
      }, 2000);
      this.$refs["modalEdit"].hide();
    },

    hideModal() {
      this.$refs["modalDelete"].hide();
      this.$refs["modalEdit"].hide();
    },

    batal() {
      this.$refs["modalAdd"].hide();
    },
    isDisable() {
      return (
        this.media.name == "" || this.media.size == "" || this.imageData == null
      );
    },
    isDisableEdit() {
      return (
        this.targetMedia.name == "" ||
        this.targetMedia.size == "" ||
        this.imageData == null
      );
    },
    openModalEdit(mediaId) {
      this.$refs["modalEdit"].show();
      this.mediaId = mediaId;
      db.collection("media-partner")
        .doc(mediaId)
        .get()
        .then((doc) => {
          this.targetMedia = doc.data();
        });
    },
    openModalDelete(mediaId) {
      this.$refs["modalDelete"].show();
      this.mediaId = mediaId;
    },
  },
  created() {
    this.loadMedia();
  },
};
</script>
