<template>
  <div>
    <h1>Profiel</h1>

    <h4>Gebruikersnaam: {{user.email}}</h4>
   <h4 v-for="role in user.roles">Rol: {{role}}</h4>
   <h4 v-for="group in user.coffeeGroups">Groep: {{group}}</h4>
  <h4 v-if="user.coffeeGroups.length === 0">Je bent nog niet lid van een groep</h4>
  
  </div>
</template>

<script>
import axios from "axios";
const baseUrl = "http://localhost:8080/api";

export default {
  name: "UserPage",

  data() {
    return {
      user: {
        company: 0,
        email: "",
        password: "",
        roles: [{ role: "" }],
        coffeeGroups: [{ name: "" }]
      }
    };
  },

  methods: {
    getUserData() {
      axios
        .get(baseUrl + "/users/who", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(response => {
          this.user.email = response.data.email;
          this.user.roles = response.data.roles;
          this.user.coffeeGroups = response.data.coffeeGroups;
        })
        .catch(error => {
          // The token is invalid or expired
          if (error.response.status === 500) {
            // remove the token from the storage and redirect to login page
            localStorage.clear();
            this.$router.push("/login");
          }
        });
    }
  },

  // Fetch user data before rendering component
  beforeMount() {
    this.getUserData();
  }
};
</script>
<style>
</style>