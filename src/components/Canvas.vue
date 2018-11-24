<template>
  <div>
    <h2>{{departmentForCanvas.name}}</h2>
    <h2>{{noDepartmentMsg}}</h2>

      <div class="row">
          <div class="col-md-3">
            <div class="panel panel-primary">
                <div class="panel-body">
                    <ul v-for="message in received_messages" class="chat">
                        <li class="left clearfix"><span class="chat-img pull-left">
                            <!-- <img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" class="img-circle" /> -->
                        </span>
                            <div class="chat-body clearfix">
                                <div class="header">
                                    <strong class="primary-font">{{message}}</strong> <small class="pull-right text-muted">
                                        <span class="glyphicon glyphicon-time"></span>12 mins ago</small>
                                </div>
                            
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="panel-footer">
                    <div class="input-group">
                        <input id="btn-input" type="text" v-model="send_message" class="form-control input-sm" placeholder="Type your message here..." />
                        <span class="input-group-btn">
                            <button class="btn btn-info btn-sm" id="btn-chat" @click="sendMessage">
                                Send</button>
                        </span>
                    </div>
                </div>
            </div>
      </div>

        <div class="col-md-8">
          <canvas id="c"></canvas>
        </div>

          <order-coffee ref="OrderCoffee"></order-coffee>

    </div>
  </div>
  
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import Canvas from "../canvas/Canvas";
import axios from "axios";
import OrderCoffee from "./OrderCoffee";
import WebsocketUtil from '../util/Websocket';

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
        .get(baseUrl + "/canvas/department/" + this.user.department, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(response => {
          this.chairsForCanvas = response.data.chairs;
          this.coffeeMachine = response.data.coffeeMachine;
          this.departmentForCanvas = response.data.department;
          this.canvas = new Canvas("c", this.chairsForCanvas, this.coffeeMachine, this);
          this.renderCanvas();

          new Notification();
        })
        .catch(error => {
          console.log(error);
        });
    },

    // Render the canvas based on the canvas JSON object
    renderCanvas() {
      // Add all the chairs
      for (let i = 0; i < this.chairsForCanvas.length; i++) {
        let chair = this.chairsForCanvas[i];
        this.canvas.addChair("/static/stoel.png", chair.leftPos, chair.topPos, chair.rotation, chair.user);
      }
      // Add coffee machine
      this.canvas.addCoffeeMachine("/static/coffeemachine.png", this.coffeeMachine.leftPos, this.coffeeMachine.topPos, this.coffeeMachine.rotation, OrderCoffee);
    }
  },

  mounted() {
    this.connectWebsocket();
    this.received_messages = WebsocketUtil.getMessages();
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user.department === "") {
      this.noDepartmentMsg =
        "You are not in a department yet, please contact an admin";
    } else {
      this.getCanvasForUser();
    }

    // this.canvas.addImage("/static/stoel.png", 200, 200, 0);
    // this.canvas.addImage("/static/stoel.png", 200, 260, 0);
    // this.canvas.addImage("/static/stoel.png", 360, 200, 180);
    // this.canvas.addImage("/static/stoel.png", 360, 260, 180);
    // this.canvas.addImage("/static/stoel.png", 300, 100, 180);
    // this.canvas.addImage("/static/stoel.png", 400, 200, 270);
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
