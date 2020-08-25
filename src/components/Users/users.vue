<template>
  <v-container>
    <div class="mt-5 mb-3">
      <h1>Daftar Peserta</h1>
    </div>

    <p v-if="userList.length === 0">Belum ada peserta terdaftar.</p>
    <table v-else class="table table-hover">
      <thead class="table-borderless">
        <tr class="tr-top">
          <th scope="col">No.</th>
          <th scope="col">Nama Ketua</th>
          <th scope="col">Program Studi</th>
          <th scope="col">Fakultas</th>
          <th scope="col">Instansi</th>
          <th scope="col">Status Pembayaran</th>
          <th scope="col">Status Proposal</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr
          v-for="(user,index) in userList"
          :key="user.id"
          v-b-modal.modal-1
          @click="click(user.id)"
          class="content"
        >
          <th scope="row" class="th-bottom">{{index+1}}</th>
          <td>{{user.ketua.nama_lengkap}}</td>
          <td>{{user.ketua.program_studi}}</td>
          <td>{{user.ketua.fakultas}}</td>
          <td>{{user.ketua.institusi}}</td>
          <td>{{user.verifikasi_pembayaran}}</td>
          <td>{{user.verifikasi_link_proposal}}</td>
        </tr>
      </tbody>
    </table>

    <b-modal size="lg" ref="modalDetail" id="modal-1" title="Detail User" v-bind:hide-footer="true">
      <div class="card">
        <div class="card-header">Detail Peserta</div>
        <div class="card-body">
          <div class="mb-4">
            <b-img-lazy :src="pasFotoKetua" />
          </div>
          <!-- Field Nama Ketua -->
          <div class="mb-4">
            <div class="mb-2 label">
              <strong class="labelForm">Nama Lengkap Ketua</strong>
            </div>
            {{namaKetua}}
          </div>

          <!-- Field Jenis Kelamin -->
          <div class="mb-4">
            <div class="mb-2 label">
              <strong class="labelForm">Jenis Kelamin</strong>
            </div>
            {{genderKetua}}
          </div>

          <!-- Field Tanggal Lahir -->
          <!-- <div class="mb-4">
          <div class="mb-2 label"><strong class="labelForm">Tanggal Lahir</strong></div>
          {{target.birthdate | formatDate}}
          </div>-->

          <!-- Field Nomor Telpon -->
          <div class="mb-4">
            <div class="mb-2 label">
              <strong class="labelForm">Nomor Telpon</strong>
            </div>
            {{phoneKetua}}
          </div>

          <!-- Field Email -->
          <div class="mb-4">
            <div class="mb-2 label">
              <strong class="labelForm">Email</strong>
            </div>
            {{emailKetua}}
          </div>

          <!-- Field Alamat -->
          <div class="mb-4">
            <div class="mb-2 label">
              <strong class="labelForm">Alamat</strong>
            </div>
            {{alamatKetua}}
          </div>

          <!-- Field angkatan -->
          <div class="mb-2">
            <div class="mb-2 label">
              <strong class="labelForm">Angkatan</strong>
            </div>
            {{angkatanKetua}}
          </div>

          <!-- Field Program Studi dan Fakultas         -->
          <div class="mb-3 row">
            <div class="col-6 col-sm-12 col-md-6">
              <div class="mb-2 label">
                <strong class="labelForm">Program Studi</strong>
              </div>
              {{jurusanKetua}}
            </div>

            <div class="col-6 col-sm-12 col-md-6">
              <div class="mb-2 label">
                <strong class="labelForm">Fakultas</strong>
              </div>
              {{fakultasKetua}}
            </div>
          </div>

          <!-- Field Instansi -->
          <div class="mb-4">
            <div class="mb-2 label">
              <strong class="labelForm">Institusi</strong>
            </div>
            {{institusiKetua}}
          </div>

          <!-- Field Surat Keterangan Mahasiswa -->
          <div class="mb-4">
            <div class="mb-2 label">
              <strong class="labelForm">Surat Keterangan Mahasiswa</strong>
            </div>
            <div v-if="suratKeteranganMahasiswaKetua !== ''">
              <a class="linkFile" @click="download(suratKeteranganMahasiswaKetua)">
                <v-btn color="purple">Download</v-btn>
              </a>
            </div>
          </div>

          <!-- Section Daftar Anggota -->
          <div class="card-header">Data Anggota</div>
          <div class="card-body">
            <div class="row">
              <!-- Data Anggota 1 -->
              <div class="col-6">
                <div class="mb-4">
                  <b-img-lazy :src="pasFotoAnggota1" />
                </div>
                <!-- Field Nama Anggota 1 -->
                <div class="mb-4">
                  <div class="mb-2 label">
                    <strong class="labelForm">Nama Lengkap Anggota 1</strong>
                  </div>
                  {{namaAnggota1}}
                </div>

                <!-- Field Jenis Kelamin -->
                <div class="mb-4">
                  <div class="mb-2 label">
                    <strong class="labelForm">Jenis Kelamin</strong>
                  </div>
                  {{genderAnggota1}}
                </div>

                <!-- Field Tanggal Lahir -->
                <!-- <div class="mb-4">
                <div class="mb-2 label"><strong class="labelForm">Tanggal Lahir</strong></div>
                {{target.birthdate | formatDate}}
                </div>-->

                <!-- Field Nomor Telpon -->
                <div class="mb-4">
                  <div class="mb-2 label">
                    <strong class="labelForm">Nomor Telpon</strong>
                  </div>
                  {{phoneAnggota1}}
                </div>

                <!-- Field Email -->
                <div class="mb-4">
                  <div class="mb-2 label">
                    <strong class="labelForm">Email</strong>
                  </div>
                  {{emailAnggota1}}
                </div>

                <!-- Field Alamat -->
                <div class="mb-4">
                  <div class="mb-2 label">
                    <strong class="labelForm">Alamat</strong>
                  </div>
                  {{alamatAnggota1}}
                </div>

                <!-- Field angkatan -->
                <div class="mb-2">
                  <div class="mb-2 label">
                    <strong class="labelForm">Angkatan</strong>
                  </div>
                  {{angkatanAnggota1}}
                </div>

                <!-- Field Program Studi dan Fakultas         -->
                <div class="mb-3 row">
                  <div class="col-6 col-sm-12 col-md-6">
                    <div class="mb-2 label">
                      <strong class="labelForm">Program Studi</strong>
                    </div>
                    {{jurusanAnggota1}}
                  </div>

                  <div class="col-6 col-sm-12 col-md-6">
                    <div class="mb-2 label">
                      <strong class="labelForm">Fakultas</strong>
                    </div>
                    {{fakultasAnggota1}}
                  </div>
                </div>

                <!-- Field Instansi -->
                <div class="mb-4">
                  <div class="mb-2 label">
                    <strong class="labelForm">Institusi</strong>
                  </div>
                  {{institusiAnggota1}}
                </div>

                <!-- Field Surat Keterangan Mahasiswa -->
                <div class="mb-4">
                  <div class="mb-2 label">
                    <strong class="labelForm">Surat Keterangan Mahasiswa</strong>
                  </div>
                  <div v-if="suratKeteranganMahasiswaA1 !== ''">
                    <a class="linkFile" @click="download(suratKeteranganMahasiswaA1)">
                      <v-btn color="purple">Download</v-btn>
                    </a>
                  </div>
                </div>
              </div>

              <!-- Data Anggota 2 -->
              <div class="col-6">
                <div class="mb-4">
                  <b-img-lazy :src="pasFotoAnggota2" />
                </div>
                <!-- Field Nama Anggota 2 -->
                <div class="mb-4">
                  <div class="mb-2 label">
                    <strong class="labelForm">Nama Lengkap Anggota 2</strong>
                  </div>
                  {{namaAnggota2}}
                </div>

                <!-- Field Jenis Kelamin -->
                <div class="mb-4">
                  <div class="mb-2 label">
                    <strong class="labelForm">Jenis Kelamin</strong>
                  </div>
                  {{genderAnggota2}}
                </div>

                <!-- Field Tanggal Lahir -->
                <!-- <div class="mb-4">
                <div class="mb-2 label"><strong class="labelForm">Tanggal Lahir</strong></div>
                {{target.birthdate | formatDate}}
                </div>-->

                <!-- Field Nomor Telpon -->
                <div class="mb-4">
                  <div class="mb-2 label">
                    <strong class="labelForm">Nomor Telpon</strong>
                  </div>
                  {{phoneAnggota2}}
                </div>

                <!-- Field Email -->
                <div class="mb-4">
                  <div class="mb-2 label">
                    <strong class="labelForm">Email</strong>
                  </div>
                  {{emailAnggota2}}
                </div>

                <!-- Field Alamat -->
                <div class="mb-4">
                  <div class="mb-2 label">
                    <strong class="labelForm">Alamat</strong>
                  </div>
                  {{alamatAnggota2}}
                </div>

                <!-- Field angkatan -->
                <div class="mb-2">
                  <div class="mb-2 label">
                    <strong class="labelForm">Angkatan</strong>
                  </div>
                  {{angkatanAnggota2}}
                </div>

                <!-- Field Program Studi dan Fakultas         -->
                <div class="mb-3 row">
                  <div class="col-6 col-sm-12 col-md-6">
                    <div class="mb-2 label">
                      <strong class="labelForm">Program Studi</strong>
                    </div>
                    {{jurusanAnggota2}}
                  </div>

                  <div class="col-6 col-sm-12 col-md-6">
                    <div class="mb-2 label">
                      <strong class="labelForm">Fakultas</strong>
                    </div>
                    {{fakultasAnggota2}}
                  </div>
                </div>

                <!-- Field Instansi -->
                <div class="mb-4">
                  <div class="mb-2 label">
                    <strong class="labelForm">Institusi</strong>
                  </div>
                  {{institusiAnggota2}}
                </div>

                <!-- Field Surat Keterangan Mahasiswa -->
                <div class="mb-4">
                  <div class="mb-2 label">
                    <strong class="labelForm">Surat Keterangan Mahasiswa</strong>
                  </div>
                  <div v-if="suratKeteranganMahasiswaA2 !== ''">
                    <a class="linkFile" @click="download(suratKeteranganMahasiswaA2)">
                      <v-btn color="purple">Download</v-btn>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Field Bukti Pembayaran -->
          <div v-if="isBuktiPembayaranExist" class="mb-4">
            <div class="mb-2 label">
              <strong class="labelForm">Bukti Pembayaran</strong>
            </div>
            <a class="linkFile" @click="download(buktiPembayaran)">
              <v-btn color="purple">Download</v-btn>
            </a>
          </div>

          <div v-else class="mb-4">
            <div class="mb-2 label">
              <strong class="labelForm">Bukti Pembayaran</strong>
            </div>Belum Upload Bukti Pembayaran
          </div>

          <!-- Field Link Video -->
          <div class="mb-4">
            <div class="mb-2 label">
              <strong class="labelForm">Link Video</strong>
            </div>
            <a
              v-if="target.link_video !== ''"
              class="linkFile"
              :href="target.link_video"
            >{{target.link_video}}</a>
            <p v-else>Belum Upload Link Video</p>
          </div>

          <!-- Field Proposal -->
          <div v-if="isProposalExist" class="mb-4">
            <div class="mb-2 label">
              <strong class="labelForm">Proposal</strong>
            </div>
            <a class="linkFile" @click="download(target.proposal)">
              <v-btn color="purple">Download</v-btn>
            </a>
          </div>

          <div v-else class="mb-4">
            <div class="mb-2 label">
              <strong class="labelForm">Proposal</strong>
            </div>Belum Upload Proposal
          </div>

          <b-form @submit.prevent="validateAndSubmit">
            <!-- Field status verifikasi proposal -->
            <b-form-group>
              <div class="mb-2 label">
                <strong class="labelForm">Status Proposal</strong>
              </div>
              <b-form-select
                v-model="target.verifikasi_link_proposal"
                class="form-control"
                v-if="!isStatusProposalCantEdit"
              >
                <b-form-select-option value="Belum Mengupload">Belum Mengupload</b-form-select-option>
                <b-form-select-option value="Menunggu Verifikasi">Menunggu Verifikasi</b-form-select-option>
                <b-form-select-option value="Terverifikasi">Terverifikasi</b-form-select-option>
                <b-form-select-option value="Ditolak">Ditolak</b-form-select-option>
              </b-form-select>
              <p v-else>{{target.verifikasi_link_proposal}}</p>
            </b-form-group>

            <!-- Field status verifikasi pembayaran -->
            <b-form-group>
              <div class="mb-2 label">
                <strong class="labelForm">Status Verifikasi Pembayaran</strong>
              </div>
              <b-form-select
                v-model="target.verifikasi_pembayaran"
                class="form-control"
                v-if="!isStatusPembayaranCantEdit"
              >
                <b-form-select-option value="Belum Membayar">Belum Membayar</b-form-select-option>
                <b-form-select-option value="Menunggu Verifikasi">Menunggu Verifikasi</b-form-select-option>
                <b-form-select-option value="Terverifikasi">Terverifikasi</b-form-select-option>
                <b-form-select-option value="Ditolak">Ditolak</b-form-select-option>
              </b-form-select>
              <p v-else>{{target.verifikasi_pembayaran}}</p>
            </b-form-group>

            <button
              style="color:white"
              type="submit"
              class="btn save-btn mr-2 btn-block"
              v-if="!isDisable"
            >Ubah Status Peserta</button>
          </b-form>

          <br />
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
        <p class="title">User ini akan dihapus ?</p>
        <hr />
        <div class="btn-group">
          <button type="submit" class="btn btn-danger mr-2" @click="deleteUser()">Hapus</button>
          <button class="btn btn-light" @click="hideModal">Batal</button>
        </div>
      </div>
    </b-modal>
  </v-container>
