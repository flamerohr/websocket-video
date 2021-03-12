import { useEffect, useRef } from 'react';
import { useVideoActions } from '../../hooks/use-video';
import './video.css';

/**
 * For handling video related events and functions
 */
export const Video = () => {
  const videoRef = useRef();
  const { setTime } = useVideoActions();

  useEffect(() => {
    const video = videoRef.current;
    const callback = () => setTime(video.currentTime);
    video.addEventListener('timeupdate', callback);

    return () => {
      video.removeEventListener('timeupdate', callback);
    }
  }, [setTime]);

  return (
    <video className="App-video" ref={videoRef} controls src="/Big_Buck_Bunny_1080_10s_5MB.mp4" />
  );
};

export default Video;
