<template>
  <div id="app" class="app">
  <v-app>
    <v-main>
       <router-view></router-view>
    </v-main>
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
<style lang="scss">
table {
  tbody {
    tr {
      cursor: pointer;
    }
  }
}
</style>