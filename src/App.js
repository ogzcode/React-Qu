import { useEffect, useState } from 'react';
import './App.css';
import data from "./data.json";


function getRandomAnswer(answerList) {
  const shuffleList = [];

  while (shuffleList.length < 4) {
    let index = Math.floor(Math.random() * answerList.length);
    shuffleList.push(answerList[index]);
    answerList.splice(index, 1);
  }

  return shuffleList;
}

function Game() {
  const [dataList, setDataList] = useState(data.results);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [next, setNext] = useState(false);
  const [total, setTotal] = useState(0);

  const handleIsNext = (select, correct) => {
    if (select !== null) {
      setNext(true);

      if (correct) {
        setTotal(total => total + 1);
      }
    }
  };

  const handleNext = () => {
    if (next) {
      setQuestionIndex(questionIndex => questionIndex + 1);
      setNext(false);
    }
  };

  const handleAgain = () => {
    setQuestionIndex(0);
    setNext(false);
    setTotal(0);
  };

  return (
    <div className='game__container'>
      {
        questionIndex === 10 ? 
        (
          <div className='end__box'>
            <p className='total'>{total} correct answer</p>
            <button className='again__btn' onClick={() => handleAgain()}>Play Again</button>
          </div>
        )
        :
          (
            <>
              <div className='game__header'>
                <span>{questionIndex + 1} of 10 question</span>
                <span>Timer: 0.0</span>
              </div>
              <QuestionPanel data={dataList[questionIndex]} onClick={handleIsNext} />
              <div className='next__box'>
                <button className='next__btn' onClick={() => handleNext()}>Next</button>
              </div>
            </>
          )
      }
    </div>
  );
}

function QuestionPanel(props) {
  const [question, setQuestion] = useState(props.data.question);
  const [answers, setAnswers] = useState(
    getRandomAnswer([props.data.correct_answer, ...props.data.incorrect_answers])
  );
  const [select, setSelect] = useState(null);
  const [correct, setCorrect] = useState(false);
  useEffect(() => {
    if (question !== props.data.question) {
      setAnswers(getRandomAnswer([props.data.correct_answer, ...props.data.incorrect_answers]));
      setQuestion(props.data.question);
      setSelect(null);
      setCorrect(false);
    }
  });

  const handleClick = (i) => {
    setSelect(i);
    if (answers[i] === props.data.correct_answer) {
      setCorrect(true);
      props.onClick(i, true);
    }
    else {
      setCorrect(false);
      props.onClick(i, false);
    }
  };

  const getBtnClass = (i) => {
    if (select === null) {
      return "";
    }

    if (select === i && correct) {
      return "correct";
    }

    if (select === i && !correct) {
      return "incorrect"
    }
  };

  return (
    <div className='question__box'>
      <div className='question__header'>
        <span className='category'>{props.data.category}</span>
        <span className='diffuculty'>{props.data.difficulty}</span>
      </div>
      <p className='question'>{props.data.question}</p>
      <div className='answer__box'>
        {
          answers.map((d, i) =>
            <button
              className={`answer__btn ${getBtnClass(i)}`}
              key={i}
              onClick={() => handleClick(i)} disabled={select !== null}>{d}</button>
          )
        }
      </div>
    </div>
  );
}

/* 
In the film &quot;Interstellar&quot;, how long did they spend on Miller&#039;s planet?
*/

function App() {
  const [start, setStart] = useState(false);
  textTransformer("In the film &quot;Interstellar&quot;, how long did they spend on Miller&#039;s planet?");
  return (
    <div className="App">
      {
        start ? <Game /> : <button className='start__btn' onClick={() => setStart(start => !start)}>Start Game</button>
      }
    </div>
  );
}

export default App;
