import React from 'react';
import { ChevronRight, Trophy, Calendar, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useUser();
  const firstName = user?.firstName || 'Student';

  const handleJoinSession = () => {
    navigate('/dashboard/meeting');
  };

  return (
    <div className="p-6">
      {/* Career Progress */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{firstName}'s Career Roadmap Progress</h3>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '0%' }}></div>
        </div>
        <div className="mt-2 text-sm text-gray-600">0% completed</div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* XP Progress */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{firstName}'s Level Progress</h3>
            <Trophy className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="text-3xl font-bold text-indigo-600"> 00 LP</div>
          <p className="text-sm text-gray-600 mt-2">Level 0 - Expert in collecting Stars</p>
        </div>

        {/* Upcoming Webinars */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{firstName}'s Next Webinar</h3>
            <Calendar className="h-5 w-5 text-indigo-600" />
          </div>
          <p className="font-medium text-gray-800">Tech Interview Mastery</p>
          <p className="text-sm text-gray-600 mt-1">Tomorrow at 1:00 PM</p>
          <button 
            onClick={handleJoinSession}
            className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Join Session
          </button>
        </div>  

        {/* Mentor Recommendations */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{firstName}'s Top Mentor Match</h3>
            <Star className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="flex items-center">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Mentor"
              className="h-12 w-12 rounded-full"
            />
            <div className="ml-3">
              <p className="font-medium text-gray-800">Gandhiji</p>
              <p className="text-sm text-gray-600">Senior Software Engineer</p>
            </div>
          </div>
          <button className="mt-4 w-full border border-indigo-600 text-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-50">
            Schedule Meeting
          </button>
        </div>
      </div>
    </div>
  );
}