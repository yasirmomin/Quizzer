import { useState } from "react";
import { resultInitalState } from "../../constants";
import AnswerTimer from "../AnswerTimer/AnswerTimer";
import Result from "../Result/Result";

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitalState);
  const [showResult, setShowResult] = useState(false);
  const [showAnswerTimer, setShowAnswerTimer] = useState(false);
  const [inputAnswer, setInputAnswer]=useState('');
  const { question, choices, correctAnswer, type } = questions[currentQuestion];

  const onAnwswerClick = (answer, index) => {
    setAnswerIdx(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };
   
  const onClickNext = (finalAnswer) => {
    setAnswerIdx(null);
    setShowAnswerTimer(true);
    setInputAnswer("");
    setResult((prev) =>
      finalAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }

    setTimeout(()=>{
      setShowAnswerTimer(false);
    });
  };

  const onTryAgain = () => {
    setResult(resultInitalState);
    setShowResult(false);
  };
  const handleTimeUp=()=>{
    setAnswer(false);
    onClickNext(false);
  };

  const handleInputChange=(evt)=>{
    setInputAnswer(evt.target.value);
    if(evt.target.value === correctAnswer)
      {
        setAnswer(true);
      }
      else
      {
        setAnswer(false);
      }
  }
  const getAnswerUI =()=>{
    if(type ==='FIB')
      {
        return <input value={inputAnswer}  onChange={handleInputChange}/>;
      }
    return(
    <ul>
      {choices.map((choice, index) => (
        <li
          onClick={() => onAnwswerClick(choice, index)}
          key={choice}
          className={answerIdx === index ? "selected-answer" : null}
        >
          {choice}
        </li>
      ))}
    </ul>
    );
  }

  return (
    <div className="quiz-container">
      {!showResult ? (
        
        <>
        {!showAnswerTimer && 
        (<AnswerTimer duration={15} onTimeUp={handleTimeUp}/>)}

          <span className="active-question-no">{currentQuestion + 1}</span>
          <span className="total-question">/{questions.length}</span>
          <h2>{question}</h2>
          {getAnswerUI()}
          <div className="footer">
            <button onClick={()=>onClickNext(answer)} 
            disabled={answerIdx === null && !inputAnswer}>
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <Result result={result} onTryAgain={onTryAgain} totalQuestions={questions.length} />
      ) }
    </div>
  );
};

export default Quiz;