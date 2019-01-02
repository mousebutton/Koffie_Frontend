<template>
<div id="home">
  <b-img src="https://29leef3dgbjy2kwtvj410dqv-wpengine.netdna-ssl.com/wp-content/uploads/2018/02/Generic-Coffee-Header.jpg" fluid-grow alt="Fluid-Grow image"/>

<div v-if="showLogin" class="wrap fadeInDown">
  <div id="formContent">
    <div class="fadeIn first">
      <h2 v-if="!hasLoginError">Enter your credentials</h2>
      <h2 id="loginError" v-if="hasLoginError">Bad credentials</h2>
    </div>
    <form  @submit.prevent="login">
      <input type="text" id="login" class="fadeIn second" name="login" placeholder="Email" v-model="user.email">
      <input type="password" id="password" class="fadeIn third" name="login" placeholder="Password" v-model="user.password">
      <input type="submit" class="fadeIn fourth" value="Log In">
    </form>
  </div>
</div>
</div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import axios from "axios";

const baseUrl = "http://localhost:8080/api";

export default {
  name: "Home",

  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      showLogin : true,
      hasLoginError: false,
      registrationSucceeded: false,
      firstName: ""
    };
  },

  computed: {
    isValidPassword() {
      return this.user.password.length > 5 ? true : false;
    },
  },

  methods: {
    login() {  
      axios
        .post(baseUrl + "/auth/login", this.user)
        .then(response => {
          if (response.status === 200) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("token", response.data.accessToken);
            this.userIsAdmin(response.data.user.roles);
            this.$router.push("/canvas");
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            this.hasLoginError = true;
          }
        });
    },

    registerUser() {
      if (this.isValidPassword && this.user.email.length > 1) {
        axios
          .post(baseUrl + "/auth/register", this.user)
          .then(response => {
            if (response.data.success === true) {
              this.registrationSucceeded = true;
              setTimeout(() => {
                this.$router.push("/");
              }, 3000);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else alert("Error");
    },

    userIsAdmin(roles) {
      for (var i = 0; i < roles.length; i++) {
        if (roles[i].role === "ADMIN") {
            localStorage.setItem('isAdmin', true);
        }
      }
    }
  },
    
  mounted() {
   let token = localStorage.getItem("token");
   if (token != null) {
     this.showLogin = false;
   }
  },

};
</script>

<style>
 a {
  color: #2aa68b;
  display:inline-block;
  text-decoration: none;
  font-weight: 400;
}

h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display:inline-block;
  margin: 40px 8px 10px 8px; 
  color: #2aa68b;
}

.wrap {
  display: flex;
  align-items: center;
  flex-direction: column; 
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
}

#formContent {
  position: absolute;
  transform: translate(-0%, -90%);
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  text-align: center;
}
#loginError {
  color: red;
}

h2.inactive {
  color: #2aa68b;
}

h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #2aa68b;
}

input[type=button], input[type=submit], input[type=reset]  {
  background-color: #2aa68b;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
  box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type=button]:hover, input[type=submit]:hover, input[type=reset]:hover  {
  background-color: #39ace7;
}

input[type=button]:active, input[type=submit]:active, input[type=reset]:active  {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input[type=text] , input[type=password]{
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type=text]:focus {
  background-color: #fff;
  border-bottom: 2px solid #2aa68b;
}
input[type=password]:focus {
  background-color: #fff;
  border-bottom: 2px solid #2aa68b;
}

input[type=text]:placeholder {
  color: #cccccc;
} 

.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@-webkit-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@-moz-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

.fadeIn {
  opacity:0;
  -webkit-animation:fadeIn ease-in 1;
  -moz-animation:fadeIn ease-in 1;
  animation:fadeIn ease-in 1;

  -webkit-animation-fill-mode:forwards;
  -moz-animation-fill-mode:forwards;
  animation-fill-mode:forwards;

  -webkit-animation-duration:1s;
  -moz-animation-duration:1s;
  animation-duration:1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}

.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #56baed;
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after{
  width: 100%;
}

h1{
    color:#2aa68b;
}

*:focus {
    outline: none;
} 

#icon {
  width:30%;
}
</style>