</template>

<style scoped>
.linkFile {
  color: #e84a5f;
}
</style>



<script>
// import moment from 'moment'
import axios from "axios";
import { db, storage } from "../../firebase/firebase";
// import router from '../../router'

export default {
  name: "usersList",
  data() {
    return {
      userList: [],
      target: {},
      errors: [],
      userId: "",

      namaKetua: "",
      genderKetua: "",
      alamatKetua: "",
      phoneKetua: "",
      emailKetua: "",
      jurusanKetua: "",
      fakultasKetua: "",
      institusiKetua: "",
      pasFotoKetua: "",
      angkatanKetua: "",
      suratKeteranganMahasiswaKetua: "",

      namaAnggota1: "",
      genderAnggota1: "",
      alamatAnggota1: "",
      phoneAnggota1: "",
      emailAnggota1: "",
      jurusanAnggota1: "",
      fakultasAnggota1: "",
      institusiAnggota1: "",
      pasFotoAnggota1: "",
      angkatanAnggota1: "",
      suratKeteranganMahasiswaA1: "",

      namaAnggota2: "",
      genderAnggota2: "",
      alamatAnggota2: "",
      phoneAnggota2: "",
      emailAnggota2: "",
      jurusanAnggota2: "",
      fakultasAnggota2: "",
      institusiAnggota2: "",
      pasFotoAnggota2: "",
      angkatanAnggota2: "",
      suratKeteranganMahasiswaA2: "",

      // tanggalLahirKetua:"",
      fileSuratKetMahasiswa1: "",
      fileSuratKetMahasiswa2: "",
      fileSuratKetMahasiswa3: "",
      buktiPembayaran: "",
      proposal: "",
      isProposalExist: false,
      isBuktiPembayaranExist: false,
      isStatusPembayaranCantEdit: false,
      isStatusProposalCantEdit: false,
      isAddress2Exist: false,
      sizeMember3: false,
      isDisable: false,
    };
  },

  methods: {
    loadUser() {
      var userRef = db.collection("user");
      userRef.onSnapshot((snap) => {
        this.userList = [];
        snap.forEach((doc) => {
          var user = doc.data();
          user.id = doc.id;
          if (user.ketua !== null) {
            this.userList.push(user);
          }
        });
      });
    },

    click(userId) {
      this.userId = userId;
      db.collection("user")
        .doc(this.userId)
        .get()
        .then((doc) => {
          console.log(doc.data());
          this.target = doc.data();
          if (this.target.ketua === null) return;
          else if (this.target.ketua.surat_keterangan_mahasiswa === null)
            return;
          this.namaKetua = this.target.ketua.nama_lengkap;
          this.fakultasKetua = this.target.ketua.fakultas;
          this.institusiKetua = this.target.ketua.institusi;
          this.emailKetua = this.target.ketua.email;
          this.phoneKetua = this.target.ketua.nomor_telepon;
          this.jurusanKetua = this.target.ketua.program_studi;
          this.genderKetua = this.target.ketua.jenis_kelamin;
          this.alamatKetua = this.target.ketua.alamat;
          this.angkatanKetua = this.target.ketua.angkatan;
          var gsReference = storage.ref(this.target.ketua.pas_foto);
          gsReference.getDownloadURL().then((link) => {
            this.pasFotoKetua = link;
          });
          this.suratKeteranganMahasiswaKetua = this.target.ketua.surat_keterangan_mahasiswa;

          this.namaAnggota1 = this.target.anggota_1.nama_lengkap;
          this.fakultasAnggota1 = this.target.anggota_1.fakultas;
          this.institusiAnggota1 = this.target.anggota_1.institusi;
          this.emailAnggota1 = this.target.anggota_1.email;
          this.phoneAnggota1 = this.target.anggota_1.nomor_telepon;
          this.jurusanAnggota1 = this.target.anggota_1.program_studi;
          this.genderAnggota1 = this.target.anggota_1.jenis_kelamin;
          this.alamatAnggota1 = this.target.anggota_1.alamat;
          this.angkatanAnggota1 = this.target.anggota_1.angkatan;
          var gsReferenceA1 = storage.ref(this.target.anggota_1.pas_foto);
          gsReferenceA1.getDownloadURL().then((link) => {
            this.pasFotoAnggota1 = link;
          });
          this.suratKeteranganMahasiswaA1 = this.target.anggota_1.surat_keterangan_mahasiswa;

          this.namaAnggota2 = this.target.anggota_2.nama_lengkap;
          this.fakultasAnggota2 = this.target.anggota_2.fakultas;
          this.institusiAnggota2 = this.target.anggota_2.institusi;
          this.pasFotoAnggota2 = this.target.anggota_2.pas_foto;
          this.emailAnggota2 = this.target.anggota_2.email;
          this.phoneAnggota2 = this.target.anggota_2.nomor_telepon;
          this.jurusanAnggota2 = this.target.anggota_2.program_studi;
          this.genderAnggota2 = this.target.anggota_2.jenis_kelamin;
          this.alamatAnggota2 = this.target.anggota_2.alamat;
          this.angkatanAnggota2 = this.target.anggota_2.angkatan;
          var gsReferenceA2 = storage.ref(this.target.anggota_2.pas_foto);
          gsReferenceA2.getDownloadURL().then((link) => {
            this.pasFotoAnggota2 = link;
          });
          this.suratKeteranganMahasiswaA2 = this.target.anggota_2.surat_keterangan_mahasiswa;

          this.fileSuratKetMahasiswa1 = this.suratKeteranganMahasiswaKetua;
          this.fileSuratKetMahasiswa2 = this.suratKeteranganMahasiswaA1;
          this.fileSuratKetMahasiswa3 = this.suratKeteranganMahasiswaA2;

          this.buktiPembayaran = this.target.bukti_pembayaran;
          this.proposal = this.target.proposal;
          if (this.proposal) {
            this.isProposalExist = true;
          } else {
            this.isProposalExist = false;
          }
          if (this.target.bukti_pembayaran) {
            this.isBuktiPembayaranExist = true;
          } else {
            this.isBuktiPembayaranExist = false;
          }

          if (
            this.target.verifikasi_pembayaran == "Terverifikasi" ||
            this.target.verifikasi_pembayaran == "Ditolak"
          ) {
            this.isStatusPembayaranCantEdit = true;
          } else {
            this.isStatusPembayaranCantEdit = false;
          }
          if (
            this.target.verifikasi_link_proposal == "Terverifikasi" ||
            this.target.verifikasi_link_proposal == "Ditolak"
          ) {
            this.isStatusProposalCantEdit = true;
          } else {
            this.isStatusProposalCantEdit = false;
          }
          if (
            this.target.verifikasi_link_proposal == "Terverifikasi" ||
            (this.target.verifikasi_link_proposal == "Ditolak" &&
              this.target.verifikasi_pembayaran == "Terverifikasi") ||
            this.target.verifikasi_pembayaran == "Ditolak"
          ) {
            this.isDisable = true;
          } else {
            this.isDisable = false;
          }
        });
    },

    download(url) {
      console.log(url)
      var gsReference = storage.ref(url);
      gsReference.getDownloadURL().then((link) => {
        axios({
          url: link,
          method: "GET",
          responseType: "blob",
        }).then((response) => {
          console.log(response.data);
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");
          fileLink.href = fileURL;
          const urlSplit = url.split("/");
          const fileName = urlSplit[urlSplit.length - 1];
          const dataSplit = response.data.type.split("/");
          const extension = dataSplit[dataSplit.length - 1];
          if (extension == "x-zip-compressed") {
            fileLink.setAttribute("download", `${fileName}.zip`);
          } else {
            fileLink.setAttribute("download", `${fileName}.${extension}`);
          }
          document.body.appendChild(fileLink);
          console.log(fileLink);

          fileLink.click();
        });
      });
    },

    validateAndSubmit(e) {
      e.preventDefault();
      this.errors = [];

      if (this.errors.length === 0) {
        db.collection("user")
          .doc(this.userId)
          .update({
            verifikasi_pembayaran: this.target.verifikasi_pembayaran,
            verifikasi_link_proposal: this.target.verifikasi_link_proposal,
          })
          .then(() => {
            this.openModal();
          });
      }
    },

    openModal() {
      this.$refs["modalOk"].show();
      window.setTimeout(() => {
        this.$refs["modalOk"].hide();
        this.$refs["modalDetail"].hide();
      }, 2000);
    },

    deleteUser() {
      db.collection("user")
        .doc(this.userId)
        .delete()
        .then(() => {
          this.hideModal();
          this.$refs["modalDetail"].hide();
        });
    },
    hideModal() {
      this.$refs["modalDelete"].hide();
    },
  },
  created() {
    this.loadUser();
  },
};
</script>



