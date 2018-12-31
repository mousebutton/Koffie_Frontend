<template>
  <div class="container-fluid">
    <h4>Canvas Editor</h4>

    <div class="row">
      <div class="col-md-4"></div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <div class="card">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="canvas in canvasses" @click="openEditor(canvas)">
              <td>{{canvas.id}}</td>
              <td>{{canvas.description}}</td>
            </tr>
          </tbody>
        </table>
        <button class="btn btn-info" @click="createCanvas()">New canvas</button>
        </div>
      </div>

      <!--Form to edit the Canvas-->
      <div class="col-md-8" v-if="selectedCanvas != null">
          <div class="form-group">
            <input type="text" class="form-control" v-model="selectedCanvas.description">
          </div>

          <div class="form-group"  v-if="selectedCanvas.department != null">
            <label for="exampleSelect2">Bind department</label>
            <select
              class="form-control"
              id="exampleSelect2"
              v-model="selectedCanvas.department.name">
              <option>{{selectedCanvas.department.name}}</option>
              <option v-if="availableDepartments.length > 0" v-for="department in availableDepartments">{{department.name}}</option>
            </select>
          </div>

          <div class="form-group"  v-if="selectedCanvas.department === null">
            <label for="exampleSelect1">Bind department</label>
            <select
              class="form-control"
              id="exampleSelect1">
              <option></option>
              <option v-if="availableDepartments.length > 0" v-for="department in availableDepartments">{{department.name}}</option>
            </select>
          </div>

          <!--Chair Editor-->
        <div v-if="selectedCanvas.department != null" id="chairCard" class="card">
          <div class="form-group">
            <label for="exampleSelect1">Chairs</label>
            <div class="row">
              <div class="col-1"><h6>ID</h6></div>
              <div class="col-2"><h6>Left position</h6></div>
              <div class="col-2"><h6>Top position</h6></div>
              <div class="col-2"><h6>Rotation</h6></div>
              <div class="col-3"><h6>User</h6></div>
            </div>
              <div id="chairEditor" class="row" v-for="chair in selectedCanvas.chairs">
                <div class="col-1">
                   <input type="text" class="form-control" v-model="chair.id" disabled>
                </div>
                <div class="col-2">
                   <input type="text" class="form-control" v-model="chair.leftPos">
                </div>
                 <div class="col-2">
                   <input type="text" class="form-control" v-model="chair.topPos">
                </div>
                  <div class="col-2">
                   <input type="text" class="form-control" v-model="chair.rotation">
                </div>
                  <div class="col-3">
                   <select v-if="chair.user != null " class="form-control" v-model="chair.user.email">
                     <option></option>
                     <option v-for="user in selectedCanvas.department.users">{{user.email}}</option>
                   </select>  
                    <select v-if="chair.user === null" class="form-control" @change="addUserToChair(chair)" v-model="email">
                      <option></option>
                     <option v-for="user in selectedCanvas.department.users">{{user.email}}</option>
                   </select>
                </div>
                <div class="col-1">
                   <button class="btn btn-danger" @click="deleteChair(chair)">X</button>
                </div>
              </div>  
          </div>
          <button class="btn btn-info" @click="createChair()">New Chair</button>    
        </div>

         <button class="btn btn-info" @click="updateCanvas()">Save</button>
         <button class="btn btn-danger" @click="closeEditor()">Cancel</button>
      </div>
    </div>

    <!--Modal popup to create new Canvas-->
    <b-modal v-model="showModal" title="Add new Canvas">
      <b-container fluid>
        <b-row class="mb-1">
          <b-input placeholder="Description.." autofocus v-model="newCanvas.description"></b-input>
        </b-row>

        <b-row class="mb-1">
          <select class="form-control" v-model="newCanvas.department">
            <option v-for="department in availableDepartments">{{department.name}}</option>
          </select>
        </b-row>
        
      </b-container>
      <div slot="modal-footer" class="w-100">
        <b-btn size="md" class="float-right" variant="danger" @click="showModal=false">Close</b-btn>
        <b-btn size="md" class="float-right" variant="info" @click="saveNewCanvas()">Save</b-btn>
      </div>
    </b-modal>

  </div>
</template>
<script>
import axios from "axios";
import config from "../../config/config"

const baseUrl = config.url;
axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");

export default {
  name: "CanvasEditor",

  data() {
    return {
      showModal: false,
      canvasses:[],
      departments: [],
      availableDepartments: [],

      // Canvas objects
      selectedCanvas: null,
      email: '',

      newChair:{
        id: 0,
        leftPos: 0,
        topPos: 0,
        rotation: 0,
        user: null
      },
      
      newCanvas: {
        description: '',
        department: '',
        coffeeMachine: null,
        chairs : []
      }
    };
  },

   mounted() {
    this.getAllCanvasses();
    this.getAllAvailableDepartments();
  },

  methods: {

    openEditor(canvas) {
      this.selectedCanvas = canvas;
    },

    closeEditor() {
      this.selectedCanvas = null;
      this.getAllCanvasses();
    },

    createCanvas() {
      this.showModal = !this.showModal;
    },

    createChair() {
      this.selectedCanvas.chairs.push(this.newChair);
    },

    addUserToChair(chair) {
      let users = this.selectedCanvas.department.users;
      for (let i = 0; i < users.length; i++) {
        if (users[i].email === this.email) {
            chair.user = users[i];
        }
      }
    },

    getAllCanvasses() {
      axios
        .get(baseUrl + "/canvas/all")
        .then(response => {
          this.canvasses = response.data;   
        })
        .catch(error => {
          console.log(error);
        });
    },

    getAllAvailableDepartments() {
      axios
        .get(baseUrl + "/canvas/test")
        .then(response => {
          this.availableDepartments = response.data;   
        })
        .catch(error => {
          console.log(error);
        });
    },

  saveNewCanvas() {
      axios
        .post(baseUrl + "/canvas/new", this.newCanvas)
        .then(response => {
          this.getAllCanvasses();
          this.showModal = !this.showModal;
        })
        .catch(error => {
          console.log(error);
        });
  },

  updateCanvas() {
      axios
        .put(baseUrl + "/canvas/update", this.selectedCanvas)
        .then(response => {
          this.getAllCanvasses();
        })
        .catch(error => {
          console.log(error);
        });
  },

  
  deleteChair(chair) {
      axios
        .delete(baseUrl + "/canvas/chair", {
          params: {
            chairId: chair.id,
            canvasId: this.selectedCanvas.id
          },
        })
        .then(response => {
          this.getAllCanvasses();
        })
        .catch(error => {
          console.log(error);
        });
    },
    
  },

};
</script>

<style>
#chairEditor {
  margin-bottom: 10px;
}

#chairCard {
  margin-bottom: 30px;
}

</style>
