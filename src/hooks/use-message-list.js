import { createContext, useContext, useMemo, useState } from 'react';

// share state and actions separately
const MessageListStateContext = createContext();
const MessageListActionsContext = createContext();

/**
 * Provider for a message list state
 * @param {messages[]} initialValue An array of messages to start with
 */
export const MessageListProvider = ({ children, initialValue = [] }) => {
  const [messages, setMessages] = useState(initialValue);

  const actions = useMemo(() => ({
    addMessage: (message) => (
      setMessages([
        ...messages,
        message,
      ])
    ),
    setMessages,
  }), [messages, setMessages]);

  return (
    <MessageListStateContext.Provider value={messages}>
      <MessageListActionsContext.Provider value={actions}>
        {children}
      </MessageListActionsContext.Provider>
    </MessageListStateContext.Provider>
  );
};

export const useMessageListState = () => {
  return useContext(MessageListStateContext);
};

export const useMessageListActions = () => {
  return useContext(MessageListActionsContext);
};
