import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaCode, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface EventDetails {
  id: string;
  name: string;
  type: 'Hackathon' | 'Career Fair' | 'Webinar' | 'Meetup';
  date: string;
  location: string;
  description: string;
  maxParticipants?: number;
  currentParticipants: number;
  registrationDeadline: string;
  requirements?: string[];
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  role: string;
  experience: string;
  teamName: string;
  teamMembers: string;
  projectIdea: string;
  skills: string;
  dietaryRestrictions: string;
  specialRequirements: string;
}

const EventRegistration = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    experience: '',
    teamName: '',
    teamMembers: '',
    projectIdea: '',
    skills: '',
    dietaryRestrictions: '',
    specialRequirements: ''
  });

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchEventDetails = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        const mockEventData: EventDetails = {
          id: eventId || '1',
          name: 'Global AI Hackathon 2024',
          type: 'Hackathon',
          date: 'March 15-17, 2024',
          location: 'Virtual',
          description: 'Join us for a 48-hour hackathon focused on AI and machine learning solutions. Win prizes and network with industry experts.',
          maxParticipants: 100,
          currentParticipants: 45,
          registrationDeadline: '2024-03-10',
          requirements: [
            'Basic knowledge of AI/ML',
            'Laptop with necessary software',
            'Team of 2-4 members',
            'GitHub account'
          ]
        };
        setEventDetails(mockEventData);
      } catch (error) {
        toast.error('Failed to load event details');
        navigate('/dashboard/networking?tab=events');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      toast.error('Please enter your full name');
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) {
      toast.error('Please enter a valid 10-digit phone number');
      return false;
    }
    if (eventDetails?.type === 'Hackathon' && !formData.teamName.trim()) {
      toast.error('Please enter a team name');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      // In a real app, this would submit to an API
      console.log('Registration submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Registration successful! You will receive a confirmation email shortly.');
      navigate('/dashboard/networking?tab=events');
    } catch (error) {
      toast.error('Failed to submit registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!eventDetails) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{eventDetails.name}</h1>
          <div className="flex flex-wrap gap-4 text-gray-600">
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2" />
              <span>{eventDetails.date}</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              <span>{eventDetails.location}</span>
            </div>
            <div className="flex items-center">
              <FaUsers className="mr-2" />
              <span>{eventDetails.currentParticipants}/{eventDetails.maxParticipants} participants</span>
            </div>
            {eventDetails.type === 'Hackathon' && (
              <div className="flex items-center">
                <FaCode className="mr-2" />
                <span>Hackathon</span>
              </div>
            )}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Event Description</h2>
          <p className="text-gray-600 mb-4">{eventDetails.description}</p>
          
          {eventDetails.requirements && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Requirements:</h3>
              <ul className="list-disc list-inside text-gray-600">
                {eventDetails.requirements.map((req, index) => (
                  <li key={index} className="flex items-center">
                    <FaCheck className="text-green-500 mr-2" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                pattern="[0-9]{10}"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
                Organization/University
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {eventDetails.type === 'Hackathon' && (
            <>
              <div>
                <label htmlFor="teamName" className="block text-sm font-medium text-gray-700">
                  Team Name *
                </label>
                <input
                  type="text"
                  id="teamName"
                  name="teamName"
                  required
                  value={formData.teamName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="teamMembers" className="block text-sm font-medium text-gray-700">
                  Team Members (comma separated)
                </label>
                <input
                  type="text"
                  id="teamMembers"
                  name="teamMembers"
                  value={formData.teamMembers}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="projectIdea" className="block text-sm font-medium text-gray-700">
                  Project Idea (optional)
                </label>
                <textarea
                  id="projectIdea"
                  name="projectIdea"
                  rows={3}
                  value={formData.projectIdea}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
              Relevant Skills
            </label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700">
              Dietary Restrictions (if any)
            </label>
            <input
              type="text"
              id="dietaryRestrictions"
              name="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700">
              Special Requirements
            </label>
            <textarea
              id="specialRequirements"
              name="specialRequirements"
              rows={3}
              value={formData.specialRequirements}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-md text-white ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Register Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventRegistration; 