require("dotenv").config();
const debug = require("debug")("app:root");
const app = require("./server");
const startServer = require("./server/startServer");
const startWebsockets = require("./server/websockets/startWebsockets");

const port = process.env.PORT || 4000;

(async () => {
  try {
    const server = await startServer(port, app);
    startWebsockets(server);
  } catch (error) {
    debug(`Error: ${error.message}`);
  }
})();
