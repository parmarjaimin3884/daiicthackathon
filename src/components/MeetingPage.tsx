import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Video, Users, Clock } from 'lucide-react';

const MeetingPage = () => {
  const navigate = useNavigate();
  // Generate a random meeting link for demo purposes
  const meetingLink = `https://meet.google.com/${Math.random().toString(36).substring(2, 15)}`;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>

        {/* Meeting Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Tech Interview Mastery Session</h1>
          
          {/* Meeting Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Video className="h-5 w-5 mr-2" />
              <span>Online Meeting</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="h-5 w-5 mr-2" />
              <span>25 Participants</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-2" />
              <span>1:00 PM - 2:30 PM</span>
            </div>
          </div>

          {/* Meeting Link */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Meeting Link</h2>
            <div className="flex items-center">
              <input
                type="text"
                value={meetingLink}
                readOnly
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={() => navigator.clipboard.writeText(meetingLink)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700"
              >
                Copy Link
              </button>
            </div>
          </div>

          {/* Join Button */}
          <div className="flex justify-center">
            <a
              href={meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
            >
              <Video className="h-5 w-5 mr-2" />
              Join Meeting Now
            </a>
          </div>

          {/* Meeting Instructions */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Meeting Instructions</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Please join the meeting 5 minutes before the scheduled time</li>
              <li>Ensure your microphone and camera are working properly</li>
              <li>Mute your microphone when not speaking</li>
              <li>Use the chat feature for questions</li>
              <li>Have your questions prepared in advance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingPage; 