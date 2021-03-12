const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('received:', message);
    ws.send(JSON.stringify({ message: `echo: ${JSON.stringify(message)}` }));
  });

  ws.send(JSON.stringify({ message: 'Hi, you\'re connected to me!' }));
});

server.listen(process.env.PORT || 3001, () => {
  console.log(`Server started on port ${server.address().port}`);
});
