import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import config from "../config/config";
const baseUrl = config.url;

export default new class WebsocketUtil {
  messages = [];
  notifications = [];
  orders = [];

  getMessages() {
    return messages;
  };

  getNotifications() {
    return notifications;
  };

  getOrders() {
    return this.orders;
  };

  // Methods to register the websocket connection
  connectWebsocket() {
    this.socket = new SockJS(baseUrl + "/websocket-endpoint");
    let user = JSON.parse(localStorage.getItem('user'));
    this.stompClient = Stomp.over(this.socket);
    this.stompClient.connect(
      {},
      connectEvent => {
        this.connected = true;
        // Subscribe to the topics to receive messages from the server
        this.stompClient.subscribe("/global-message/coffeeRound/" + user.department, msg => {
          alert(msg.body + ' gaat koffie halen');
          this.orders.splice(0);
        }),
          this.stompClient.subscribe("/global-message/user", msg => {
            notifications.push(msg.body);
          });
          this.stompClient.subscribe("/global-message/newOrder/" + user.department, msg => {
            console.log('add new order to list ');
              this.orders.push(JSON.parse(msg.body));
          });
      },
      error => {
        console.log(error);
        this.connected = false;
      }
    );
  };

  disconnectWebsocket() {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
    this.connected = false;
  };

  sendMessage(message) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send(
        "/app-receive/chat-message",
        message + "%" + localStorage.getItem("token"),
        {}
      );
    }
  };

  sendNewCoffeeOrder() {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send(
        "/app-receive/coffee-order",
        'testt' + "%" + localStorage.getItem("token"),
        {}
      );
    }
  };

}
