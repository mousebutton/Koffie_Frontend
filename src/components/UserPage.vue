<template>
  <div>
    <h1>Profiel</h1>

    <h4>Gebruikersnaam: {{user.email}}</h4>
   <h4 v-for="role in user.roles">Rol: {{role}}</h4> -->
   <h4 v-for="group in user.coffeeGroups">Groep: {{group}}</h4>
  <h4 v-if="user.coffeeGroups.length === 0">Je bent nog niet lid van een groep</h4>

   <div>
      <b-form-input v-model="user.firstName" type="text" placeholder="FirstName"></b-form-input>
     <b-form-input v-model="user.lastName" type="text" placeholder="LastName"></b-form-input>
    </div> 
    <br> 
      <button class="button" @click="updateUser"> Opslaan</button>  

  </div>
</template>

<script>
import axios from "axios";
const baseUrl = "http://localhost:8080/api";

export default {
  name: 'UserPage',

   data() {
    return {
      user: {
        id: 0,
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        roles: [{role: ""}],
        coffeeGroups: [{name: ""}],            
      }
    };
  },

  methods: {
      
       getUserData () {
       axios
        .get(baseUrl + "/users/who", { 
            headers: { 
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                       
                      },
            })
        .then(response => {
            this.user.id = response.data.id;
            this.user.email = response.data.email;
            this.user.roles = response.data.roles;
            this.user.coffeeGroups = response.data.coffeeGroups;
        })
        .catch(error => {
          // The token is invalid or expired
          if (error.response.status === 500){
              // remove the token from the storage and redirect to login page
              localStorage.clear();
              this.$router.push("/login");
            }
        });
      },
      updateUser() { 
         axios
          .put (baseUrl + "/users/user", this.user, {
            headers: { 
              'Authorization': 'Bearer ' + localStorage.getItem('token'),

            }
          }).then(response => {
            this.user.email = response.data.email;
            this.user.roles = response.data.roles;
            this.user.coffeeGroups = response.data.coffeeGroups;
            this.user.firstName = response.data.firstName;
            this.user.lastName = response.data.lastName;

          }).catch(error => {
            console.log(error);
                   
        });

      }
          
      },

    // Fetch user data before rendering component
    beforeMount() {
      this.getUserData();
    }
  }

</script>

<style>

</style>

