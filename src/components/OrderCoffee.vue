<template>
<div>
       <b-modal id="modal" size="lg" v-model="show" title="Order you drink">
       <b-container fluid>
           <b-row>
                <div v-for="drink in drinks" class="col-md-4">
                     <b-card id="coffeeCard">
                        <img :src="drink.imageUrl" @click="orderDrink(drink)">
                        <h4 class="card-text">{{drink.name}}</h4>
                    </b-card>
                </div>
           </b-row>
       </b-container>

       <div slot="modal-footer" class="w-100">
          <b-btn size="md" class="float-right" variant="danger" @click="toggleModal">Close</b-btn>
          <b-btn size="md" class="float-right" variant="info">Save
        </b-btn>

       </div>
    </b-modal>
</div>
</template>

<script>
import axios from "axios";
import Canvas from "../canvas/Canvas";
import WebsocketUtil from '../util/Websocket';
import config from "../config/config"

const baseUrl = config.url + "/api/admin/drinks";
axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");

export default {
  name: "OrderCoffee",

  data() {
    return {
      drinks: [],
      show: false
    };
  },

  components : {
    'canvas' : Canvas
  },

  mounted() {
    this.getAllDrinks();
  },

  methods: {
    toggleModal() {
      this.show = !this.show;
    },

    getAllDrinks() {
      axios
        .get(baseUrl + "/all")
        .then(response => {
          this.drinks = response.data;
        })
        .catch(error => {
          console.log(error);
        }); 
    },

    orderDrink(drink) {
      this.toggleModal();
      WebsocketUtil.sendMessage('Ordered ' + drink.name);
    }
  }
};
</script>

<style>

#coffeeCard:hover {
    background:lightgray;
    cursor: pointer;
}
</style>
