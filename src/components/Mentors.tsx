import React from 'react';
import { Star, Calendar, MessageSquare } from 'lucide-react';

export default function Mentors() {
  const mentors = [
    {
      id: 1,
      name: 'Ram bhai',
      role: 'Senior Software Engineer',
      company: 'Google',
      expertise: ['React', 'Node.js', 'System Design'],
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 2,
      name: 'karsan bhai',
      role: 'Product Manager',
      company: 'Microsoft',
      expertise: ['Product Strategy', 'Agile', 'UX'],
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 3,
      name: 'kalu bhai',
      role: 'Tech Lead',
      company: 'Amazon',
      expertise: ['Cloud Architecture', 'Java', 'Leadership'],
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Find a Mentor</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search mentors..."
            className="px-4 py-2 border rounded-md"
          />
          <select className="px-4 py-2 border rounded-md">
            <option>All Expertise</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>Full Stack</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
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

            <div className="flex space-x-2">
              <button className="flex-1 flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </button>
              <button className="flex-1 flex items-center justify-center px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}