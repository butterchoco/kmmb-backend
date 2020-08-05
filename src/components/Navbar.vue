<template>
<nav>
    <v-navigation-drawer 
    permanent="permanent"
    id="core-navigation-drawer"
    :right="$vuetify.rtl"
    style="background-color:#1B262C"
    app
    mobile-break-point="960"
    width="350"
    >
        <v-list
        dense
        nav class="p-1">
        <v-list-item two-line>

            <v-list-item-content>
                <v-list-item-title class="white--text title">KMMB</v-list-item-title>
                <v-list-item-subtitle class="white--text">Admin Site</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

        </v-list>

         
        <v-list
        expand
        nav>
            <v-list-item-group>

              <v-list-item  router :to="'/admin/dashboard'">
                  <v-list-item-action>
                      <v-icon class="white--text">mdi-view-dashboard</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                      <v-list-item-title class="white--text">Dashboard</v-list-item-title>
                  </v-list-item-content>
              </v-list-item>

              <v-list-item  router :to="'/admin/users'">
                  <v-list-item-action>
                      <v-icon class="white--text">mdi-account-group</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                      <v-list-item-title class="white--text">Peserta</v-list-item-title>
                  </v-list-item-content>
              </v-list-item>

              <v-list-item  router :to="'/admin/event'">
                  <v-list-item-action>
                      <v-icon class="white--text">mdi-calendar</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                      <v-list-item-title class="white--text">Event</v-list-item-title>
                  </v-list-item-content>
              </v-list-item>

              <v-list-item  router :to="'/admin/'">
                  <v-list-item-action>
                      <v-icon class="white--text">mdi-account-tie-voice</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                      <v-list-item-title class="white--text">Speaker</v-list-item-title>
                  </v-list-item-content>
              </v-list-item>

              <v-list-item  router :to="'/admin'">
                  <v-list-item-action>
                      <v-icon class="white--text">mdi-cash-multiple</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                      <v-list-item-title class="white--text">Sponsor</v-list-item-title>
                  </v-list-item-content>
              </v-list-item>

              <v-list-item  router :to="'/admin/media'">
                  <v-list-item-action>
                      <v-icon class="white--text">mdi-newspaper-variant</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                      <v-list-item-title class="white--text">Media Partner</v-list-item-title>
                  </v-list-item-content>
              </v-list-item>

              <v-list-item  router :to="'/admin'">
                  <v-list-item-action>
                      <v-icon class="white--text">mdi-timeline-check</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                      <v-list-item-title class="white--text">Timeline</v-list-item-title>
                  </v-list-item-content>
              </v-list-item>          

            </v-list-item-group>
            <v-divider style="background-color:#ffffff"></v-divider>
            <v-list-item-group>
              <v-list-item style="border:1px solid white;">
                <v-list-item-action>
                  <v-icon class="white-text" style="color:#ffffff">mdi-power</v-icon>
                </v-list-item-action>
                
                <v-list-item-content>
                      <v-list-item-title @click="logout" class="white--text" style="">Logout</v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
            </v-list-item-group>


        </v-list>
    </v-navigation-drawer>

</nav>

    

</template>

<script>
import {auth} from "../firebase/firebase"

  export default {
    data () {
      return {
        permanent : true,
      
      }
    },
    methods:{
      logout(){
        auth.signOut().then(() => {
          alert("Sukses Log out");
          this.$router.push('/admin/auth');
        })
      }
    }
  }
</script>

<style lang="sass" scoped>
 @import '~vuetify/src/styles/tools/_rtl.sass'

 #core-navigation-drawer
    .v-list-group__header.v-list-item--active:before
      opacity: .24
    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px
        +ltr()
          margin-right: 24px
          margin-left: 12px !important
        +rtl()
          margin-left: 24px
          margin-right: 12px !important
    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px
    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px
        +rtl()
          padding-right: 8px
      .v-list-group__header
        +ltr()
          padding-right: 0
        +rtl()
          padding-right: 0
        .v-list-item__icon--text
          margin-top: 19px
          order: 0
        .v-list-group__header__prepend-icon
          order: 2
          +ltr()
            margin-right: 8px
          +rtl()
            margin-left: 8px
</style>
