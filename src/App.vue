<template>
  <div id="app" v-if="show">
    <!-- mw-100 coloca a página na largura máxima -->
    <b-container fluid class="min-vh-100 mw-100">
      <Navbar :logo="logo_src" :alt="app_name" />
      <router-view />

      <Footer />
    </b-container>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },

  data() {
    return {
      logo_src: "/img/logo.png",
      app_name: "BuscadorCNPJ",

      show: true,
    };
  },
};
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  /* padding: 0; */
  /* margin: 0; */
  /* height: 100%; */
  /* width: 100%; */
  /* box-sizing: border-box; */
  color: #003772;
}

.mainContainer {
  min-height: 60vh;
}
/*
.titulo {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
} */
</style>
