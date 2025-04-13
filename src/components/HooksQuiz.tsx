import React, { useState } from 'react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: string;
}

const questions: Question[] = [
  // Easy Questions
  {
    question: "What is the basic syntax of useState hook?",
    options: [
      "useState(initialValue)",
      "useEffect(callback)",
      "useCallback(function)",
      "useRef(value)"
    ],
    correctAnswer: 0,
    explanation: "The basic syntax of useState is useState(initialValue). It returns an array with two elements: the current state value and a function to update it. For example: const [count, setCount] = useState(0)",
    difficulty: "Easy"
  },
  {
    question: "What is a React Hook?",
    options: [
      "A class component feature",
      "A function that lets you use state and other React features",
      "A routing mechanism",
      "A data fetching tool"
    ],
    correctAnswer: 1,
    explanation: "React Hooks are functions that allow you to 'hook into' React state and lifecycle features from function components. They enable you to use state and other React features without writing a class component.",
    difficulty: "Easy"
  },
  // Medium Questions
  {
    question: "What is the difference between useState and useRef?",
    options: [
      "useState causes re-render, useRef doesn't",
      "useRef is for class components only",
      "useState is synchronous, useRef is asynchronous",
      "There is no difference"
    ],
    correctAnswer: 0,
    explanation: "The key difference is that useState causes a re-render when the state changes, while useRef doesn't trigger a re-render when its value changes. useRef is perfect for storing values that shouldn't trigger re-renders.",
    difficulty: "Medium"
  },
  {
    question: "What is the purpose of the useEffect cleanup function?",
    options: [
      "To clean memory leaks",
      "To improve performance",
      "To style components",
      "To handle routing"
    ],
    correctAnswer: 0,
    explanation: "The cleanup function in useEffect is used to clean up side effects (like subscriptions or timers) before the component unmounts or before the effect runs again. This prevents memory leaks and unwanted behavior.",
    difficulty: "Medium"
  },
  // Hard Questions
  {
    question: "How can you optimize useEffect with dependency array?",
    options: [
      "Remove the dependency array",
      "Add all dependencies used in the effect",
      "Always use an empty array",
      "Dependencies don't matter"
    ],
    correctAnswer: 1,
    explanation: "To optimize useEffect, you should add all variables and functions used inside the effect to the dependency array. This ensures the effect runs only when these dependencies change, preventing unnecessary re-renders.",
    difficulty: "Hard"
  },
  {
    question: "What happens if you call useState conditionally?",
    options: [
      "It works normally",
      "It throws an error about Hook rules",
      "It creates dynamic state",
      "It's recommended practice"
    ],
    correctAnswer: 1,
    explanation: "Calling useState conditionally violates the Rules of Hooks. Hooks must be called in the same order in every render. They cannot be called inside conditions, loops, or nested functions.",
    difficulty: "Hard"
  }
].sort((a, b) => {
  const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
  return difficultyOrder[a.difficulty as keyof typeof difficultyOrder] - 
         difficultyOrder[b.difficulty as keyof typeof difficultyOrder];
});

const HooksQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (selectedOption: number) => {
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);

    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
        <p className="text-lg mb-4">
          You scored {score} out of {questions.length}!
        </p>
        
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="mb-6 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
        >
          {showExplanation ? 'Hide Answers' : 'Show Answers'}
        </button>

        {showExplanation && (
          <div className="space-y-6 mb-6">
            {questions.map((q, index) => (
              <div key={index} className={`p-4 rounded-lg ${
                answers[index] === q.correctAnswer ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{q.question}</h3>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${
                    q.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    q.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {q.difficulty}
                  </span>
                </div>
                <div className="space-y-2 mb-2">
                  {q.options.map((option, optIndex) => (
                    <div key={optIndex} className={`p-2 rounded ${
                      optIndex === q.correctAnswer
                        ? 'bg-green-100 text-green-800'
                        : optIndex === answers[index]
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-50'
                    }`}>
                      {option}
                      {optIndex === q.correctAnswer && ' ✓'}
                      {optIndex === answers[index] && optIndex !== q.correctAnswer && ' ✗'}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Explanation:</strong> {q.explanation}
                </p>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => {
            setCurrentQuestion(0);
            setScore(0);
            setShowResults(false);
            setAnswers([]);
            setShowExplanation(false);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Take Quiz Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Question {currentQuestion + 1}</h2>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          questions[currentQuestion].difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
          questions[currentQuestion].difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {questions[currentQuestion].difficulty}
        </span>
      </div>
      <p className="text-lg mb-4">{questions[currentQuestion].question}</p>
      <div className="space-y-2">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className="w-full text-left p-3 border rounded hover:bg-gray-100"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HooksQuiz; 