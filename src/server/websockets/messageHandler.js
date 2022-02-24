const debug = require("debug")("app:websockets:handler");

const handleMessage = (websocketConnection, message) => {
  debug(message);
  websocketConnection.send(JSON.stringify({ message: "Message recieved" }));
};

const runMessages = (websocketConnection) => {
  setInterval(() => {
    websocketConnection.send(JSON.stringify({ message: "yes boi" }));
  }, 2000);
};

module.exports = { handleMessage, runMessages };
