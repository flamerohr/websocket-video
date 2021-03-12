import { useCallback, useRef } from "react";
import { v4 as uuid } from 'uuid';
import { useWebMessage } from "../../hooks/use-web-message";
import { MessageForm } from "../message-form";
import { useMessageListActions } from "../../hooks/use-message-list";
import MessageList from "../message-list";

import './sidebar.css';
/**
 * For handling messages and actions
 */
export const Sidebar = () => {
  const { addMessage, setMessages } = useMessageListActions();
  const sendRef = useRef();

  const onMessage = useCallback((message) => {
    const { type, data } = message;
    switch (type) {
      case 'connected': {
        if (message.connected) {
          // needed to use sendRef because of "send" being updated on state update
          sendRef.current({ type: 'get-history' })
        }
        break;
      }
      case 'receive-message': {
        addMessage(data);
        break;
      }
      case 'receive-history': {
        setMessages(data);
        break;
      }
      default:
        // nothing
    }
  }, [addMessage, setMessages]);

  // todo: I think this will re-render a lot, to investigate
  const { send } = useWebMessage({ onMessage });

  sendRef.current = send;
  const sendNewMessage = useCallback(
    (message) => send({
      type: 'new-message',
      data: {
        ...message,
        // note: id probably not necessary, but helps me keep sane
        id: uuid(),
      },
    }),
    [send],
  );

  return (
    <div className="App-sidebar">
      <MessageForm onSubmit={sendNewMessage} />
      <MessageList />
    </div>
  );
};

export default Sidebar;
