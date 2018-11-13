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
                        <td><button class="btn btn-danger" @click="deleteDepartment(department)">X</button></td>
                    </tr>
                </tbody>
            </table>
            <input id="newDepartmentName" type="text"/>
            <button class="btn btn-info" @click="addDepartment()">add</button>
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
            <input id="userSearch" type="text" placeholder="Find user.." list="users" v-model="user"/>
                <datalist id="users">
                    <option v-for="user in allUsers" >{{user.email}}</option>
                </datalist>
            <button class="btn btn-info" @click="addUserByEmail()">add</button>
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
    test(user) {
      console.log(user);
    },

    // Get all departments
    getAllDepartments() {
      axios
        .get(baseUrl + "/admin/departments/all", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(response => {
          this.departments = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    // Get all users, needed to autocomplete when adding new users to a department
    getAllUsers() {
      axios
        .get(baseUrl + "/admin/departments/users", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(response => {
          this.allUsers = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    // Add new department
    addDepartment() {
      let departmentName = document.getElementById('newDepartmentName');
      let params = new URLSearchParams();
      params.append('departmentName', departmentName.value);

        axios
        .post(baseUrl + "/admin/departments/add", params, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          },
        })
        .then(response => {
          this.departments.push(response.data);
          departmentName.value = '';
        })
        .catch(error => {
          console.log(error);
        });
    },

    // Delete a department (only when there are no users related to the department)
    deleteDepartment(department) {
      if (department.users.length != 0) {
        alert(
          "Error: department " +
            department.name +
            " still has users. \nCannot delete."
        );
      } else {
        axios
          .delete(baseUrl + "/admin/departments/delete/" + department.id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
          .then(response => {
            if (response.status === 200) {
              this.getAllDepartments();
              this.department = response.data
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },

    // Delete user from a department
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
          if (response.status === 200) {
            // Show notification

            // Refresh departments
            this.refreshDepartmentOnUserDelete(userId, departmendId);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    // Add user to a department by email adress
    addUserByEmail() {
      let userByEmail = document.getElementById("userSearch").value;
      console.log(document.getElementById("userSearch").value);
      axios
        .get(baseUrl + "/admin/departments/addUser", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          },
          params: {
            email: userByEmail,
            department: this.department.id
          }
        })
        .then(response => {
          if (response.status === 200) {
            // Show notification

            // Refresh departments
            this.getAllDepartments();
            setTimeout(this.refreshDepartmentOnUserAdded, 100);
            document.getElementById("userSearch").value = "";
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    // Show department details when clicked on a
    showDetails(department) {
      this.users = department.users;
      this.department = department;
    },

    // Refresh the data when a user is added to a department
    refreshDepartmentOnUserAdded() {
      for (var i = 0; i < this.departments.length; i++) {
        if (this.departments[i].id == this.department.id) {
          this.users = this.departments[i].users;
        }
      }
    },

    // Refresh the data when a user is deleted
    refreshDepartmentOnUserDelete(userId, departmendId) {
      for (var i = 0; i < this.departments.length; i++) {
        if (this.departments[i].id === departmendId) {
          for (var j = 0; j < this.departments[i].users.length; j++) {
            if (this.departments[i].users[j].id === userId) {
              this.departments[i].users.splice(j, 1);
            }
          }
        }
      }
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