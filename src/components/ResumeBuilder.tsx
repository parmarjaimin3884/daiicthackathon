import React, { useState } from 'react';
import { Plus, Download } from 'lucide-react';

export default function ResumeBuilder() {
  const [activeSection, setActiveSection] = useState('personal');

  const sections = [
    { id: 'personal', title: 'Personal Information' },
    { id: 'education', title: 'Education' },
    { id: 'experience', title: 'Work Experience' },
    { id: 'skills', title: 'Skills' },
    { id: 'projects', title: 'Projects' },
    { id: 'achievements', title: 'Achievements' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Resume Builder</h1>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Edit Section */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
                <button className="flex items-center text-indigo-600 hover:text-indigo-700">
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </button>
              </div>
              
              {section.id === activeSection && (
                <div className="space-y-4">
                  {section.id === 'personal' && (
                    <>
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full p-2 border rounded-md"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border rounded-md"
                      />
                      <textarea
                        placeholder="Professional Summary"
                        className="w-full p-2 border rounded-md"
                        rows={4}
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Resume Preview</h3>
          <div className="border rounded-md p-6 min-h-[600px]">
            <h1 className="text-2xl font-bold mb-2">Deep Pathak</h1>
            <p className="text-gray-600 mb-4">deepapathak9607@gmail.com</p>
            <div className="border-t pt-4 mt-4">
              <h2 className="text-lg font-semibold mb-2">Professional Summary</h2>
              <p className="text-gray-600">
                Dedicated software engineer with a passion for creating efficient and scalable solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}