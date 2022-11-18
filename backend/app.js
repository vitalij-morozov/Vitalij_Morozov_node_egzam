require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const socketIo = require('socket.io');
const app = express();
const socketRouter = require('./modules/socketRouter');

const http = require('http').createServer(app);

const io = socketIo(http, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

app.set('socketIo', io);

http.listen(process.env.PORT);

socketRouter(io);

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});
