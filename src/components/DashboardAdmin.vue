<template>
  <v-container>
    <div class="mt-5 mb-5">
      <h1>Selamat Datang {{currentUser.email}}</h1>
    </div>

    <div class="mb-5">
      <button class="btn save-btn" v-b-modal.modal-1>&#43; Tambah Admin</button>
    </div>

    <div class="row">
      <div v-for="user in adminList" :key="user.id" class="col-xl-2 col-lg-4 col-md-6 col-sm">
        <div class="card">
          <div class="card-header">
            {{user.nama}}
            <b-badge variant="primary" v-if="user.email == currentUser.email">Aktif</b-badge>
          </div>

          <div class="card-body">
            <div class="mb-4">
              <div class="mb-2 label">
                <strong class="labelForm">Email</strong>
              </div>
              {{user.email}}
            </div>

            <div>
              <div class="mb-2 label">
                <strong class="labelForm">Phone</strong>
              </div>
              {{user.phone}}
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal size="lg" ref="modalAdd" id="modal-1" title="Tambah Admin" v-bind:hide-footer="true">
      <div class="card">
        <div class="card-header">
          <strong class="labelForm">Formulir Tambah Admin</strong>
        </div>
        <div class="card-body">
          <b-form @submit.prevent="validateAndSubmit">
            <!-- Field Nama Lengkap -->
            <b-form-group>
              <div class="mb-2 label">
                <strong class="labelForm">Nama Lengkap *</strong>
              </div>
              <b-form-input
                class="form-control"
                v-model="admin.nama"
                id="fullName"
                placeholder="Nama Lengkap"
              ></b-form-input>
            </b-form-group>

            <!-- Field Phone -->
            <b-form-group>
              <div class="mb-2 label">
                <strong class="labelForm">Nomor Telpon *</strong>
              </div>
              <b-form-input
                class="form-control"
                v-model="admin.phone"
                id="phone"
                placeholder="08xx"
                :state="validateStateNumber(admin.phone)"
              ></b-form-input>
            </b-form-group>

            <!-- Field Email -->
            <b-form-group>
              <div class="mb-2 label">
                <strong class="labelForm">Email *</strong>
              </div>
              <b-form-input
                class="form-control"
                v-model="admin.email"
                id="email"
                placeholder="email@email.com"
                :state="validateStateEmail(admin.email)"
              ></b-form-input>
            </b-form-group>

            <button
              type="submit"
              style="color:white"
              class="btn btn-block save-btn mr-2"
              :disabled="isDisable()"
            >Tambah User</button>
          </b-form>
          <button class="btn btn-block btn-light mt-3" @click="cancel">Batal</button>
        </div>
      </div>
    </b-modal>

    <b-modal size="lg" ref="modalOk" hide-footer>
      <div class="container">
        <div class="d-block text-center">
          <h4>Admin berhasil ditambahkan</h4>
        </div>
      </div>
    </b-modal>
  </v-container>
</template>

<script>
import { auth, db, functions } from "../firebase/firebase";
export default {
  name: "dashboard",
  data() {
    return {
      currentUser: {},
      admin: {
        nama: "",
        email: "",
        phone: "",
      },
      adminList: [],
    };
  },

  methods: {
    loadAdmin() {
      var userRef = db.collection("admin");
      userRef.onSnapshot((snap) => {
        this.adminList = [];
        snap.forEach((doc) => {
          var userData = doc.data();
          userData.id = doc.id;
          if (this.currentUser.email != userData.email) {
            this.adminList.push(userData);
          }
        });
      });
    },
    getCurrentUser() {
      var currentUser = auth.currentUser;
      this.currentUser = currentUser;
    },
    validateAndSubmit(e) {
      e.preventDefault();
      this.errors = [];

      if (this.errors.length === 0) {
        db.collection("admin")
          .add({
            nama: this.admin.nama,
            email: this.admin.email,
            phone: this.admin.phone,
          })
          .then(() => {
            const addAdminRole = functions.httpsCallable("addAdminRole");
            addAdminRole({ email: this.admin.email }).then(() => {
              this.admin = {};
              this.openModal();
            })
          });
      }
    },
    openModal() {
      this.$refs["modalOk"].show();
      window.setTimeout(() => {
        this.$refs["modalOk"].hide();
        this.$refs["modalAdd"].hide();
      }, 2000);
    },

    cancel() {
      this.$refs["modalAdd"].hide();
    },
    isDisable() {
      return (
        this.isEmpty(this.admin.nama) ||
        this.isEmpty(this.admin.phone) ||
        this.isEmpty(this.admin.email) ||
        !this.validateNumber(this.admin.phone) ||
        !this.validateEmail(this.admin.email)
      );
    },
    validateStateNumber(field) {
      var regex = /^[0-9]+$/;
      if (field === "") return null;
      return regex.test(field);
    },
    validateNumber(field) {
      var regex = /^[0-9]+$/;
      return regex.test(field);
    },
    validateStateEmail(field) {
      if (field === "" || field === undefined) return null;
      return field.includes("@");
    },
    validateEmail(field) {
      return field.includes("@");
    },
    isEmpty(field) {
      return field === "" || field === undefined || field === null;
    },
  },
  created() {
    this.getCurrentUser();
    this.loadAdmin();
  },
};
</script>
