const { WebSocketServer } = require("ws");
const WebSocket = require("ws");
const debug = require("debug")("app:websockets");
const { handleMessage, runMessages } = require("./messageHandler");

const startWebsockets = (server) => {
  const websocketServer = new WebSocket.Server({
    noServer: true,
    path: "/websockets",
  });

  server.on("upgrade", (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
      websocketServer.emit("connection", websocket, request);
    });
  });

  websocketServer.on("connection", (websocketConnection) => {
    debug("connection");
    runMessages(websocketConnection);
    websocketConnection.on("message", (message) => {
      const parsedMessage = JSON.parse(message);
      handleMessage(websocketConnection, parsedMessage);
    });
  });

  return WebSocketServer;
};

module.exports = startWebsockets;
