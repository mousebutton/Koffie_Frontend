<template>
<div>
<b-navbar id="navbar" toggleable="md" type="dark" fixed="top">
  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
  <b-navbar-brand href="/">Coffee-App</b-navbar-brand>
   <img src="/static/logo.png"/>
  <b-collapse is-nav id="nav_collapse">
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown right>
        <template slot="button-content"> <img src="/static/user-icon.png"/></template>
        <b-dropdown-item @click="goto">Profile</b-dropdown-item>
         <b-dropdown-item @click="goToAdminDashboard">Admin</b-dropdown-item>
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
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false
    };
  },

  methods: {
    // TODO notify server so the token can be destroyed
    logout() {
      localStorage.clear();
      this.$router.push("/");
      this.showAlert();
    },

    goto() {
      localStorage.getItem("token") === null
        ? this.$router.push("/login")
        : this.$router.push("/profile");
    },

    goToAdminDashboard() {
      this.$router.push("/admin");
    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    }
  }
};
</script>

<style>
#navbar {
  background-color: #2aa68b;
  font-size: 20px;
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
</style>
