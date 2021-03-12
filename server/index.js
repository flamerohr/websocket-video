const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('received:', message);
    const { type, data } = JSON.parse(message);
    if (typeof type !== 'string' || typeof data !== 'object') {
      return;
    }
    switch (type) {
      case 'new-message': {
        // todo: some validation against the data
        const newMessage = JSON.stringify({ type: 'receive-message', data });
        wss.clients.forEach(client => client.send(newMessage));
        break;
      }
    }
  });

  // probably redundant to have this
  ws.send(JSON.stringify({ type: 'connected', connected: true }));
});

server.listen(process.env.PORT || 3001, () => {
  console.log(`Server started on port ${server.address().port}`);
});
