import { useCallback, useEffect, useState } from 'react';

const noop = () => null;

/**
 * Hook for managing the connection to websockets and sending messages
* @param {string} url the url that the websockets is trying to connect to
* @param {function} onMessage callback for when a message is received
* @param {function} onConnect callback for when the websockets has connected
* @param {function} onDisconnect callback for when the websockets has disconnected
* @param {function} onError callback for when an error has occurred
* @param {boolean} debug tells this hook to output debugging to console
 */
export const useWebMessage = ({
  // todo: make url an environment variable
  url = 'ws://localhost:3001',
  onMessage,
  onConnect = noop,
  onDisconnect = noop,
  onError = noop,
  debug = false,
}) => {
  // check for required properties
  if (typeof url !== 'string') {
    throw new Error('url is require, this is a url that the websockets is trying to connect to')
  }
  if (typeof onMessage !== 'function') {
    throw new Error('useWebMessage is required, this is a callback for when a message is received');
  }

  // create a store for the websockets instance
  const [ws, setWs] = useState(null);

  const log = useCallback((type, message = '') => {
    if (debug) {
      console.log(type, message);
    }
  }, [debug]);

  // an effect for creating the websockets instance
  // todo: maybe make this connect on demand, rather than on start
  useEffect(() => {
    log('connecting');
    const connection = new WebSocket(url)
    setWs(connection);

    return () => {
      connection.close();
    };
  }, [setWs]);

  /*
   * setup event listeners for the websocket instance, separate from creating because the
   * callback params could change at any time.
   */
  useEffect(() => {
    if (!ws) {
      return;
    }

    ws.onopen = () => {
      const message = { connected: true };
      log('connect', message);
      onConnect(message);
    }

    ws.onclose = () => {
      const message = { connected: false };
      log('disconnect', message);
      onDisconnect(message);
    }

    ws.onerror = (error) => {
      const connected = ws ? ws.readyState === WebSocket.OPEN : false;
      const message = { connected, error };
      log('error', message);
      onError(message);
    }

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      log('message', message);
      onMessage(message);
    };
  }, [log, ws, onConnect, onDisconnect, onError, onMessage]);

  /**
   * Method for the user to use to send messages to the server
   */
  const send = useCallback((message) => {
    if (!ws) {
      return false;
    }
    log('send', message);
    ws.send(JSON.stringify(message));
  }, [log, ws]);

  /**
   * Public methods exposed for the user to comsume
   */
  return {
    send,
  }
};
