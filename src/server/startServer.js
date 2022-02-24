const debug = require("debug")("app:server");

const startServer = (port, app) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(`Server listening on http://localhost:${port}`);
      resolve(server);
    });

    server.on("error", (error) => {
      const errorMessage = `Couldn't start the server.${
        error.code === "EADDRINUSE" ? ` Port ${port} in use` : ""
      }`;
      reject(new Error(errorMessage));
    });
  });

module.exports = startServer;
