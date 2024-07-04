import Quiz from './Components/Quiz/Quiz.js';
import './Components/Quiz/Quiz.css';
import { useEffect,useState } from 'react';
import WelcomePage from './Components/WelcomePage/welcome.js';
import "./Components/WelcomePage/welcome.css"

function App() {

  const [questions,setQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  useEffect (()=>{
    getQuestions();
  },[]);

  const getQuestions= async()=>{
    try {
      const response =await fetch("https://644982a3e7eb3378ca4ba471.mockapi.io/questions");
      const questionsResponse = await response.json();
      setQuestions(questionsResponse);
      console.log(questionsResponse);
    } catch (error) {
        console.log(error)
    }
  };
  
  const startQuiz = () => {
    setQuizStarted(true);
  };


  return (
    <div className="app-container">
      {!quizStarted && <WelcomePage onStartQuiz={startQuiz} />}
      {quizStarted && questions.length > 0 && <Quiz questions={questions} />}
    </div>
  );

       
    
  
}

export default App;
