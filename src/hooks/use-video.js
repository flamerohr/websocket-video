import { createContext, useContext, useMemo, useState } from 'react';

// share state and actions separately
const VideoStateContext = createContext();
const VideoActionsContext = createContext();

/**
 * Provider for video state
 */
export const VideoProvider = ({ children }) => {
  const [state, setState] = useState({ time: 0 });

  const actions = useMemo(() => ({
    setTime: (time) => (
      setState({
        ...state,
        time,
      })
    ),
  }), [state, setState]);

  return (
    <VideoStateContext.Provider value={state}>
      <VideoActionsContext.Provider value={actions}>
        {children}
      </VideoActionsContext.Provider>
    </VideoStateContext.Provider>
  );
};

export const useVideoState = () => {
  return useContext(VideoStateContext);
};

export const useVideoActions = () => {
  return useContext(VideoActionsContext);
};
