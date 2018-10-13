<template>
<div id="home">
  <b-img src="https://benishop.co/imgcdn/1024/http/www.conceptdraw.com/solution-park/resource/images/solutions/office-layout-plans/Building-Plans-Office-Layout-Plan-Office-plan.png_.jpg"/>

<!--Test if the websocket is working-->
<!-- <input v-model="send_message" placeholder="Send Message">
      <button @click="send">Send</button>
   <h2>Messages Received</h2>
    <p v-for="message in received_messages">{{message}}</p> 
       <h2>Notifications Received</h2>
    <p v-for="notification in received_notifications">{{notification}}</p>  -->
</div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

const baseUrl = "http://localhost:8080/api";

export default {
  name: "Home",
  data() {
    return {
      received_messages: [],
      received_notifications: [],
      send_message: null,
      connected: false
    };
  },

  methods: {
    send() {
      if (this.stompClient && this.stompClient.connected) {
        this.stompClient.send(
          "/app-receive/chat-message",
          this.send_message + '%' + localStorage.getItem("token"),
          {}
        );
      }
    },

    connect() {
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

    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
      this.connected = false;
    },
  },
  mounted() {
    this.connect();
  }
};
</script>

<style>
</style>