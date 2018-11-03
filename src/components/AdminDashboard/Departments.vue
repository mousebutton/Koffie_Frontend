<template>
<div class="container-fluid">
<h4 v-if="department != null">{{department.name}}</h4>

<!--Table with all departments-->
    <div class="row">
        <div class="col-lg-6">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Users</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="department in departments" @click="showDetails(department)">
                        <td>{{department.name}}</td>
                        <td>{{department.users.length}}</td>
                        <td><button class="btn btn-danger">X</button></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!--Table with all department users-->
         <div class="col-lg-6" v-if="department != null">
             <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Email</th>
                        <th scope="col">Name</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users">
                        <td>{{user.email}}</td>
                         <td>{{user.firstName}} {{user.lastName}}</td>
                        <td><button class="btn btn-danger" @click="deleteUserFromDepartment(user.id, department.id)">X</button></td>
                    </tr>
                </tbody>
            </table>
            <input id="userSearch" type="text" placeholder="Find user.." list="users" v-bind="user"/>
                <datalist id="users">
                    <option v-for="user in allUsers">{{user.email}}</option>
                </datalist>
            <button id="addUserButton" class="btn btn-info" @click="addUserByEmail()">add</button>
        </div>
        
    </div>

</div>
</template>

<script>
import axios from "axios";
const baseUrl = "http://localhost:8080/api";

export default {
  name: "Departments",

  data() {
    return {
      departments: [],
      users: [],
      department: null,
      allUsers: [],
      user: null
    };
  },

  methods: {
    getAllDepartments() {
      axios
        .get(baseUrl + "/admin/departments/all", {
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
        });
    },

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

    deleteDepartment(department) {
      console.log(department.users);
    },

    showDetails(department) {
      this.users = department.users;
      this.department = department;
    },

    deleteUserFromDepartment(userId, departmendId) {
      axios
        .delete(baseUrl + "/admin/departments/deleteUser", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          },
          params: {
            user: userId
          }
        })
        .then(response => {
        })
        .catch(error => {
          console.log(error);
        });

      this.refreshData(userId, departmendId);
    },

    refreshData(userId, departmendId) {
      for (var i = 0; i < this.departments.length; i++) {
        if (this.departments[i].id === departmendId) {
          for (var j = 0; j < this.departments[i].users.length; j++) {
            if (this.departments[i].users[j].id === userId) {
              this.departments[i].users.splice(j, 1);
            }
          }
        }
      }
    },

    addUserByEmail() {
      let userByEmail = document.getElementById("userSearch").value;
      console.log(userByEmail);
  
      axios
        .get(baseUrl + "/admin/departments/addUser", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          },
          params: {
            email: userByEmail
          }
        })
        .then(response => {})
        .catch(error => {
          console.log(error);
        });
    }
  },

  beforeMount() {
    this.getAllDepartments();
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