<template>
<div id="home">
  <b-img src="https://29leef3dgbjy2kwtvj410dqv-wpengine.netdna-ssl.com/wp-content/uploads/2018/02/Generic-Coffee-Header.jpg" fluid-grow alt="Fluid-Grow image"/>
  <div class="test">
   
  </div>
</div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

const baseUrl = "http://localhost:8080/api";

export default {
  name: "Home",


};
</script>

<style>

</style>