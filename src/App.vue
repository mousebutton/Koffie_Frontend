<template>
  <div id="app">
    <Navigation></Navigation>
    <img src="https://github.com/jonashackt/spring-boot-vuejs/blob/master/frontend/src/assets/spring-boot-vuejs-logo.png?raw=true"/>
    <div>
</div>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from './components/Navigation'
export default {
  name: 'app',
  components: {
    'Navigation': Navigation
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
