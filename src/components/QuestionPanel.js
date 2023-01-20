import { useEffect, useState } from "react";
import { decode } from "html-entities";
import getRandomAnswer from "../utils/getRandomAnswer";
import "./QuestionPanel.css";

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
            <p className='question'>{decode(props.data.question)}</p>
            <div className='answer__box'>
                {
                    answers.map((d, i) =>
                        <button
                            className={`answer__btn ${getBtnClass(i)}`}
                            key={i}
                            onClick={() => handleClick(i)} disabled={select !== null}>{decode(d)}</button>
                    )
                }
            </div>
        </div>
    );
}

export default QuestionPanel;