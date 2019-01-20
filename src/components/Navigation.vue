<template>
<div>
<b-navbar id="navbar" toggleable="md" type="dark" fixed="top">
  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
  <b-navbar-brand >Coffee-App</b-navbar-brand>
   <img src="/static/logo.png"/>
  <b-navbar-brand href="/canvas">Canvas</b-navbar-brand>
  <b-collapse is-nav id="nav_collapse">
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown right>
        <template slot="button-content"> <b-img rounded="circle" :src="img" class="thumbnail"></b-img></template>
        <b-dropdown-item @click="gotoProfile">Profile</b-dropdown-item>
         <b-dropdown-item v-if="isAdmin" @click="goToAdminDashboard">Admin</b-dropdown-item>
        <b-dropdown-item @click="logout">Logout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>

<b-alert id="alert" :show="dismissCountDown"
             dismissible
             @dismissed="dismissCountDown=0"
             @dismiss-count-down="countDownChanged">
        Logged out successfully
    </b-alert>
</div>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      img: "",
      isAdmin: false,
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false
    };
  },

  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
      location.reload();
      this.showAlert();
    },

    gotoProfile() {
      localStorage.getItem("token") === null
        ? this.$router.push("/")
        : this.$router.push("/profile");
    },
    goToAdminDashboard() {
      this.$router.push("/users");
    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    }
  },

  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));
    user === null ? this.img = './static/user-icon.png' : this.img = user.avatar;
    
    if (localStorage.getItem("isAdmin") === 'true') {
      this.isAdmin = true;
    }
  }
};
</script>

<style>
#navbar {
  background-color: #2aa68b;
  font-size: 20px;
  color: white;
}

#alert {
  border: none;
  opacity: 1;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 1s;
  position: fixed;
  bottom: 0px;
  width: 100%;
  z-index: 9999;
  border-radius: 0px;
  background-color: #2aa68b;
  color: white;
  font-size: 20px;
}

@keyframes fadeInOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.thumbnail {
  display: inline-block;
  background: #bfbfbf;
  width: 50px;
  color: #ffffff;
  line-height: 50px;
  text-align: center;
  text-decoration: none;
  -webkit-transition: background 0.3s linear 0s;
  -moz-transition: background 0.3s linear 0s;
  -ms-transition: background 0.3s linear 0s;
  -o-transition: background 0.3s linear 0s;
  transition: background 0.3s linear 0s;
}
</style>
