import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FaUsers, FaPaperclip, FaEllipsisV } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
}

const CommunityGroup = () => {
  const { communityId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [communityInfo, setCommunityInfo] = useState({
    name: 'Data Science Professionals',
    members: '50K+',
    description: 'Connect with data science professionals worldwide'
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simulated chat messages
  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: '1',
        sender: 'John Doe',
        content: 'Hello everyone! Excited to be part of this community.',
        timestamp: '10:30 AM',
        isCurrentUser: false
      },
      {
        id: '2',
        sender: 'You',
        content: 'Hi John! Welcome to the group.',
        timestamp: '10:32 AM',
        isCurrentUser: true
      },
      {
        id: '3',
        sender: 'Jane Smith',
        content: 'Does anyone have experience with TensorFlow?',
        timestamp: '10:35 AM',
        isCurrentUser: false
      }
    ];
    setMessages(initialMessages);
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'You',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Community Info Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
            <FaUsers className="text-indigo-600 text-xl" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">{communityInfo.name}</h2>
            <p className="text-sm text-gray-500">{communityInfo.members} members</p>
          </div>
        </div>
        <p className="text-gray-600 mb-6">{communityInfo.description}</p>
        
        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-2">Community Rules</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Be respectful to all members</li>
            <li>• No spam or promotional content</li>
            <li>• Keep discussions relevant to the topic</li>
            <li>• Share knowledge and help others</li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-2">Active Members</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <span className="text-sm">John Doe</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <span className="text-sm">Jane Smith</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h2 className="font-semibold text-lg">Community Chat</h2>
          </div>
          <button className="text-gray-500 hover:text-gray-700">
            <FaEllipsisV />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.isCurrentUser
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {!message.isCurrentUser && (
                  <div className="font-medium text-sm mb-1">{message.sender}</div>
                )}
                <div className="text-sm">{message.content}</div>
                <div
                  className={`text-xs mt-1 ${
                    message.isCurrentUser ? 'text-indigo-100' : 'text-gray-500'
                  }`}
                >
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <FaPaperclip />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700"
            >
              <IoMdSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommunityGroup; 