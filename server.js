const http = require('http');
const es6Renderer = require('express-es6-template-engine');
const express = require('express');
const hostname = '127.0.0.1';
// const db = require('./db');
const port = 3000;
const app = express();
const server = http.createServer(app);

app.engine('html', es6Renderer);

app.set('views', 'templates');
app.set('view engine', 'html');

app.use(express.static((__dirname + "/assets")));
app.use(express.static('templates'));

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});



