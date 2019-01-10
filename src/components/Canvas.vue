<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8">
        <canvas id="c"></canvas>
      </div>
      <div class="col-md-2">
        <div class="info"></div>
        <div class="chat">
          <header>
            <h2 class="title">
              <a>Coffee orders for department {{user.department}}</a>
            </h2>
          </header>
          <div class="body">
            <ul>
              <li v-for="order in orders">
                <b-img rounded="circle" :src="order.user.avatar" class="thumbnail"></b-img>
                <div class="content">
                  <h6>{{order.user.firstName}} {{order.user.lastName}} ordered</h6>
                  <h4>{{order.coffeeType}}</h4>
                  <h6 v-if="order.sugar">Sugar</h6>
                  <h6 v-if="order.milk">Milk</h6>

                  <span class="meta">{{order.orderDate}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <b-btn class="btn btn-info" @click="processOrder()">Ik ga koffie halen</b-btn>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import Canvas from "../canvas/Canvas";
import axios from "axios";
import OrderCoffee from "./OrderCoffee";
import WebsocketUtil from "../util/Websocket";
import config from "../config/config";
const baseUrl = config.url + "/api"
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

export default {
  name: "Canvas",

  data() {
    return {
      // Websocket
      received_messages: [],
      received_notifications: [],
      orders: [],
      test: [],
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
    "order-coffee": OrderCoffee
  },

  methods: {
    orderCoffee() {
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
          this.canvas = new Canvas(
            "c",
            this.chairsForCanvas,
            this.coffeeMachine,
            this
          );
          this.canvas.addStage();
        })
        .catch(error => {
          console.log(error);
        });
    },

    getPendingCoffeeRequests() {
      axios 
        .get(baseUrl + "/users/getRequests/" + this.user.department)
        .then(response => {
          this.orders = WebsocketUtil.getOrders();
          this.test = response.data; 
          for (let i = 0; i < this.test.length; i++) {
            this.orders.push(this.test[i]);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    generateEmailBody() {
      let html = [];
      const map = new Map();

      this.orders.forEach(order => {
        const key = order.coffeeType;
        const collection = map.get(key);
        if (!collection) {
          map.set(key, [order]);
        } else {
          collection.push(order);
        }
      });

      map.forEach(order => {
        html.push(
          "<h2>" + order[0].coffeeType + " " + order.length + " x" + "</h2>"
        );
        order.forEach(details => {
          html.push(
            "<h4>" + details.user.firstName + details.user.lastName + "</h4>"
          );
        });
      });

      return html.join("");
    },

    sendList() {
      var emailParams = {
        receiver: this.user.email,
        to_name: this.user.firstName + ' ' + this.user.lastName,
        name: "CoffeeApp",
        notes: "Please find your coffee order details below: ",
        // Generate email html body
        message_html: this.generateEmailBody()
      };
      emailjs.send(
        "gmail",
        "template_VglPhpDQ",
        emailParams,
        "user_lq764raJxEa8fLkjckZZR"
      );
    },

    processOrder() {
      let params = new URLSearchParams();
      let orders = [];
      this.orders.forEach(order => {
        orders.push(order.id);
      });
      params.append("userId", this.user.id);
      params.append("orders", orders);
      this.sendList();

      axios
        .post(baseUrl + "/users/coffeeRound", params)
        .then(response => {})
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    if (localStorage.getItem('reloaded')) {
        localStorage.removeItem('reloaded');
    } 
    else {
        localStorage.setItem('reloaded', '1');
        location.reload();
    }
    this.connectWebsocket();
    this.user = JSON.parse(localStorage.getItem("user"));
    // this.user = {department: "Verkoop", coffeeMachine: {leftPos: 100, rightPos: 100}};
    if (this.user.department === "") {
      this.noDepartmentMsg =
        "You are not in a department yet, please contact an admin";
    } else {
      this.getPendingCoffeeRequests();
      this.getCanvasForUser();
    }
  }
};
</script>

<style scoped>
body {
  background: #e9e9e9;
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.chat {
  background: #ffffff;
  width: 400px;
  margin: 0 auto;
}
.chat header {
  background: #2aa68b;
  padding: 10px 15px;
  color: #ffffff;
  font-size: 14px;
  cursor: move;
}
.chat header:before,
.chat header:after {
  display: block;
  content: "";
  clear: both;
}
.chat header h2,
.chat .body ul li .content h3 {
  margin: 0;
  padding: 0;
  font-size: 14px;
  float: left;
}
.chat header h2 a {
  color: #ffffff;
  text-decoration: none;
}

.chat .body {
  position: relative;
  max-height: 600px;
  overflow-y: scroll;
}

.chat .body ul {
  list-style: none;
  padding: 0;
  margin: 0;
  border-top: 1px solid #f2f2f2;
}
.chat .body ul li {
  position: relative;
  background: #ffffff;
  display: block;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.chat .body ul li:before,
.chat .body ul li:after {
  display: block;
  content: "";
  clear: both;
}
.chat .body ul li:hover .thumbnail {
  background: #bd6982;
}
.chat .body ul li:nth-child(2n) {
  background: #f2f2f2;
}
.chat .body ul li .thumbnail {
  display: inline-block;
  background: #bfbfbf;
  width: 50px;
  color: #ffffff;
  line-height: 50px;
  text-align: center;
  text-decoration: none;
  -webkit-transition: background 0.3s linear 0s;
  -moz-transition: background 0.3s linear 0s;
  -ms-transition: background 0.3s linear 0s;
  -o-transition: background 0.3s linear 0s;
  transition: background 0.3s linear 0s;
}
.chat .body ul li .thumbnail img {
  width: 100%;
}
.chat .body ul li .content {
  max-width: 200px;
  min-width: 200px;
  display: inline-block;
  margin-left: 50px;
  vertical-align: top;
  line-height: 1;
}

.chat .body ul li .content .preview {
  display: block;
  width: 100%;
  max-width: 200px;
  min-width: 200px;
  margin-bottom: 5px;
}
.chat .body ul li .content .meta {
  color: #b3b3b3;
  font-size: 12px;
}
.chat .body ul li .content .meta a {
  color: #999999;
  text-decoration: none;
}
.chat .body ul li .content .meta a:hover {
  text-decoration: underline;
}

.info {
  width: 300px;
  margin: 25px auto;
  text-align: center;
}
</style>
