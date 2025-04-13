import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaDiscord, FaUniversity, FaSearch, FaFilter, FaBell } from 'react-icons/fa';
import { MdEvent, MdPeople, MdWork } from 'react-icons/md';
import { useConnections } from '../context/ConnectionContext';

const Networking = () => {
  const [activeTab, setActiveTab] = useState('communities');
  const [showNotifications, setShowNotifications] = useState(false);
  const { connections, notifications, sendConnectionRequest, acceptConnection, rejectConnection, markNotificationAsRead } = useConnections();
  const navigate = useNavigate();

  const communities = [
    {
      id: 'data-science',
      type: 'LinkedIn',
      name: 'Data Science Professionals',
      members: '50K+',
      icon: <FaLinkedin className="text-blue-600" />,
      description: 'Connect with data science professionals worldwide'
    },
    {
      id: 'web-dev',
      type: 'GitHub',
      name: 'Web Development Community',
      members: '30K+',
      icon: <FaGithub className="text-gray-800" />,
      description: 'Open source web development projects and discussions'
    },
    {
      id: 'tech-career',
      type: 'Discord',
      name: 'Tech Career Growth',
      members: '20K+',
      icon: <FaDiscord className="text-indigo-600" />,
      description: 'Real-time discussions about tech careers'
    }
  ];

  const suggestedConnections = [
    {
      id: '1',
      name: 'John Doe',
      role: 'Senior Software Engineer',
      company: 'Tech Corp',
      tags: ['Open to Mentor', 'Web Development'],
      mutualConnections: 5
    },
    {
      id: '2',
      name: 'Jane Smith',
      role: 'Data Scientist',
      company: 'AI Solutions',
      tags: ['Looking for Collaborators', 'Machine Learning'],
      mutualConnections: 3
    }
  ];

  const events = [
    {
      id: 'hackathon-2024',
      name: 'Global AI Hackathon 2024',
      type: 'Hackathon',
      date: 'March 15-17, 2024',
      location: 'Virtual',
      description: 'Join us for a 48-hour hackathon focused on AI and machine learning solutions. Win prizes and network with industry experts.'
    },
    {
      id: 'tech-conference-2024',
      name: 'Tech Innovation Summit 2024',
      type: 'Conference',
      date: 'April 5-6, 2024',
      location: 'San Francisco, CA',
      description: 'A two-day conference featuring talks from tech leaders, workshops, and networking opportunities.'
    }
  ];

  const handleConnectionRequest = (userId: string) => {
    sendConnectionRequest(userId);
  };

  const handleAcceptConnection = (userId: string) => {
    acceptConnection(userId);
  };

  const handleRejectConnection = (userId: string) => {
    rejectConnection(userId);
  };

  const getConnectionStatus = (userId: string) => {
    const connection = connections.find(conn => conn.id === userId);
    return connection?.status;
  };

  const getConnectionButton = (userId: string) => {
    const status = getConnectionStatus(userId);
    const connection = connections.find(conn => conn.id === userId);

    if (!status) {
      return (
        <button
          onClick={() => handleConnectionRequest(userId)}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
        >
          Connect
        </button>
      );
    }

    if (status === 'pending') {
      if (connection?.isIncoming) {
        return (
          <div className="space-y-2">
            <button
              onClick={() => handleAcceptConnection(userId)}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Accept Request
            </button>
            <button
              onClick={() => handleRejectConnection(userId)}
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
            >
              Reject
            </button>
          </div>
        );
      }
      return (
        <button
          disabled
          className="w-full bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed"
        >
          Request Sent
        </button>
      );
    }

    if (status === 'accepted') {
      return (
        <button
          disabled
          className="w-full bg-green-600 text-white py-2 rounded-lg cursor-not-allowed"
        >
          Connected
        </button>
      );
    }

    return null;
  };

  const handleEventRegistration = (eventId: string) => {
    navigate(`/dashboard/networking/event/${eventId}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Networking Hub</h1>
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-600 hover:text-gray-900"
          >
            <FaBell className="text-xl" />
            {notifications.some(n => !n.read) && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <div className="p-4">
                <h3 className="font-semibold mb-2">Notifications</h3>
                {notifications.length === 0 ? (
                  <p className="text-gray-500 text-sm">No new notifications</p>
                ) : (
                  <div className="space-y-2">
                    {notifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`p-2 rounded-lg ${
                          notification.read ? 'bg-gray-50' : 'bg-indigo-50'
                        }`}
                      >
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('communities')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'communities'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Communities
        </button>
        <button
          onClick={() => setActiveTab('connections')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'connections'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          People You May Know
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'events'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Events & Hackathons
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg">
          <FaFilter className="text-gray-500" />
          <span>Filters</span>
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'communities' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((community) => (
            <div key={community.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-2xl">{community.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg">{community.name}</h3>
                  <p className="text-gray-500">{community.members} members</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{community.description}</p>
              <Link
                to={`/dashboard/networking/community/${community.id}`}
                className="block w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 text-center"
              >
                Join Community
              </Link>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'connections' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {suggestedConnections.map((connection) => (
            <div key={connection.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div>
                  <h3 className="font-semibold text-lg">{connection.name}</h3>
                  <p className="text-gray-500">{connection.role} at {connection.company}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {connection.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-500 mb-4">{connection.mutualConnections} mutual connections</p>
              {getConnectionButton(connection.id)}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-2xl text-indigo-600">
                  {event.type === 'Hackathon' ? <MdWork /> : <MdEvent />}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{event.name}</h3>
                  <p className="text-gray-500">{event.date} • {event.location}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <button 
                onClick={() => handleEventRegistration(event.id)}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
              >
                Register Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Networking; 