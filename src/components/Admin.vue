<template>
  <div class="container">

      <h1>Welcome admin</h1>

  </div>
</template>

<script>
import axios from "axios";
const baseUrl = "http://localhost:8080/api";

export default {
  name: "Admin",

  data() {
    return {
     
      user: {
        email: "",
        password: ""
      },
    }
  }
}
      
</script>

<style>
#registerForm {
  margin-right: auto;
  margin-left: auto;
  width: 60%;
}

@media screen and (max-width: 770px) {
  #registerForm {
    width: 100%;
  }
}

#submitButton{
  background-color: #57BC90;
  border: none;
}

#submitButton:hover{
  background-color: rgb(30, 148, 97);
}
</style>