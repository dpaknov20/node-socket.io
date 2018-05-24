'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )

  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
server.get('/robot', function (req, res) {
  res.send('Hello World!')
})
server.get('/mainfile', function (req, res) {
   res.sendFile(path.join(__dirname, 'index.html'));
})
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

//setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

setInterval(() => io.emit('time', 500), 1000);
