import { useMemo } from "react";
import { useMessageListState } from "../../hooks/use-message-list";
import { useVideoState } from "../../hooks/use-video";
import Message from './message';

export const MessageList = () => {
  const messages = useMessageListState();
  const { time } = useVideoState();

  const filteredMessages = useMemo(() => (
    messages
      .filter(({ timestamp, duration }) => (
        time > timestamp && time < (timestamp + duration)
      ))
  ), [messages, time]);

  return (
    <div>
      <h2>Messages</h2>
      <div>
        {
        filteredMessages
          .map((message) => <Message key={message.id} {...message} />)
        }
      </div>
    </div>
  )
};

export default MessageList;
