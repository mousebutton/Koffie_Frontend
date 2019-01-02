<template>
  <div id="app"> 
    <Navigation id="navbar"></Navigation>
    <router-view id="container"></router-view>
  </div>
</template>

<script>
import Navigation from "./components/Navigation";
export default {
  name: "app",
  components: {
    Navigation: Navigation
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

#container {
  margin-top: 80px;
}
</style>
