import React, { useState, useEffect } from 'react';

const Question = () => {
  const [questionData, setQuestionData] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=1&category=17&difficulty=easy&type=boolean');
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setQuestionData(data.results[0]);
        } else {
          throw new Error('No trivia question found.');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchQuestion();
  }, []);

  if (error) {
    return <div className="error">⚠️ Error: {error}</div>;
  }

  if (!questionData) {
    return <div className="loading">Loading question...</div>;
  }

  return (
    <div className="question-box">
      <h2 dangerouslySetInnerHTML={{ __html: questionData.category }} />
      <p dangerouslySetInnerHTML={{ __html: questionData.question }} />

      {!showAnswer ? (
        <button className="reveal-button" onClick={() => setShowAnswer(true)}>
          Reveal Answer
        </button>
      ) : (
        <p className="answer">
          <strong>Answer:</strong> {questionData.correct_answer}
        </p>
      )}
    </div>
  );
};

export default Question;