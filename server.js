'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');
const ROBOT = path.join(__dirname, 'robot.html');
const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .use((req, res) => res.sendFile(ROBOT) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

//setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

setInterval(() => io.emit('time', 500), 1000);
