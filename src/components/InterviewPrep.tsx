import React, { useState } from 'react';
import { CheckCircle, Circle, PlayCircle, BookOpen } from 'lucide-react';
import HooksQuiz from './HooksQuiz';

interface Question {
  id: number;
  question: string;
  difficulty: string;
  completed: boolean;
  tips: string;
  hasQuiz: boolean;
}

interface Subject {
  id: string;
  name: string;
  description: string;
  videos: Video[];
  resources: Resource[];
}

interface Video {
  id: string;
  title: string;
  url: string;
  duration: string;
  channel: string;
}

interface Resource {
  id: string;
  title: string;
  url: string;
  type: 'article' | 'documentation' | 'book';
}

export default function InterviewPrep() {
  const [activeTab, setActiveTab] = useState('technical');
  const [showHooksQuiz, setShowHooksQuiz] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [showDifficultySelection, setShowDifficultySelection] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

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

  const subjects: Subject[] = [
    {
      id: 'react',
      name: 'React.js',
      description: 'A JavaScript library for building user interfaces, particularly single-page applications. Master React to build modern, interactive web applications.',
      videos: [
        {
          id: '1',
          title: 'React Hooks Explained',
          url: 'https://www.youtube.com/watch?v=TNhaISOUy6Q',
          duration: '15:20',
          channel: 'Web Dev Simplified'
        },
        {
          id: '2',
          title: 'React Context API Tutorial',
          url: 'https://www.youtube.com/watch?v=5LrDIWkK_Bc',
          duration: '12:45',
          channel: 'Codevolution'
        },
        {
          id: '3',
          title: 'React Performance Optimization',
          url: 'https://www.youtube.com/watch?v=0ZJgIjI0YDE',
          duration: '20:10',
          channel: 'Fireship'
        },
        {
          id: '4',
          title: 'React Router v6 Tutorial',
          url: 'https://www.youtube.com/watch?v=Ul3y1LXxzdU',
          duration: '45:30',
          channel: 'Web Dev Simplified'
        },
        {
          id: '5',
          title: 'React Testing with Jest',
          url: 'https://www.youtube.com/watch?v=7d4ZWud8Qq0',
          duration: '30:15',
          channel: 'Academind'
        }
      ],
      resources: [
        {
          id: '1',
          title: 'React Documentation',
          url: 'https://reactjs.org/docs/getting-started.html',
          type: 'documentation'
        },
        {
          id: '2',
          title: 'React Patterns',
          url: 'https://reactpatterns.com/',
          type: 'article'
        },
        {
          id: '3',
          title: 'Learning React',
          url: 'https://www.oreilly.com/library/view/learning-react-2nd/9781492051718/',
          type: 'book'
        },
        {
          id: '4',
          title: 'React Interview Questions',
          url: 'https://github.com/sudheerj/reactjs-interview-questions',
          type: 'article'
        },
        {
          id: '5',
          title: 'React TypeScript Cheatsheet',
          url: 'https://react-typescript-cheatsheet.netlify.app/',
          type: 'documentation'
        }
      ]
    },
    {
      id: 'node',
      name: 'Node.js',
      description: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine for building server-side applications. Learn to build scalable backend services.',
      videos: [
        {
          id: '1',
          title: 'Node.js Crash Course',
          url: 'https://www.youtube.com/watch?v=fBNz5xF-Kx4',
          duration: '1:45:00',
          channel: 'Traversy Media'
        },
        {
          id: '2',
          title: 'Express.js Tutorial',
          url: 'https://www.youtube.com/watch?v=L72fhGm1tfE',
          duration: '45:30',
          channel: 'Web Dev Simplified'
        },
        {
          id: '3',
          title: 'Node.js Authentication',
          url: 'https://www.youtube.com/watch?v=Ud5xKCYQTjM',
          duration: '1:20:00',
          channel: 'Web Dev Simplified'
        },
        {
          id: '4',
          title: 'Node.js File System',
          url: 'https://www.youtube.com/watch?v=U57kU311-nE',
          duration: '25:45',
          channel: 'Programming with Mosh'
        },
        {
          id: '5',
          title: 'Node.js Streams',
          url: 'https://www.youtube.com/watch?v=GlybFFMXXmQ',
          duration: '35:20',
          channel: 'Fireship'
        }
      ],
      resources: [
        {
          id: '1',
          title: 'Node.js Documentation',
          url: 'https://nodejs.org/en/docs/',
          type: 'documentation'
        },
        {
          id: '2',
          title: 'Node.js Design Patterns',
          url: 'https://www.nodejsdesignpatterns.com/',
          type: 'book'
        },
        {
          id: '3',
          title: 'Node.js Best Practices',
          url: 'https://github.com/goldbergyoni/nodebestpractices',
          type: 'article'
        },
        {
          id: '4',
          title: 'Node.js Security Checklist',
          url: 'https://github.com/snyk/nodejs-security-checklist',
          type: 'article'
        },
        {
          id: '5',
          title: 'Node.js Interview Questions',
          url: 'https://github.com/learning-zone/nodejs-interview-questions',
          type: 'article'
        }
      ]
    },
    {
      id: 'dsa',
      name: 'Data Structures & Algorithms',
      description: 'Fundamental concepts for efficient problem-solving and software development. Master DSA to excel in technical interviews.',
      videos: [
        {
          id: '1',
          title: 'Big O Notation',
          url: 'https://www.youtube.com/watch?v=kS_gr2_-ws8',
          duration: '36:22',
          channel: 'HackerRank'
        },
        {
          id: '2',
          title: 'Data Structures Crash Course',
          url: 'https://www.youtube.com/watch?v=RBSGKlAvoiM',
          duration: '1:30:00',
          channel: 'freeCodeCamp'
        },
        {
          id: '3',
          title: 'Dynamic Programming',
          url: 'https://www.youtube.com/watch?v=oBt53YbR9Kk',
          duration: '5:45:00',
          channel: 'freeCodeCamp'
        },
        {
          id: '4',
          title: 'Graph Algorithms',
          url: 'https://www.youtube.com/watch?v=tWVWeAqZ0WU',
          duration: '1:15:00',
          channel: 'freeCodeCamp'
        },
        {
          id: '5',
          title: 'Sorting Algorithms',
          url: 'https://www.youtube.com/watch?v=RfXt_qHDEPw',
          duration: '45:30',
          channel: 'CS Dojo'
        }
      ],
      resources: [
        {
          id: '1',
          title: 'GeeksforGeeks DSA',
          url: 'https://www.geeksforgeeks.org/data-structures/',
          type: 'article'
        },
        {
          id: '2',
          title: 'Introduction to Algorithms',
          url: 'https://mitpress.mit.edu/books/introduction-algorithms-third-edition',
          type: 'book'
        },
        {
          id: '3',
          title: 'LeetCode Patterns',
          url: 'https://seanprashad.com/leetcode-patterns/',
          type: 'article'
        },
        {
          id: '4',
          title: 'DSA Interview Questions',
          url: 'https://github.com/kdn251/interviews',
          type: 'article'
        },
        {
          id: '5',
          title: 'Algorithm Design Manual',
          url: 'https://www.algorist.com/',
          type: 'book'
        }
      ]
    },
    {
      id: 'system-design',
      name: 'System Design',
      description: 'Learn to design scalable, reliable, and maintainable systems. Essential for senior developer interviews.',
      videos: [
        {
          id: '1',
          title: 'System Design Basics',
          url: 'https://www.youtube.com/watch?v=UzLMhqg3_Wc',
          duration: '1:15:00',
          channel: 'Gaurav Sen'
        },
        {
          id: '2',
          title: 'Designing Twitter',
          url: 'https://www.youtube.com/watch?v=KmAyPUv9gOY',
          duration: '45:30',
          channel: 'Gaurav Sen'
        },
        {
          id: '3',
          title: 'Designing Uber',
          url: 'https://www.youtube.com/watch?v=umWABit-wbk',
          duration: '50:20',
          channel: 'Gaurav Sen'
        },
        {
          id: '4',
          title: 'Designing WhatsApp',
          url: 'https://www.youtube.com/watch?v=vvhC64hQZMk',
          duration: '40:15',
          channel: 'Gaurav Sen'
        },
        {
          id: '5',
          title: 'Designing Netflix',
          url: 'https://www.youtube.com/watch?v=psQzyFfsUGU',
          duration: '55:45',
          channel: 'Gaurav Sen'
        }
      ],
      resources: [
        {
          id: '1',
          title: 'System Design Primer',
          url: 'https://github.com/donnemartin/system-design-primer',
          type: 'article'
        },
        {
          id: '2',
          title: 'Designing Data-Intensive Applications',
          url: 'https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/',
          type: 'book'
        },
        {
          id: '3',
          title: 'System Design Interview',
          url: 'https://www.amazon.com/System-Design-Interview-Insiders-Guide/dp/1736049119',
          type: 'book'
        },
        {
          id: '4',
          title: 'System Design Patterns',
          url: 'https://github.com/InterviewReady/system-design',
          type: 'article'
        },
        {
          id: '5',
          title: 'System Design Resources',
          url: 'https://github.com/shashank88/system_design',
          type: 'article'
        }
      ]
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      description: 'Master JavaScript fundamentals, advanced concepts, and modern features. Essential for web development interviews.',
      videos: [
        {
          id: '1',
          title: 'JavaScript Fundamentals',
          url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg',
          duration: '3:26:00',
          channel: 'freeCodeCamp'
        },
        {
          id: '2',
          title: 'JavaScript ES6+ Features',
          url: 'https://www.youtube.com/watch?v=NCZcD6Bp5LQ',
          duration: '1:30:00',
          channel: 'Web Dev Simplified'
        },
        {
          id: '3',
          title: 'JavaScript Async/Await',
          url: 'https://www.youtube.com/watch?v=vn3tm0quoqE',
          duration: '15:20',
          channel: 'Fireship'
        },
        {
          id: '4',
          title: 'JavaScript Closures',
          url: 'https://www.youtube.com/watch?v=vKJpN5FAeF4',
          duration: '20:45',
          channel: 'Web Dev Simplified'
        },
        {
          id: '5',
          title: 'JavaScript Prototypes',
          url: 'https://www.youtube.com/watch?v=riDVvXZ_Kb4',
          duration: '25:30',
          channel: 'Fireship'
        }
      ],
      resources: [
        {
          id: '1',
          title: 'MDN JavaScript Guide',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
          type: 'documentation'
        },
        {
          id: '2',
          title: 'JavaScript: The Good Parts',
          url: 'https://www.oreilly.com/library/view/javascript-the-good/9780596517748/',
          type: 'book'
        },
        {
          id: '3',
          title: 'JavaScript Interview Questions',
          url: 'https://github.com/sudheerj/javascript-interview-questions',
          type: 'article'
        },
        {
          id: '4',
          title: 'JavaScript Design Patterns',
          url: 'https://www.patterns.dev/posts/classic-design-patterns/',
          type: 'article'
        },
        {
          id: '5',
          title: 'JavaScript Best Practices',
          url: 'https://github.com/airbnb/javascript',
          type: 'article'
        }
      ]
    },
    {
      id: 'database',
      name: 'Database Design',
      description: 'Learn database design principles, SQL, NoSQL, and database optimization techniques.',
      videos: [
        {
          id: '1',
          title: 'SQL Basics',
          url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY',
          duration: '4:20:00',
          channel: 'freeCodeCamp'
        },
        {
          id: '2',
          title: 'Database Design',
          url: 'https://www.youtube.com/watch?v=ztHopE5Wnpc',
          duration: '1:15:00',
          channel: 'Caleb Curry'
        },
        {
          id: '3',
          title: 'MongoDB Tutorial',
          url: 'https://www.youtube.com/watch?v=ExcRbA7fy_A',
          duration: '2:30:00',
          channel: 'Web Dev Simplified'
        },
        {
          id: '4',
          title: 'Database Indexing',
          url: 'https://www.youtube.com/watch?v=-qNSXK7t7Sh',
          duration: '25:45',
          channel: 'Gaurav Sen'
        },
        {
          id: '5',
          title: 'Database Normalization',
          url: 'https://www.youtube.com/watch?v=GFQaEYEc8_8',
          duration: '30:20',
          channel: 'Caleb Curry'
        }
      ],
      resources: [
        {
          id: '1',
          title: 'SQL Documentation',
          url: 'https://www.w3schools.com/sql/',
          type: 'documentation'
        },
        {
          id: '2',
          title: 'Database Design for Mere Mortals',
          url: 'https://www.amazon.com/Database-Design-Mere-Mortals-Hands/dp/0321884493',
          type: 'book'
        },
        {
          id: '3',
          title: 'Database Interview Questions',
          url: 'https://github.com/checkcheckzz/database-interview-questions',
          type: 'article'
        },
        {
          id: '4',
          title: 'SQL Performance Explained',
          url: 'https://use-the-index-luke.com/',
          type: 'book'
        },
        {
          id: '5',
          title: 'Database Design Patterns',
          url: 'https://martinfowler.com/articles/patterns-of-distributed-systems/',
          type: 'article'
        }
      ]
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

  const renderMockInterviewSection = () => {
    if (selectedSubject) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h3 className="text-xl font-bold">{selectedSubject.name}</h3>
              <button
                onClick={() => setSelectedSubject(null)}
                className="text-gray-600 hover:text-gray-800"
              >
                Back to Subjects
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-lg font-semibold mb-4">About {selectedSubject.name}</h4>
            <p className="text-gray-600 mb-6">{selectedSubject.description}</p>

            <div className="space-y-6">
              <div>
                <h5 className="text-lg font-semibold mb-4 flex items-center">
                  <PlayCircle className="mr-2" />
                  Recommended Videos
                </h5>
                <div className="space-y-4">
                  {selectedSubject.videos.map(video => (
                    <div key={video.id} className="bg-gray-50 p-4 rounded-lg">
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between hover:text-indigo-600"
                      >
                        <div>
                          <h6 className="font-medium">{video.title}</h6>
                          <p className="text-sm text-gray-500">{video.channel} • {video.duration}</p>
                        </div>
                        <PlayCircle className="h-5 w-5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-lg font-semibold mb-4 flex items-center">
                  <BookOpen className="mr-2" />
                  Additional Resources
                </h5>
                <div className="space-y-4">
                  {selectedSubject.resources.map(resource => (
                    <div key={resource.id} className="bg-gray-50 p-4 rounded-lg">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between hover:text-indigo-600"
                      >
                        <div>
                          <h6 className="font-medium">{resource.title}</h6>
                          <p className="text-sm text-gray-500 capitalize">{resource.type}</p>
                        </div>
                        <BookOpen className="h-5 w-5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Choose Your Favorite Subject</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjects.map(subject => (
            <div
              key={subject.id}
              className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedSubject(subject)}
            >
              <h3 className="text-xl font-bold mb-2">{subject.name}</h3>
              <p className="text-gray-600 text-sm">{subject.description}</p>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <PlayCircle className="h-4 w-4 mr-1" />
                <span>{subject.videos.length} videos</span>
                <BookOpen className="h-4 w-4 ml-4 mr-1" />
                <span>{subject.resources.length} resources</span>
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

      <div className="flex space-x-4 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'technical' && (
        <>
          {showDifficultySelection ? renderDifficultySelection() : renderQuestionsSection('technical')}
        </>
      )}

      {activeTab === 'aptitude' && (
        <>
          {showDifficultySelection ? renderDifficultySelection() : renderQuestionsSection('aptitude')}
        </>
      )}

      {activeTab === 'mock' && renderMockInterviewSection()}

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
                Close
              </button>
            </div>
            <div className="p-4">
              <HooksQuiz />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}