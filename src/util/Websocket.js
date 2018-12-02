import SockJS from "sockjs-client";
import Stomp from "webstomp-client";


let messages = [];
let notifications = [];

export default new class WebsocketUtil {

  getMessages() {
    return messages;
  };

  getNotifications() {
    return notifications;
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
    console.log(message);
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send(
        "/app-receive/chat-message",
        message + "%" + localStorage.getItem("token"),
        {}
      );
    }
  };

}
