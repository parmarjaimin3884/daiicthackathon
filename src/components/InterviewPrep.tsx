import React, { useState } from 'react';
import { CheckCircle, Circle } from 'lucide-react';

export default function InterviewPrep() {
  const [activeTab, setActiveTab] = useState('technical');

  const tabs = [
    { id: 'technical', label: 'Technical' },
    { id: 'aptitude', label: 'Aptitude' },
    { id: 'mock', label: 'Mock Interview' },
  ];

  const questions = [
    {
      id: 1,
      question: 'Explain the concept of React hooks and their advantages.',
      difficulty: 'Medium',
      completed: true,
      tips: 'Focus on useState and useEffect examples',
    },
    {
      id: 2,
      question: 'What is the virtual DOM and how does it work?',
      difficulty: 'Hard',
      completed: false,
      tips: 'Compare with actual DOM manipulation',
    },
    {
      id: 3,
      question: 'Describe the React component lifecycle.',
      difficulty: 'Medium',
      completed: false,
      tips: 'Include mounting, updating, and unmounting phases',
    },
  ];

  return (
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
            onClick={() => setActiveTab(tab.id)}
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
        <div className="lg:col-span-2 space-y-4">
          {questions.map((q) => (
            <div key={q.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className={`text-sm font-medium px-2 py-1 rounded ${
                      q.difficulty === 'Hard' ? 'bg-red-100 text-red-800' :
                      q.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {q.difficulty}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">{q.question}</h3>
                  <p className="text-sm text-gray-600">💡 Tip: {q.tips}</p>
                </div>
                <button className="ml-4">
                  {q.completed ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <Circle className="h-6 w-6 text-gray-300" />
                  )}
                </button>
              </div>
            </div>
          ))}
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
  );
}