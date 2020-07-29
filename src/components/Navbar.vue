<template>

    <v-navigation-drawer
      class="red accent-4"
      absolute
      permanent
      left


    >
      <v-list
          dense
          nav
          class="p-1"
        >
          <v-list-item two-line :class="miniVariant && 'px-0'">

            <v-list-item-content>
              <v-list-item-title class="white--text title">KMMB</v-list-item-title>
              <v-list-item-subtitle class="white--text">Admin Site</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item-group>

            <v-list-item  router :to="'/admin'">
                <v-list-item-action>
                    <v-icon class="white--text">mdi-view-dashboard</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title class="white--text">Dashboard</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item  router :to="'/admin'">
                <v-list-item-action>
                    <v-icon class="white--text">mdi-account-group</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title class="white--text">Users</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item  router :to="'/admin'">
                <v-list-item-action>
                    <v-icon class="white--text">mdi-calendar</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title class="white--text">Event</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item  router :to="'/admin'">
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

            <v-list-item  router :to="'/admin'">
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

          

          
        </v-list>

      
    </v-navigation-drawer>

</template>

<script>
  export default {
    data () {
      return {
        items: [
          { title: 'Home', icon: 'mdi-home-city' },
          { title: 'My Account', icon: 'mdi-account' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
        ],
      }
    },
  }
</script>
