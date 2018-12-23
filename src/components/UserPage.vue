<template>
<div class="container">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">               
                        <div class="row">
                                <div class="image-container">
                                    <b-img rounded="circle" :src="user.avatar" @click="openFileInput" id="avatar" style="width: 125px; height: 125px" class="img-thumbnail" />
                                    <span>Change avatar</span>
                                    <input type="file" accept="image/*" id="imgupload" style="display:none" @change="onFileSelected" /> 
                                </div>             
                        </div>

                              <h6 id="errorMessage">{{errorMsg}}</h6>   

                        <form>
                          <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Email</label>
                              <div class="col-sm-10">
                                <input type="email"  readonly class="form-control" v-model="user.email">
                              </div>
                          </div>

                          <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Afdeling</label>
                              <div class="col-sm-10">
                                <input type="email"  readonly class="form-control" v-model="user.department">
                              </div>
                          </div>

                          <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Firstname</label>
                              <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="user.firstName">
                              </div>
                          </div>

                           <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Lastname</label>
                              <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="user.lastName">
                              </div>
                          </div>
                          
                          <button type="button" class="btn btn-info" @click="updateUser">Save</button>
                        </form>   
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

axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");
const baseUrl = "http://ec2-54-93-222-44.eu-central-1.compute.amazonaws.com:8080/api";
const maxAvatarByteSize = 200000; //  = 200kb
const avatarFileToLargeMsg = "Max avatar size is 200kb";

export default {
  components: {
    Home
  },

  name: "UserPage",

  data() {
    return {
      user: {},
      errorMsg: null
    };
  },

  methods: {
    openFileInput() {
      document.getElementById("imgupload").click();
    },

    fetchUserData() {
      axios
        .get(baseUrl + "/users/who")
        .then(response => {
          this.user = response.data;
          localStorage.setItem("user", JSON.stringify(response.data));
        })
        .catch(error => {
          console.log(error);
        });
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
      } else {
        this.errorMsg = avatarFileToLargeMsg;
      }
    },

    uploadAvatar() {
      axios
        .post(baseUrl + "/users/avatar", this.user)
        .then(response => {
          localStorage.setItem("user", JSON.stringify(response.data));
        })
        .catch(error => {
          console.log(error);
        });
    },

    updateUser() {
      axios
        .put(baseUrl + "/users/user", this.user)
        .then(response => {
          this.user = response.data;
          localStorage.setItem("user", JSON.stringify(response.data));
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  beforeMount() {
    this.fetchUserData();
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