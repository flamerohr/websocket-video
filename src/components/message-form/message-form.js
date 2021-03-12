import './message-form.css';

/**
 * A form component for handling message data
 * @param {functioin} onSubmit the callback for when the form is submitting values
 */
export const MessageForm = ({ onSubmit }) => {

  // todo: change to a controlled form with form library
  return (
    <form onSubmit={(e) => console.log(e)}>
      <label className="App-label">
        <span className="App-label-text">Message</span>
        <input name="text" />
      </label>
      <label className="App-label">
        <span className="App-label-text">Start time</span>
        <input name="timestamp" />
      </label>
      <label className="App-label">
        <span className="App-label-text">Duration</span>
        <input name="duration" />
      </label>
      <button type="submit">Save</button>
    </form>
  )
};

export default MessageForm;
