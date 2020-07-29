<template>
  <div id="app" class="app">
  <v-app>
    <v-content>
       <router-view></router-view>
    </v-content>
  </v-app>
  </div>
</template>

<script>


export default {
  name: 'App',

  components: {

  },

  data: () => ({
    //
  }),
};
</script>
