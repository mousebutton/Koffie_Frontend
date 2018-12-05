<template>
  <div>
    <h2>{{departmentForCanvas.name}}</h2>
    <h2>{{noDepartmentMsg}}</h2>
      <div class="col-md-8">
        <canvas id="c"></canvas>
      </div>
      <order-coffee ref="OrderCoffee"></order-coffee>
  </div>
  
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import Canvas from "../canvas/Canvas";
import axios from "axios";
import OrderCoffee from "./OrderCoffee";
import WebsocketUtil from '../util/Websocket';

axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");

const baseUrl = "http://localhost:8080/api";

export default {
  name: "Canvas",

  data() {
    return {
      // Websocket
      received_messages: [],
      received_notifications: [],
      send_message: null,
      connected: false,

      // Canvas
      user: {},
      noDepartmentMsg: "",
      chairsForCanvas: [],
      departmentForCanvas: {},
      coffeeMachine: {}
    };
  },

  components : {
    'order-coffee' : OrderCoffee
  },

  methods: {

    orderCoffee(){
        this.$refs.OrderCoffee.toggleModal();
    },

 connectWebsocket() {
    WebsocketUtil.connectWebsocket();
  },

   disconnectWebsocket() {
    WebsocketUtil.disconnectWebsocket();
  },

    sendMessage() {
      WebsocketUtil.sendMessage(this.send_message);
    },


      // Get the canvas based on the department the user is in
      getCanvasForUser() {
        axios
          .get(baseUrl + "/canvas/department/" + this.user.department)
          .then(response => {
            this.chairsForCanvas = response.data.chairs;
            this.coffeeMachine = response.data.coffeeMachine;
            this.canvas = new Canvas("c", this.chairsForCanvas, this.coffeeMachine, this);
            this.canvas.addStage();
          })
          .catch(error => {
            console.log(error);
          });
          },

    },

    mounted() {
      // this.connectWebsocket();
      this.user = JSON.parse(localStorage.getItem("user"));
      // this.user = {department: "Verkoop", coffeeMachine: {leftPos: 100, rightPos: 100}};
    
      if (this.user.department === "") {
        this.noDepartmentMsg =
          "You are not in a department yet, please contact an admin";
      } else {
        this.getCanvasForUser();
      }
      
      // let chairsForCanvas = [];
      // let coffeeMachine = {leftPos: 100, topPos: 100, rotation: 0};
      // this.canvas.addChairs(chairsForCanvas);
      // this.canvas.addCoffeeMachine("/static/coffeemachine.png", coffeeMachine.leftPos, coffeeMachine.topPos, coffeeMachine.rotation, OrderCoffee);
    }
  };
</script>

<style scoped>
.chat
{
    list-style: none;
    margin: 0;
    padding: 0;
}

.chat li
{
    margin-bottom: 10px;
    padding-bottom: 5px;
    border-bottom: 1px dotted #B3A9A9;
}

.chat li.left .chat-body
{
    margin-left: 10px;
}

.chat li.right .chat-body
{
    margin-right: 400px;
}


.chat li .chat-body p
{
    margin: 0;
    color: #777777;
}

.panel .slidedown .glyphicon, .chat .glyphicon
{
    margin-right: 5px;
}

.panel-body
{
    overflow-y: scroll;
    height: 750px;
}

::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
}

::-webkit-scrollbar
{
    width: 12px;
    background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
}
</style>
