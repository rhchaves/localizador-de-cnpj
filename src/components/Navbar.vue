<template>
  <div id="nav" class="clearfix">
    <div id="logoUrl">
      <router-link to="/">
        <img :src="logo" :alt="alt" style="height: 100px" />
      </router-link>
    </div>
    <router-link to="/">Home</router-link>
    <router-link to="/search">Buscar</router-link>
    <router-link to="/list">Lista salva</router-link>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: ["logo", "alt"],
};
</script>

<style scoped>
#nav {
  background-color: #f2f2f2;
  border-bottom: 4px solid #003772;
  padding: 15px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#logoUrl {
  margin: auto;
  margin-left: 0;
}

#nav a {
  color: #003772;
  font-weight: bold;
  text-decoration: none;
  margin: 12px;
  transition: 0.3s;
}

#nav a:hover {
  color: #04b8ff;
}
</style>
