<template>
<div class="container">
        <div class="row">
            <div class="col-12">
                <div class="card">

                    <div class="card-body">
                        <div class="card-title mb-4">
                            <div class="d-flex justify-content-start">
                                <div class="image-container">
                                    <img src="http://placehold.it/150x150"  id="imgProfile" style="width: 150px; height: 150px" class="img-thumbnail" />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="tab-content ml-1" id="myTabContent">
                                    <div class="tab-pane fade show active" id="basicInfo" role="tabpanel" aria-labelledby="basicInfo-tab">
                                        
                                        <div class="row">
                                            <div class="col-sm-3 col-md-2 col-5">
                                                <label style="font-weight:bold;">E-mail</label>
                                            </div>
                                            <div class="col-md-8 col-6">
                                                <b-form-input v-model="user.email"></b-form-input>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-sm-3 col-md-2 col-5">
                                                <label style="font-weight:bold;">Firstname</label>
                                            </div>
                                            <div class="col-md-8 col-6">
                                                <b-form-input v-model="user.firstName"></b-form-input>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-3 col-md-2 col-5">
                                                <label style="font-weight:bold;">Lastname</label>
                                            </div>
                                            <div class="col-md-8 col-6">
                                                <b-form-input v-model="user.lastName"></b-form-input>
                                            </div>
                                        </div>
                                        <hr />

                                    </div>
                                </div>
                            </div>
                        </div>
                      <b-button @click="updateUser" variant="success">Save</b-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Home from "@/components/Home";
import UserParser from "@/util/UserParser";

const baseUrl = "http://localhost:8080/api";

export default {
  components: {
    Home
  },

  name: "UserPage",

  data() {
    return {
      user: {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
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
          console.log(response);
          this.user = UserParser.responseToUser(response, this.user);
        })
        .catch(error => {
          // The token is invalid or expired
          if (error.response.status === 500) {
            localStorage.clear();
            this.$router.push("/login");
          }
        });
    },
    updateUser() {
      axios
        .put(baseUrl + "/users/user", this.user, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(response => {
          this.user.email = response.data.email;
          this.user.roles = response.data.roles;
          this.user.coffeeGroups = response.data.coffeeGroups;
          this.user.firstName = response.data.firstName;
          this.user.lastName = response.data.lastName;
        })
        .catch(error => {
          console.log(error);
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
body {
  background-color: #f8f8f8;
}

.image-container {
  position: relative;
}

.image {
  opacity: 1;
  display: block;
  width: 100%;
  height: auto;
  transition: 0.5s ease;
  backface-visibility: hidden;
}

.image-container:hover .image {
  opacity: 0.3;
}

.image-container:hover .middle {
  opacity: 1;
}
</style>