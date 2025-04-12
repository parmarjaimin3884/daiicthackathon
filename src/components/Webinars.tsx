import React from 'react';
import { Calendar, Users, Clock, Filter } from 'lucide-react';

export default function Webinars() {
  const webinars = [
    {
      id: 1,
      title: 'Tech Interview Mastery',
      mentor: 'David Chen',
      date: 'Mar 15, 2024',
      time: '2:00 PM',
      attendees: 45,
      category: 'Interview Prep',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
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
    },
  ];

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
            />
            <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <select className="px-4 py-2 border rounded-md">
            <option>All Categories</option>
            <option>Interview Prep</option>
            <option>Technical</option>
            <option>Career Growth</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {webinars.map((webinar) => (
          <div key={webinar.id} className="bg-white rounded-lg shadow overflow-hidden">
            <img
              src={webinar.image}
              alt={webinar.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                {webinar.category}
              </span>
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
                <span>{webinar.attendees} attending</span>
              </div>

              <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
                Register Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}