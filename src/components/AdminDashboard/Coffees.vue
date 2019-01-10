<template>
<div class="container">
  <h2>Drinks</h2>
<div class="row">
  <b-btn @click="show=true" variant="info">Add drink</b-btn>
</div>
<div class="row">
  <div v-for="drink in drinks" class="col-md-3">
      <b-card id="coffeeCard">
      <b-btn size="md" class="float-right" variant="danger" @click="deleteDrink(drink)">X</b-btn>
         <img :src="drink.imageUrl">
        <h4 class="card-text">{{drink.name}}</h4>
      </b-card>
  </div>
</div>

    <b-modal v-model="show"
             title="Add new drink">
       <b-container fluid>
         <b-row class="mb-1">
           <h6 id="errorMsg">{{errorMsg}}</h6>
          <b-input placeholder="name" v-model="newDrink.name" autofocus autocomplete="off"></b-input>
         </b-row>
        
         <b-row class="mb-1">
            <b-form-file placeholder="Choose a image..." v-model="newDrink.imageUrl" accept="image/jpeg, image/png, image/gif" ref="fileinput"></b-form-file>
         </b-row>

       </b-container>
       <div slot="modal-footer" class="w-100">
          <b-btn size="md" class="float-right" variant="danger" @click="show=false">
           Close
          </b-btn>
          <b-btn size="md" class="float-right" variant="info" @click="addDrink">
           Save
         </b-btn>

       </div>
    </b-modal>

</div>
</template>

<script>
import axios from "axios";
import Drink from '@/models/Drink'
import config from "../../config/config"


const baseUrl = config.url + "/api/admin/drinks";
axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");

export default {
  name: "Koffies",

  data() {
    return {
      show: false,

      drink: {name: '', imageUrl: ''},
      newDrink: {name: '', imageUrl: ''},
      drinks: [],
      errorMsg: ''
    };
  },

  mounted() {
    this.getAllDrinks();
  },

  methods: {
    getAllDrinks(){
      axios
        .get(baseUrl + "/all")
        .then(response => {
          console.log(response.data);
          this.drinks = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    saveDrink(){
      axios
        .post(baseUrl + "/add", new Drink(this.newDrink))
        .then(response => {
          this.newDrink.name = '';
          this.newDrink.imageUrl = '';
          this.$refs.fileinput.reset();
          this.getAllDrinks();
        })
        .catch(error => {
          console.log(error);
        });
    },

    deleteDrink(drink){
      axios
        .delete(baseUrl + "/delete", {params: {drinkId:drink.id}})
        .then(response => {
          this.getAllDrinks();
        })
        .catch(error => {
          console.log(error);
        });
    },

    addDrink() {
      if (this.newDrink.name != '' && (this.newDrink.imageUrl != '' & this.newDrink.imageUrl != null)) {
          this.drinks.push(new Drink(this.newDrink));
          this.show = !this.show;
          this.saveDrink();
      }
      else {
        this.errorMsg = 'Please enter the name and pick an image';
      }
      
    },
  }
};
</script>

<style>
#coffeeCard {
  margin-top: 20px;
  background: #f7f6f6;
}

#errorMsg {
  color: red;
}
</style>
