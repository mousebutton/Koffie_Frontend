<template>
<div>
       <b-modal id="modal" size="lg" v-model="show" title="Order you drink">
       <b-container fluid>
           <b-row>
                <div v-for="drink in drinks" class="col-md-4">
                     <b-card id="coffeeCard">
                        <img :src="drink.imageUrl">
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
const baseUrl = "http://localhost:8080/api/admin/drinks";

export default {
  name: "OrderCoffee",

  data() {
    return {
      drinks: [],
      show: false
    };
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
        .get(baseUrl + "/all", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(response => {
          console.log(response.data);
          this.drinks = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>

#coffeeCard:hover {
    background:lightgray;
    
}
</style>