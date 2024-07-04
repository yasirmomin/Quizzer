// WelcomePage.js

import React from 'react';

const WelcomePage = ({ onStartQuiz }) => {
  return (
    <div className="welcome-page">
      <h1>Welcome to the Quiz App!</h1>
      <p>Click the button below to start the quiz.</p>
      <p>(Note: On clicking the start button, the timer will start. Each question has 15 seconds to answer)</p>
      <button onClick={onStartQuiz}>Start Quiz</button>
    </div>
  );
};

export default WelcomePage;
