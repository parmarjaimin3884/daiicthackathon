import React, { useState } from 'react';
import { Calendar, Users, Clock, Filter, Search, X, Bookmark, Share2, Video, FileText, Download } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface Webinar {
  id: number;
  title: string;
  mentor: string;
  date: string;
  time: string;
  attendees: number;
  category: string;
  image: string;
  description: string;
  maxAttendees: number;
  price: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  materials: string[];
  prerequisites: string[];
  waitingList: number;
  recordingAvailable: boolean;
  slidesAvailable: boolean;
}

export default function Webinars() {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedWebinar, setSelectedWebinar] = useState<Webinar | null>(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const webinars: Webinar[] = [
    {
      id: 1,
      title: 'Tech Interview Mastery',
      mentor: 'David Chen',
      date: 'Mar 15, 2024',
      time: '2:00 PM',
      attendees: 45,
      category: 'Interview Prep',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Learn the secrets to acing technical interviews. This webinar covers common interview patterns, problem-solving strategies, and how to effectively communicate your thought process.',
      maxAttendees: 100,
      price: 0,
      duration: '2 hours',
      level: 'Intermediate',
      materials: ['Interview Cheat Sheet', 'Practice Problems', 'Common Patterns Guide'],
      prerequisites: ['Basic programming knowledge', 'Understanding of data structures'],
      waitingList: 5,
      recordingAvailable: true,
      slidesAvailable: true
    },
    {
      id: 2,
      title: 'System Design for Scale',
      mentor: 'Sarah Williams',
      date: 'Mar 18, 2024',
      time: '3:00 PM',
      attendees: 32,
      category: 'Technical',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Master the art of designing scalable systems. Learn about microservices, load balancing, caching strategies, and database scaling techniques.',
      maxAttendees: 50,
      price: 0,
      duration: '2.5 hours',
      level: 'Advanced',
      materials: [],
      prerequisites: [],
      waitingList: 0,
      recordingAvailable: false,
      slidesAvailable: false
    },
    {
      id: 3,
      title: 'Building Your Tech Portfolio',
      mentor: 'Michael Brown',
      date: 'Mar 20, 2024',
      time: '1:00 PM',
      attendees: 28,
      category: 'Career Growth',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Learn how to create an impressive tech portfolio that stands out to employers. Tips on project selection, documentation, and presentation.',
      maxAttendees: 75,
      price: 0,
      duration: '1.5 hours',
      level: 'Beginner',
      materials: [],
      prerequisites: [],
      waitingList: 0,
      recordingAvailable: false,
      slidesAvailable: false
    },
  ];

  const filteredWebinars = webinars.filter(webinar => {
    const matchesSearch = webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         webinar.mentor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         webinar.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || 
                          webinar.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All Levels' || 
                        webinar.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleViewDetails = (webinar: Webinar) => {
    setSelectedWebinar(webinar);
    setShowDetailsModal(true);
  };

  const handleDownloadMaterial = (material: string) => {
    // Here you would typically make an API call to download the material
    console.log(`Downloading ${material}`);
  };

  const handleShareWebinar = () => {
    // Here you would typically implement sharing functionality
    console.log('Sharing webinar');
  };

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWebinar) return;

    try {
      // Create notification for the webinar date
      const webinarDate = new Date(`${selectedWebinar.date} ${selectedWebinar.time}`);
      const notificationTime = new Date(webinarDate.getTime() - (30 * 60 * 1000)); // 30 minutes before
      
      // Here you would typically make an API call to save the registration
      console.log('Saving registration:', {
        webinarId: selectedWebinar.id,
        userId: user?.id,
        notificationTime: notificationTime.toISOString()
      });
      
      // Update attendees count
      const updatedWebinar = {
        ...selectedWebinar,
        attendees: selectedWebinar.attendees + 1
      };
      
      setRegistrationSuccess(true);
      setTimeout(() => {
        setShowRegistrationModal(false);
        setRegistrationSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Upcoming Webinars</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search webinars..."
              className="pl-10 pr-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <select 
            className="px-4 py-2 border rounded-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>All Categories</option>
            {Array.from(new Set(webinars.map(w => w.category))).map(category => (
              <option key={category}>{category}</option>
            ))}
          </select>
          <select 
            className="px-4 py-2 border rounded-md"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option>All Levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWebinars.map((webinar) => (
          <div key={webinar.id} className="bg-white rounded-lg shadow overflow-hidden">
            <img
              src={webinar.image}
              alt={webinar.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                  {webinar.category}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {webinar.level}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mt-2">{webinar.title}</h3>
              <p className="text-gray-600">by {webinar.mentor}</p>
              
              <div className="flex items-center mt-4 text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{webinar.date}</span>
                <Clock className="h-4 w-4 ml-4 mr-2" />
                <span>{webinar.time}</span>
              </div>
              
              <div className="flex items-center mt-2 text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                <span>{webinar.attendees}/{webinar.maxAttendees} attending</span>
                {webinar.waitingList > 0 && (
                  <span className="ml-2 text-orange-600">({webinar.waitingList} on waiting list)</span>
                )}
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-600 line-clamp-2">{webinar.description}</p>
              </div>

              <div className="mt-4 flex space-x-2">
                <button 
                  onClick={() => handleViewDetails(webinar)}
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                  disabled={webinar.attendees >= webinar.maxAttendees}
                >
                  {webinar.attendees >= webinar.maxAttendees ? 'Join Waiting List' : 'Register Now'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedWebinar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold">{selectedWebinar.title}</h2>
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
                  src={selectedWebinar.image}
                  alt={selectedWebinar.title}
                  className="w-full rounded-lg"
                />
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-gray-500" />
                      <span className="ml-2">{selectedWebinar.attendees}/{selectedWebinar.maxAttendees} attending</span>
                    </div>
                    {selectedWebinar.waitingList > 0 && (
                      <span className="text-orange-600">({selectedWebinar.waitingList} on waiting list)</span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <span className="ml-2">{selectedWebinar.duration}</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-600">{selectedWebinar.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Prerequisites</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {selectedWebinar.prerequisites.map((prereq, index) => (
                      <li key={index}>{prereq}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Materials</h3>
                  <div className="space-y-2">
                    {selectedWebinar.materials.map((material, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span className="ml-2">{material}</span>
                        </div>
                        <button
                          onClick={() => handleDownloadMaterial(material)}
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      setShowRegistrationModal(true);
                    }}
                    className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                    disabled={selectedWebinar.attendees >= selectedWebinar.maxAttendees}
                  >
                    {selectedWebinar.attendees >= selectedWebinar.maxAttendees ? 'Join Waiting List' : 'Register Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {showRegistrationModal && selectedWebinar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Register for {selectedWebinar.title}</h2>
              <button
                onClick={() => setShowRegistrationModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {registrationSuccess ? (
              <div className="text-center py-4">
                <div className="text-green-500 text-lg font-semibold mb-2">
                  Registration Successful!
                </div>
                <p className="text-gray-600">
                  You have been registered for the webinar. You will receive a notification 30 minutes before the session starts.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegistrationSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Webinar Details
                    </label>
                    <div className="mt-1 text-sm text-gray-600">
                      <p>Date: {selectedWebinar.date}</p>
                      <p>Time: {selectedWebinar.time}</p>
                      <p>Duration: {selectedWebinar.duration}</p>
                      <p>Level: {selectedWebinar.level}</p>
                      <p>Current Attendees: {selectedWebinar.attendees}/{selectedWebinar.maxAttendees}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Your Information
                    </label>
                    <div className="mt-1 text-sm text-gray-600">
                      <p>Name: {user?.firstName} {user?.lastName}</p>
                      <p>Email: {user?.email}</p>
                      <p>Role: {user?.role}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowRegistrationModal(false)}
                    className="px-4 py-2 border rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Confirm Registration
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}