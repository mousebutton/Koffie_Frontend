<template>
  <div class="container">

    <h4>Login</h4>
    <p id="loginError" v-if="hasLoginError">Bad credentials</p>

    <b-form id="loginForm" @submit.prevent="login">
      <b-form-group>
        <b-form-input  
          placeholder="Enter your email adress" 
          v-model="user.email">
        </b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-input 
          type="password" 
          placeholder="Enter your password" 
          v-model="user.password">
        </b-form-input>
      </b-form-group>

      <b-button id="submitButton" type="submit" variant="primary">Submit</b-button>
      <b-button id="resetButton" type="reset" variant="danger">Reset</b-button>
    </b-form>

    <p>Need an account? Register <router-link id="registerLink" to="/register">here</router-link></p>

  </div>
</template>

<script>
import axios from "axios";

const baseUrl = "http://localhost:8080/api";

export default {
  name: "Login",

  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      hasLoginError: false
    };
  },

  methods: {
    login() {
      axios
        .post(baseUrl + "/auth/login", this.user)
        .then(response => {
          if (response.status === 200) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("token", response.data.accessToken);
            this.$router.push("/canvas");
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            this.hasLoginError = true;
          }
        });
    },

    userIsAdmin(roles) {
      for (var i = 0; i < roles.length; i++) {
        if (roles[i].role === "ADMIN") {
            localStorage.setItem('isAdmin', true);
        }
      }
    }
  }
};
</script>

<style>
#loginForm {
  margin-right: auto;
  margin-left: auto;
  width: 60%;
}

@media screen and (max-width: 770px) {
  #loginForm {
    width: 100%;
  }
}

#loginSuccess {
  color: green;
}

#loginError {
  color: red;
}

#submitButton {
  background-color: #57bc90;
  border: none;
}

#submitButton:hover {
  background-color: rgb(30, 148, 97);
}

#registerLink {
  color: #57bc90;
}
</style>