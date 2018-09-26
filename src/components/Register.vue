<template>
  <div class="container">
    <h4 id="successMessage" v-if="registrationSucceeded">Registration completed :-) you will be redirected to the login page</h4>
    <h2 v-if="!registrationSucceeded">Create your account</h2>
    <p v-if="!registrationSucceeded">Please fill out the required information</p>
    
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
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger" @click="clearForm">Reset</b-button>
    </b-form>

  </div>
</template>

<script>
import axios from "axios";
const baseUrl = "http://localhost:8080/api";

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
        password: ""
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
      if (this.isValidPassword && this.user.email.length > 1) {
        console.log(JSON.stringify(this.user));
        axios
          .post(baseUrl + "/auth/register", this.user)
          .then(response => {
            if (response.data.success === true) {
              // redirect to login page, after small timeout
              this.registrationSucceeded = true;
              setTimeout(() => {
                this.$router.push("/login");
              }, 3000);
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
    }
  }
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
</style>