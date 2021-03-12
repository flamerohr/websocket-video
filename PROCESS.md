# Thought process during the exercise

An outline of what I expected to build. A webapp to provide an interactive platform for adding text and other media as reactions or markers to the video experience.

Could be for reacting to TikTok videos, or analysing sports videos, or coaching in performance.

Text could be added in real time to video, and backtraced by rewinding the video.

It's been a long time since using WebSockets with React, so let some ideas of how to architect this cook overnight.

For message structure, I decided to keep it similar to a redux action with "type" to define the action, and maybe "payload"? I'll think about the payload part a bit more.

## Some other ideas that come to mind for the future

- Synchronised watching, setup a proper RTC peer connection for a "driver" to control and watch the video which is streamed to everyone at the same time.

- Clicking on a text in a history list could take the video to the timestamp where the text starts to appear.

# Things I would do if there's more time

- Add linting
- Make the websocket hook connect on demand, and better error handling
- Change form to use a form library for easier control of data values
- Add environment variables for some of the values I've hardcoded
- Clean up the code, reduce file sizes
- Revisit the way state is handled, particularly how actions would cause a re-render when state updates

# Objectives

- Clone (not fork) this repo and run `npm install` then run `npm start` to start.
- Render the video found in the public folder on the page. Make it as pretty (or as ugly) as you like. Using a **native html5 video component** is preferred. You can also migrate the project to use typescript if you'd prefer (or create a separate react repository and import the video asset).
- Set up a basic websockets implementation with node (or other back-end) that the user connects to via the React app. You may also use WebRTC instead.
- Create some inputs on the video page that submits some text, a timestamp, and duration (or two timestamps) that sets the text to be shown at a given time during video playback
- Ensure that websocket (or WebRTC) changes are propagated across everyone connected to the app (so all users see the text updates)

## Bonus objectives:
- Create inputs that send positions for x/y coordinates/percentages for positioning the text that shows
- Provide some styling customisability for the text that shows (e.g. color, background, bold, italics, font, transitions)
- Allow for images to be submitted and viewed with the same time-based customisability as the text
- Make it pretty!

