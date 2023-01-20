import { useState } from 'react';
import './App.css';
import Game from './components/Game';

function App() {
  const [start, setStart] = useState(false);

  return (
    <div className="App">
      {
        start ? <Game /> :
          <button className='start__btn' onClick={() => setStart(start => !start)}>Start Game</button>
      }
    </div>
  );
}

export default App;
