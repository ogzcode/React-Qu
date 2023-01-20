import { useState, useEffect } from "react";
import data from "../data.json";
import QuestionPanel from "./QuestionPanel";
import "./Game.css";

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

export default Game;