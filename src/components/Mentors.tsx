import React, { useState } from 'react';
import { Star, Calendar, MessageSquare, Search, Filter, ChevronRight, ChevronLeft, ThumbsUp, ThumbsDown, X } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface Review {
  id: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
  dislikes: number;
}

interface Mentor {
  id: number;
  name: string;
  role: string;
  company: string;
  expertise: string[];
  rating: number;
  image: string;
  availability: string[];
  bio: string;
  reviews: Review[];
  hourlyRate: number;
  sessionsCompleted: number;
  languages: string[];
  education: string;
}

export default function Mentors() {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('All Expertise');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [message, setMessage] = useState('');
  const [currentReviewPage, setCurrentReviewPage] = useState(1);
  const reviewsPerPage = 3;

  const mentors: Mentor[] = [
    {
      id: 1,
      name: 'Ram bhai',
      role: 'Senior Software Engineer',
      company: 'Google',
      expertise: ['React', 'Node.js', 'System Design'],
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      availability: ['Mon 2-4 PM', 'Wed 10-12 AM', 'Fri 3-5 PM'],
      bio: '10+ years of experience in full-stack development. Specialized in React and Node.js architecture.',
      hourlyRate: 50,
      sessionsCompleted: 120,
      languages: ['English', 'Hindi'],
      education: 'M.Tech in Computer Science, IIT Delhi',
      reviews: [
        {
          id: 1,
          userId: 101,
          userName: 'John Doe',
          rating: 5,
          comment: 'Excellent mentor! Very patient and knowledgeable. Helped me understand complex concepts easily.',
          date: '2024-02-15',
          likes: 12,
          dislikes: 0
        },
        {
          id: 2,
          userId: 102,
          userName: 'Jane Smith',
          rating: 4,
          comment: 'Great session. Very practical approach to problem-solving.',
          date: '2024-02-10',
          likes: 8,
          dislikes: 1
        }
      ]
    },
    {
      id: 2,
      name: 'karsan bhai',
      role: 'Product Manager',
      company: 'Microsoft',
      expertise: ['Product Strategy', 'Agile', 'UX'],
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      availability: ['Tue 1-3 PM', 'Thu 11-1 PM', 'Sat 10-12 AM'],
      bio: 'Product leader with expertise in agile methodologies and user experience design.',
      hourlyRate: 45,
      sessionsCompleted: 80,
      languages: ['English', 'Spanish'],
      education: 'M.Sc in Business Administration, Harvard University',
      reviews: [
        {
          id: 3,
          userId: 103,
          userName: 'Alice Johnson',
          rating: 4.5,
          comment: 'Great mentor! Helped me improve my product management skills significantly.',
          date: '2024-02-12',
          likes: 10,
          dislikes: 0
        },
        {
          id: 4,
          userId: 104,
          userName: 'Bob Brown',
          rating: 4,
          comment: 'Good session. Could have been more interactive.',
          date: '2024-02-08',
          likes: 6,
          dislikes: 1
        }
      ]
    },
    {
      id: 3,
      name: 'kalu bhai',
      role: 'Tech Lead',
      company: 'Amazon',
      expertise: ['Cloud Architecture', 'Java', 'Leadership'],
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      availability: ['Mon 3-5 PM', 'Wed 2-4 PM', 'Fri 1-3 PM'],
      bio: 'Experienced tech lead specializing in cloud architecture and team leadership.',
      hourlyRate: 60,
      sessionsCompleted: 100,
      languages: ['English', 'French'],
      education: 'B.Tech in Computer Science, IIT Bombay',
      reviews: [
        {
          id: 5,
          userId: 105,
          userName: 'Eve Adams',
          rating: 4.8,
          comment: 'Excellent mentor! Very knowledgeable and approachable. Helped me understand cloud concepts clearly.',
          date: '2024-02-14',
          likes: 15,
          dislikes: 0
        },
        {
          id: 6,
          userId: 106,
          userName: 'Charlie Davis',
          rating: 4.6,
          comment: 'Good session. Could have been more practical.',
          date: '2024-02-10',
          likes: 5,
          dislikes: 1
        }
      ]
    },
  ];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesExpertise = selectedExpertise === 'All Expertise' || 
                           mentor.expertise.includes(selectedExpertise);
    return matchesSearch && matchesExpertise;
  });

  const handleSchedule = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setShowScheduleModal(true);
  };

  const handleMessage = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setShowMessageModal(true);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to schedule the session
    alert(`Session scheduled with ${selectedMentor?.name} on ${selectedDate}`);
    setShowScheduleModal(false);
    setSelectedDate('');
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to send the message
    alert(`Message sent to ${selectedMentor?.name}`);
    setShowMessageModal(false);
    setMessage('');
  };

  const handleViewDetails = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setShowDetailsModal(true);
  };

  const handleReviewLike = (reviewId: number) => {
    // Here you would typically make an API call to update likes
    console.log(`Liked review ${reviewId}`);
  };

  const handleReviewDislike = (reviewId: number) => {
    // Here you would typically make an API call to update dislikes
    console.log(`Disliked review ${reviewId}`);
  };

  const paginatedReviews = selectedMentor?.reviews.slice(
    (currentReviewPage - 1) * reviewsPerPage,
    currentReviewPage * reviewsPerPage
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Find a Mentor</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search mentors..."
              className="pl-10 pr-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <select 
            className="px-4 py-2 border rounded-md"
            value={selectedExpertise}
            onChange={(e) => setSelectedExpertise(e.target.value)}
          >
            <option>All Expertise</option>
            {Array.from(new Set(mentors.flatMap(m => m.expertise))).map(expertise => (
              <option key={expertise}>{expertise}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => (
          <div key={mentor.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <img
                src={mentor.image}
                alt={mentor.name}
                className="h-16 w-16 rounded-full"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">{mentor.name}</h3>
                <p className="text-sm text-gray-600">{mentor.role}</p>
                <p className="text-sm text-gray-600">{mentor.company}</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="ml-1 text-sm font-medium">{mentor.rating}</span>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-800 mb-2">Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-800 mb-2">Availability</h4>
              <div className="flex flex-wrap gap-2">
                {mentor.availability.map((slot) => (
                  <span
                    key={slot}
                    className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-sm"
                  >
                    {slot}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <button 
                onClick={() => handleViewDetails(mentor)}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
              >
                View Details
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold">{selectedMentor.name}</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <img
                  src={selectedMentor.image}
                  alt={selectedMentor.name}
                  className="w-full rounded-lg"
                />
                <div className="mt-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="ml-2 font-semibold">{selectedMentor.rating}</span>
                    <span className="text-gray-500 ml-2">({selectedMentor.reviews.length} reviews)</span>
                  </div>
                  <p className="text-gray-600 mt-2">${selectedMentor.hourlyRate}/hour</p>
                  <p className="text-gray-600">{selectedMentor.sessionsCompleted} sessions completed</p>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">About</h3>
                  <p className="text-gray-600">{selectedMentor.bio}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Education</h3>
                  <p className="text-gray-600">{selectedMentor.education}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMentor.languages.map((language) => (
                      <span
                        key={language}
                        className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Reviews</h3>
                  {paginatedReviews?.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 py-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{review.userName}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="ml-1 text-sm">{review.rating}</span>
                            <span className="text-gray-500 text-sm ml-2">{review.date}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleReviewLike(review.id)}
                            className="flex items-center text-gray-500 hover:text-green-500"
                          >
                            <ThumbsUp className="h-4 w-4" />
                            <span className="ml-1 text-sm">{review.likes}</span>
                          </button>
                          <button
                            onClick={() => handleReviewDislike(review.id)}
                            className="flex items-center text-gray-500 hover:text-red-500"
                          >
                            <ThumbsDown className="h-4 w-4" />
                            <span className="ml-1 text-sm">{review.dislikes}</span>
                          </button>
                        </div>
                      </div>
                      <p className="mt-2 text-gray-600">{review.comment}</p>
                    </div>
                  ))}

                  {selectedMentor.reviews.length > reviewsPerPage && (
                    <div className="flex justify-center mt-4">
                      <button
                        onClick={() => setCurrentReviewPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentReviewPage === 1}
                        className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <span className="mx-4 py-2">
                        Page {currentReviewPage} of {Math.ceil(selectedMentor.reviews.length / reviewsPerPage)}
                      </span>
                      <button
                        onClick={() => setCurrentReviewPage(prev => Math.min(prev + 1, Math.ceil(selectedMentor.reviews.length / reviewsPerPage)))}
                        disabled={currentReviewPage === Math.ceil(selectedMentor.reviews.length / reviewsPerPage)}
                        className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleSchedule(selectedMentor);
                    }}
                    className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                  >
                    Schedule Session
                  </button>
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleMessage(selectedMentor);
                    }}
                    className="flex-1 border border-indigo-600 text-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-50"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Schedule Session with {selectedMentor.name}</h2>
            <form onSubmit={handleScheduleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date and Time
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                >
                  <option value="">Select a time slot</option>
                  {selectedMentor.availability.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Message {selectedMentor.name}</h2>
            <form onSubmit={handleMessageSubmit}>
              <div className="mb-4">
                <textarea
                  className="w-full px-3 py-2 border rounded-md"
                  rows={4}
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowMessageModal(false)}
                  className="px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}