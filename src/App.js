import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        React to video in React.
      </header>
      <div className="App-container">
        <video className="App-video" controls src="/Big_Buck_Bunny_1080_10s_5MB.mp4" />
        <div className="App-sidebar">

        </div>
      </div>
    </div>
  );
}

export default App;
