/* eslint no-console:0 */

const http = require("http");

const createApp = require("./app");

const PORT = process.env.PORT || 7000;

createApp()
  .then(app => http.createServer(app.callback()).listen(PORT))
  .then(() => console.log(`App listening at port: ${PORT}`))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
