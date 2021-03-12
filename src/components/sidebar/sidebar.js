import { useCallback } from "react";
import { useWebMessage } from "../../hooks/use-web-message";

import './sidebar.css';
/**
 * For handling messages and actions
 */
export const Sidebar = () => {
  const { send } = useWebMessage({
    onMessage: (message) => console.log(message),
  });

  const sendNewMessage = useCallback(
    (message) => send({ type: 'new-message', message }),
    [send],
  );

  return (
    <div className="App-sidebar">

    </div>
  );
};

export default Sidebar;
