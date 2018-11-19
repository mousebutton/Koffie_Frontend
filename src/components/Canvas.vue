<template>
  <div>
    <h2>{{departmentForCanvas.name}}</h2>
    <h2>{{noDepartmentMsg}}</h2>

    <div class="row">
      <div class="col-md-2">
        <h2>Messages Received</h2>
        <p v-for="message in received_messages">{{message}}</p>

        <h2>Notifications Received</h2>
        <p v-for="notification in received_notifications">{{notification}}</p>

        <input v-model="send_message" placeholder="Send Message">
        <button @click="sendMessage">Send</button>
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

    components: {
      'order-coffee': OrderCoffee
    },

    methods: {

      orderCoffee() {
        this.$refs.OrderCoffee.toggleModal();
      },

      // Methods to register the websocket connection
      connectWebsocket() {
        this.socket = new SockJS("http://localhost:8080/websocket-endpoint");
        this.stompClient = Stomp.over(this.socket);
        this.stompClient.connect(
          {},
          frame => {
            this.connected = true;
            // Subscribe to the topics to receive messages from the server
            this.stompClient.subscribe("/global-message/chat", msg => {
              this.received_messages.push(msg.body);
            }),
              this.stompClient.subscribe("/global-message/user", msg => {
                this.received_notifications.push(msg.body);
              });
          },
          error => {
            console.log(error);
            this.connected = false;
          }
        );
      },


      disconnectWebsocket() {
        if (this.stompClient) {
          this.stompClient.disconnect();
        }
        this.connected = false;
      },

      sendMessage() {
        if (this.stompClient && this.stompClient.connected) {
          this.stompClient.send(
            "/app-receive/chat-message",
            this.send_message + "%" + localStorage.getItem("token"),
            {}
          );
        }
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
        // this.canvas.addCoffeeMachine("/static/coffeemachine.png", this.coffeeMachine.leftPos, this.coffeeMachine.topPos, this.coffeeMachine.rotation, OrderCoffee);
      }
    },

    mounted() {
      // this.connectWebsocket();
      this.user = JSON.parse(localStorage.getItem("user"));
      this.user = {department: "Verkoop", coffeeMachine: {leftPos: 100, rightPos: 100}};
      // if (this.user.department === "") {
      //   this.noDepartmentMsg =
      //     "You are not in a department yet, please contact an admin";
      // } else {
      //   this.getCanvasForUser();
      // }
      let chairsForCanvas = [];
      let coffeeMachine = {leftPos: 100, topPos: 100, rotation: 0};
      this.canvas = new Canvas("c", coffeeMachine, this);
      this.canvas.addStage();
      this.canvas.addChairs(chairsForCanvas);
      // this.canvas.addCoffeeMachine("/static/coffeemachine.png", coffeeMachine.leftPos, coffeeMachine.topPos, coffeeMachine.rotation, OrderCoffee);
    }
  };
</script>

<style scoped>
</style>
