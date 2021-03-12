import './message.css';

export const Message = ({ text, timestamp, duration, id }) => (
  <div className="App-message">
    <span className="App-message-text">{text}</span>
    <div className="App-message-time">
      <span>time: {timestamp}s</span>
      <span>duration: {duration}s</span>
    </div>
  </div>
);

export default Message;
