require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const socketIo = require('socket.io');
const app = express();
const socketRouter = require('./modules/socketRouter');

const router = require('./routers/MainRouter');

const http = require('http').createServer(app);

mongoose.connect(process.env.MONGO_KEY);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const io = socketIo(http, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

app.set('socketIo', io);

http.listen(process.env.PORT, () => {
  console.log('http listening on port ' + process.env.PORT);
});

app.use('/', router);

socketRouter(io);

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});
