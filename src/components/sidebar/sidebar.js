import { useCallback } from "react";
import { useWebMessage } from "../../hooks/use-web-message";
import { MessageForm } from "../message-form";
import { v4 as uuid } from 'uuid';

import './sidebar.css';
import { useMessageListActions } from "../../hooks/use-message-list";
/**
 * For handling messages and actions
 */
export const Sidebar = () => {
  const { addMessage } = useMessageListActions();

  const onMessage = useCallback((message) => {
    const { type, data } = message;
    switch (type) {
      case 'receive-message': {
        addMessage(data);
        break;
      }
    }
  }, [addMessage]);

  // todo: I think this will re-render a lot, to investigate
  const { send } = useWebMessage({ onMessage });

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
      {/* <MessageList /> */}
    </div>
  );
};

export default Sidebar;
