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
h1 h5{
  color: #1B262C;
}
table {
  tbody {
    tr {
      cursor: pointer;
    }
  }
}
.labelForm{
  color: #1B262C;
}

.save-btn{
  background-color: #3282b8;
  color: white;
}
</style>