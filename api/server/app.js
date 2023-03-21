const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('../routes/routes');

require('../db/db.js');

const server = express();

const cors = require('cors');


server.name = 'API';
server.use(express.json())

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use('/uploads', express.static(__dirname + '/uploads'));
server.use(
    cors({
      credentials: true,
      origin: 'http://127.0.0.1:5173',
    })
  );

server.use('/', routes);

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;