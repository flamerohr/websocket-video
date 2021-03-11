import './App.css';
import Sidebar from './components/sidebar';
import Video from './components/video/video';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        React to video in React.
      </header>
      <div className="App-container">
        <Video />
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
