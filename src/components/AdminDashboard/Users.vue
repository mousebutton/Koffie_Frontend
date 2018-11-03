<template>
<div class="container-fluid">
    <div class="row">
        <div class="col-lg-6">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Names</th>   
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="name in allUsers">
                        <td>{{name.firstName}}</td>                                                 
                    </tr>                    
                </tbody>
            </table>
        </div>
    </div>

</div>
</template>

<script>
import axios from "axios";
const baseUrl = "http://localhost:8080/api";

export default {
  name: "Users",

  data() {
    return {     
      allUsers: [],
      allUser: null      
    };
  },

  methods: {    

    getAllUsers() {
      axios
        .get(baseUrl + "/admin/departments/users", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(response => {
          this.allUsers = response.data;
          console.log(this.allUsers);
        })
        .catch(error => {
          console.log(error);
        });
    },
  },

  beforeMount() {    
    this.getAllUsers();
  }
};
</script>

<style>
.container-fluid {
  padding: 0 30px;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
}
</style>