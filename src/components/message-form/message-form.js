import { useCallback } from 'react';
import './message-form.css';

// todo: change to a controlled form with form library
/**
 * A form component for handling message data
 * @param {functioin} onSubmit the callback for when the form is submitting values
 */
export const MessageForm = ({ onSubmit }) => {
  const submitData = useCallback((e) => {
    e.preventDefault();

    const elements = e.target.elements;
    let data = {};

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      if (!element.name) {
        continue;
      }
      data = {
        ...data,
        [element.name]: element.value,
      };
    }

    onSubmit(data);
  }, [onSubmit]);

  return (
    <form onSubmit={submitData}>
      <h1>New Message</h1>
      <label className="App-label">
        <span className="App-label-text">Text</span>
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
