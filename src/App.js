import { useState, useEffect } from 'react';
import './App.css';
import Game from './components/Game';
import axios from 'axios';

function App() {
  const [start, setStart] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getQuestionData();
  }, []);

  const getQuestionData = async () => {
    await axios.get("https://opentdb.com/api.php?amount=10&type=multiple")
      .then(response => {
        console.log(response.data.results);
        setData(response.data.results);
        setError(false);
      })
      .catch(error => {
        setError(true);
      });
  };

  const handleStart = () => {
    setStart(start => !start);
  };

  const handlePlayAgain = () => {
    getQuestionData();
  };

  if (error){
    return (
      <div className='App'>
        <h1 className='error__header'>Whoops!</h1>
        <p className='error__text'>404-Page not found</p>
      </div>
    );
  }

  return (
    <div className="App">
      {
        start ? <Game onClick={handlePlayAgain} data={data}/> :
          <button className='start__btn' onClick={() => handleStart()}>Start Game</button>
      }
    </div>
  );
}

export default App;
