import React, { useState } from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import HooksQuiz from './HooksQuiz';

interface Question {
  id: number;
  question: string;
  difficulty: string;
  completed: boolean;
  tips: string;
  hasQuiz: boolean;
}

export default function InterviewPrep() {
  const [activeTab, setActiveTab] = useState('technical');
  const [showHooksQuiz, setShowHooksQuiz] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [showDifficultySelection, setShowDifficultySelection] = useState(true);

  const tabs = [
    { id: 'technical', label: 'Technical' },
    { id: 'aptitude', label: 'Aptitude' },
    { id: 'mock', label: 'Mock Interview' },
  ];

  const difficulties = [
    {
      level: 'Easy',
      description: 'Basic concepts and fundamentals',
      color: 'bg-green-100 text-green-800 border-green-200',
      hoverColor: 'hover:bg-green-50'
    },
    {
      level: 'Medium',
      description: 'Intermediate concepts and practical applications',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      hoverColor: 'hover:bg-yellow-50'
    },
    {
      level: 'Hard',
      description: 'Advanced concepts and complex scenarios',
      color: 'bg-red-100 text-red-800 border-red-200',
      hoverColor: 'hover:bg-red-50'
    }
  ];

  const questions = {
    technical: {
      easy: [
        {
          id: 1,
          question: 'What are React Hooks?',
          difficulty: 'Easy',
          completed: false,
          tips: 'Focus on basic definition and common hooks like useState',
          hasQuiz: false
        },
        {
          id: 2,
          question: 'What is JSX in React?',
          difficulty: 'Easy',
          completed: false,
          tips: 'Think about HTML-like syntax in JavaScript',
          hasQuiz: false
        }
      ],
      medium: [
        {
          id: 3,
          question: 'Explain the concept of React hooks and their advantages.',
          difficulty: 'Medium',
          completed: true,
          tips: 'Focus on useState and useEffect examples',
          hasQuiz: false
        },
        {
          id: 4,
          question: 'Describe the React component lifecycle.',
          difficulty: 'Medium',
          completed: false,
          tips: 'Include mounting, updating, and unmounting phases',
          hasQuiz: false
        }
      ],
      hard: [
        {
          id: 5,
          question: 'What is the virtual DOM and how does it work?',
          difficulty: 'Hard',
          completed: false,
          tips: 'Compare with actual DOM manipulation',
          hasQuiz: false
        },
        {
          id: 6,
          question: 'Explain React Fiber architecture.',
          difficulty: 'Hard',
          completed: false,
          tips: 'Focus on reconciliation and rendering improvements',
          hasQuiz: false
        }
      ]
    },
    aptitude: {
      easy: [
        {
          id: 7,
          question: 'Explain the concept of React hooks and their advantages.',
          difficulty: 'Easy',
          completed: false,
          tips: 'Focus on basic concepts and simple use cases',
          hasQuiz: true
        }
      ],
      medium: [
        {
          id: 8,
          question: 'What is the virtual DOM and how does it work?',
          difficulty: 'Medium',
          completed: false,
          tips: 'Think about performance implications',
          hasQuiz: true
        }
      ],
      hard: [
        {
          id: 9,
          question: 'Describe the React component lifecycle.',
          difficulty: 'Hard',
          completed: false,
          tips: 'Consider complex scenarios and edge cases',
          hasQuiz: true
        }
      ]
    },
    mock: []
  };

  const handleQuestionClick = (question: string, difficulty: string) => {
    setSelectedQuestion(question);
    setSelectedDifficulty(difficulty);
    setShowHooksQuiz(true);
  };

  const handleDifficultySelect = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    setShowDifficultySelection(false);
  };

  const handleBackToDifficulty = () => {
    setShowDifficultySelection(true);
    setSelectedDifficulty('');
  };

  const renderDifficultySelection = () => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Select Difficulty Level</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {difficulties.map((diff) => (
            <div
              key={diff.level}
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${diff.color} ${diff.hoverColor}`}
              onClick={() => handleDifficultySelect(diff.level)}
            >
              <h3 className="text-xl font-bold mb-2">{diff.level}</h3>
              <p className="text-sm">{diff.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderQuestionsSection = (section: 'technical' | 'aptitude') => {
    const difficultyStyles = {
      Easy: 'bg-green-100 text-green-800 border-green-200',
      Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Hard: 'bg-red-100 text-red-800 border-red-200'
    };

    const selectedQuestions: Question[] = section === 'technical' ? 
      questions[section][selectedDifficulty.toLowerCase() as keyof typeof questions[typeof section]] :
      questions.aptitude[selectedDifficulty.toLowerCase() as keyof typeof questions.aptitude];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-xl font-bold">{selectedDifficulty} Questions</h3>
            <span className={`px-3 py-1 rounded-full text-sm ${difficultyStyles[selectedDifficulty as keyof typeof difficultyStyles]}`}>
              {selectedDifficulty}
            </span>
          </div>
          <button
            onClick={handleBackToDifficulty}
            className="text-gray-600 hover:text-gray-800 flex items-center space-x-2"
          >
            <span>Change Difficulty</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {selectedQuestions.map((q) => (
            <div 
              key={q.id}
              className={`bg-white p-6 rounded-lg shadow ${
                section === 'aptitude' ? 'cursor-pointer hover:shadow-md transition-shadow' : ''
              }`}
              onClick={() => section === 'aptitude' && handleQuestionClick(q.question, selectedDifficulty)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium mb-2">{q.question}</h4>
                  <p className="text-sm text-gray-600">💡 Tip: {q.tips}</p>
                </div>
                {section === 'technical' && (
                  <button className="ml-4">
                    {q.completed ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-300" />
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Interview Preparation</h1>

      {showHooksQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">{selectedQuestion}</h2>
                <span className={`inline-block mt-2 px-2 py-1 rounded text-sm font-medium ${
                  selectedDifficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  selectedDifficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {selectedDifficulty}
                </span>
              </div>
              <button 
                onClick={() => setShowHooksQuiz(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <HooksQuiz />
            </div>
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Interview Preparation</h1>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Start Mock Interview
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setShowDifficultySelection(true);
                setSelectedDifficulty('');
              }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                activeTab === tab.id
                  ? 'bg-white text-indigo-600 shadow'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Questions List */}
          <div className="lg:col-span-2">
            {activeTab === 'mock' ? (
              <div>Mock Interview Content</div>
            ) : showDifficultySelection ? (
              renderDifficultySelection()
            ) : (
              renderQuestionsSection(activeTab as 'technical' | 'aptitude')
            )}
          </div>

          {/* Progress Sidebar */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Questions Attempted</span>
                  <span>15/30</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Correct Answers</span>
                  <span>12/15</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-medium text-gray-800 mb-2">Daily Challenge</h4>
                <div className="bg-indigo-50 p-4 rounded-md">
                  <p className="text-sm text-indigo-800">Complete 5 more questions to earn 100 XP!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}