import './App.css';
import Sidebar from './components/sidebar';
import Video from './components/video/video';
import { MessageListProvider } from './hooks/use-message-list';
import { VideoProvider } from './hooks/use-video';

function App() {
  return (
    <MessageListProvider>
      <VideoProvider>
        <div className="App">
          <header className="App-header">
            React to video in React.
          </header>
          <div className="App-container">
            <Video />
            <Sidebar />
          </div>
        </div>
      </VideoProvider>
    </MessageListProvider>
  );
}

export default App;
