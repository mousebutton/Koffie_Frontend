<template>
  <div class="container">
    <h4 id="successMessage" v-if="registrationSucceeded">Registration completed, returning to user page</h4>
    <h2 v-if="!registrationSucceeded">Create a new account</h2>
    <p v-if="!registrationSucceeded">Please fill in the information</p>    
    <b-form id="registerForm" @submit.prevent="registerUser" v-if="!registrationSucceeded">
      <b-form-group>
        <b-form-input 
          id="email"  
          v-model="user.email" 
          type="email"
          placeholder="Enter your email adress">
        </b-form-input>
      </b-form-group>   
      <b-form-group>
        <b-form-input 
          id="password" 
          v-model="user.password" 
          type="password"
          :state="isValidPassword" 
          placeholder="Enter your password">
        </b-form-input>
        <b-form-invalid-feedback>Enter at least 6 characters</b-form-invalid-feedback>
        <br>
        <input @change="adminRole" type="checkbox" value="Admin rol">        
        <label for="admin">Admin</label>   
      </b-form-group>
      <b-button id="submitButton" type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger" @click="clearForm">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import config from "../config/config"

const baseUrl = config.url + "/api";
let counter = 0;      

export default {
  name: "Register",

  data() {
    return {
      options: [
        {value: null, text: 'Please select an option'},
         {value: 'a', text: 'This is First option' 
}
      ],
      user: {
        email: "",
        password: "",
        adminRole: "",
      },            
      registrationSucceeded: false
    };
  },

  computed: {
    isValidPassword() {
      return this.user.password.length > 5 ? true : false;
    }
  },

  methods: {    

    registerUser() {
      let params = new URLSearchParams();
      params.append("admin", this.admin);
      if (this.isValidPassword && this.user.email.length > 1) {
        axios         
          .post(baseUrl + "/auth/register", this.user, params)
          .then(response => {
            if (response.data.success === true) {
              // redirect to login page, after small timeout
              this.registrationSucceeded = true;
              setTimeout(() => {
                this.$router.push("/users");
              }, 2000);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else alert("Error");
    },

    clearForm() {
      this.user.email = "";
      this.user.password = "";
      this.user.adminRole = false;
    },
    adminRole() {      
      this.user.adminRole=!this.user.adminRole;      
  }}
};
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
