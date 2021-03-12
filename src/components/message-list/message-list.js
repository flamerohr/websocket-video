import { useMessageListState } from "../../hooks/use-message-list";
import Message from './message';

export const MessageList = () => {
  const messages = useMessageListState();

  return (
    <div>
      <h2>Messages</h2>
      <div>
        {messages.map((message) => <Message key={message.id} {...message} />)}
      </div>
    </div>
  )
};

export default MessageList;
