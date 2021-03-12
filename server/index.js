const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// todo: may store messages in a database or in-memory cache?
const messages = [];

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('received:', message);
    const { type, data } = JSON.parse(message);
    if (typeof type !== 'string' || (typeof data !== 'object' && data != null)) {
      return;
    }
    switch (type) {
      case 'new-message': {
        // todo: some validation against the data
        messages.push(data);
        const payload = JSON.stringify({ type: 'receive-message', data });
        wss.clients.forEach(client => client.send(payload));
        break;
      }
      case 'get-history': {
        const payload = JSON.stringify({ type: 'receive-history', data: messages });
        wss.clients.forEach(client => client.send(payload));
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
