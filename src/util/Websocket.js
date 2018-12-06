import SockJS from "sockjs-client";
import Stomp from "webstomp-client";


let messages = [];
let notifications = [];
let orders = [];

export default new class WebsocketUtil {

  getMessages() {
    return messages;
  };

  getNotifications() {
    return notifications;
  };

  getOrders() {
    return orders;
  };

  // Methods to register the websocket connection
  connectWebsocket() {
    this.socket = new SockJS("http://localhost:8080/websocket-endpoint");
    this.stompClient = Stomp.over(this.socket);
    this.stompClient.connect(
      {},
      connectEvent => {
        this.connected = true;
        // Subscribe to the topics to receive messages from the server
        this.stompClient.subscribe("/global-message/chat", msg => {
          messages.push(msg.body);
        }),
          this.stompClient.subscribe("/global-message/user", msg => {
            notifications.push(msg.body);
          });
          this.stompClient.subscribe("/global-message/newOrder", msg => {
            orders.push(msg.body);
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
