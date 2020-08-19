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
                <strong class="labelForm">Password</strong>
              </div>
              {{user.password}}
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
                placeholder="Masukkan nama lengkap"
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
                placeholder="Masukkan email"
                :state="validateStateEmail(admin.email)"
              ></b-form-input>
            </b-form-group>

            <!-- Field Password -->
            <b-form-group description="Password minimal 8 karakter dan setidaknya satu huruf besar, huruf kecil, dan angka.">
              <div class="mb-2 label">
                <strong class="labelForm">Password *</strong>
              </div>
              <b-form-input
                class="form-control"
                v-model="admin.password"
                id="password"
                placeholder="Masukkan password"
                type="password"
                :state="validateStatePassword(admin.password)"
              ></b-form-input>
            </b-form-group>

            <!-- Field Confirmation Password -->
            <b-form-group>
              <div class="mb-2 label">
                <strong class="labelForm">Konfirmasi Ulang Password *</strong>
              </div>
              <b-form-input
                class="form-control"
                v-model="admin.confirmationPassword"
                id="confirmartionPassword"
                placeholder="Masukkan ulang password"
                type="password"
                :state="validateStateConfirmationPassword(admin.confirmationPassword)"
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
const strongPasswordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
);

export default {
  name: "dashboard",
  data() {
    return {
      currentUser: {},
      admin: {
        nama: "",
        email: "",
        password: "",
        confirmationPassword: "",
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
          this.adminList.push(userData);
        });
      });
    },
    getCurrentUser() {
      var currentUser = auth.currentUser;
      this.currentUser = currentUser;
    },
    validateAndSubmit(e) {
      e.preventDefault();
      auth.createUserWithEmailAndPassword(this.admin.email, this.admin.password).then(({user}) => {
        this.createAdminDocument(user);
      }).catch((error) => {
        alert(error.message);
      })
    },
    createAdminDocument(user) {
      db.collection("admin")
        .doc(user.uid).set({
          nama: this.admin.nama,
          email: this.admin.email,
          password: this.admin.password,
        })
        .then(() => {
          const addAdminRole = functions.httpsCallable("addAdminRole");
          addAdminRole({ email: this.admin.email }).then(() => {
            this.admin = {};
            this.openModal();
          });
        });
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
        this.isEmpty(this.admin.password) ||
        this.isEmpty(this.admin.email) ||
        !this.validatePassword(this.admin.password) ||
        !this.validateConfirmationPassword(this.admin.confirmationPassword) ||
        !this.validateEmail(this.admin.email)
      );
    },
    validateConfirmationPassword(field) {
      return field === this.admin.password;
    },
    validateStateConfirmationPassword(field) {
      if (field === "") return null;
      return field === this.admin.password;
    },
    validateStatePassword(field) {
      if (field === "") return null;
      return strongPasswordRegex.test(field);
    },
    validatePassword(field) {
      return strongPasswordRegex.test(field);
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
