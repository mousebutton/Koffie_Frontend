<template>
<div class="container">
    <h1>Departments</h1>
     

<b-list-group>
  <b-list-group-item button v-for="department in departments">{{department.name}}</b-list-group-item>
</b-list-group>

 <button class="btn btn-info">+</button>

</div>
</template>

<script>
import axios from "axios";
const baseUrl = "http://localhost:8080/api";

export default {
  name: "Departments",

  data() {
    return {
        departments: []
    };
  },

  methods: {

      getAllDepartments() {
          axios
          .get(baseUrl + '/admin/departments', {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
          .then(response => {
              this.departments = response.data;
              console.log(this.departments);
          })
          .catch(error => {
              console.log(error);
          })
      }
  },

    beforeMount() {
        this.getAllDepartments();
    }
};
</script>

<style>


</style>