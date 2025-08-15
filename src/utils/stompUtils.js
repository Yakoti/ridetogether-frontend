import { Client } from "@stomp/stompjs";

let stompClient = null;

export function connectWebSocket(rideId, onMessageReceived, onConnectCallback, onErrorCallback) {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
  }

  // CORRECT: use ws:// for native websocket
  const socket = new WebSocket("ws://localhost:8080/chat");
  const client = new Client({
    webSocketFactory: () => socket,
    debug: str => console.log(str),
    onConnect: () => {
      client.subscribe(`/topic/ride/${rideId}`, message => {
        try {
          const msg = JSON.parse(message.body);
          onMessageReceived(msg);
        } catch (e) {
          console.error("Error parsing incoming message", e);
        }
      });
      stompClient = client;
      if (onConnectCallback) onConnectCallback();
    },
    onStompError: frame => {
      console.error("Broker error: " + frame.headers["message"]);
      if (onErrorCallback) onErrorCallback(frame);
    }
  });
  client.activate();
  
}

export function sendMessage(rideId, messageObj) {
  if (!stompClient || !stompClient.connected) {
    throw new Error("Not connected");
  }
  stompClient.publish({
    destination: `/app/chat/${rideId}`,
    body: JSON.stringify(messageObj),
  });
}

export function isConnected() {
  return stompClient && stompClient.connected;
}
export function disconnectWebSocket() {
  if (stompClient) {
    stompClient.deactivate(); // Gracefully close and cleanup connection
    stompClient = null;
  }
}