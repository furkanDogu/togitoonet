const http = require('http');
const app = require('./app');

// if any port is given by host use it else use 3001.
const port = process.env.PORT || 3001;

// creating a http server with attached express app.
const server = http.createServer(app);

// start listening for requests on the port
server.listen(port);