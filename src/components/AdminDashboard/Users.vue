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
                    <tr v-for="user in allUsers">
                        <td>{{user.email}}</td>                                                 
                    </tr>                    
                </tbody>
            </table>
        </div>
    </div>

</div>
</template>

<script>
import axios from "axios";
import config from "../../config/config"

const baseUrl = config.url + "/api";
axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");

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
        .get(baseUrl + "/admin/departments/users")
        .then(response => {
          this.allUsers = response.data;
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
