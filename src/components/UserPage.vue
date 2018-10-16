<template>
<div class="container">
        <div class="row">
            <div class="col-12">
                <div class="card">

                    <div class="card-body">
                        <div class="card-title mb-4">
                            <div class="d-flex justify-content-start">
                                <div class="image-container">
                                    <b-img rounded="circle" :src="user.avatar" @click="openFileInput" id="avatar" style="width: 125px; height: 125px" class="img-thumbnail" />
                                    <span>Change avatar</span>
                                    <input type="file" accept="image/*" id="imgupload" style="display:none" @change="onFileSelected" /> 
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="tab-content ml-1" id="myTabContent">
                                    <div class="tab-pane fade show active" id="basicInfo" role="tabpanel" aria-labelledby="basicInfo-tab">
                                                <label id="errorMessage">{{errorMsg}}</label>
                                        <div class="row">
                                            <div class="col-sm-3 col-md-2 col-5">
                                                <label style="font-weight:bold;">E-mail</label>
                                            </div>
                                            <div class="col-md-8 col-6">
                                                <b-form-input disabled v-model="user.email"></b-form-input>
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
const maxAvatarByteSize = 200000; //  = 200kb
const avatarFileToLargeMsg = 'Max avatar size is 200kb';

export default {
  components: {
    Home
  },

  name: "UserPage",

  data() {
    return {
      user: {
        id: 0,
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        shortName: "",
        avatar: "",
        roles: [{ role: "" }],
        coffeeGroups: [{ name: "" }]
      },

      errorMsg: null
    };
  },

  methods: {
    openFileInput() {
      document.getElementById("imgupload").click();
    },

    onFileSelected(event) {
      this.errorMsg = null;
      var preview = document.getElementById("avatar");
      var file = event.target.files[0];
      var reader = new FileReader();

      if (file.size < maxAvatarByteSize) {
        reader.readAsDataURL(file);

        reader.onload = event => {
          this.user.avatar = reader.result;
          preview.src = reader.result;
          this.uploadAvatar();
        };
      }
      else {
        this.errorMsg = avatarFileToLargeMsg;
      }
    },

    uploadAvatar() {
      axios
        .post(baseUrl + "/users/avatar", this.user)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },

    getUserData() {
      axios
        .get(baseUrl + "/users/who", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(response => {
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
          this.user = UserParser.responseToUser(response, this.user);
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

#avatar:hover {
  cursor: pointer;
}

div.image-container span {
  display: none;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #333;
  color: #fff;
}

#errorMessage {
  color: red;
}

div.image-container:hover span {
  display: block;
}
</style>