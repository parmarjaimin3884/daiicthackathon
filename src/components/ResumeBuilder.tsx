import React, { useState } from 'react';
import { Plus, Download, Trash2 } from 'lucide-react';

interface Entry {
  id: number;
  [key: string]: any;
}

export default function ResumeBuilder() {
  const [activeSection, setActiveSection] = useState('personal');
  const [educationEntries, setEducationEntries] = useState<Entry[]>([{ id: 1 }]);
  const [experienceEntries, setExperienceEntries] = useState<Entry[]>([{ id: 1 }]);
  const [skillsEntries, setSkillsEntries] = useState<Entry[]>([{ id: 1 }]);
  const [projectsEntries, setProjectsEntries] = useState<Entry[]>([{ id: 1 }]);
  const [achievementsEntries, setAchievementsEntries] = useState<Entry[]>([{ id: 1 }]);

  const sections = [
    { id: 'personal', title: 'Personal Information' },
    { id: 'education', title: 'Education' },
    { id: 'experience', title: 'Work Experience' },
    { id: 'skills', title: 'Skills' },
    { id: 'projects', title: 'Projects' },
    { id: 'achievements', title: 'Achievements' },
  ];

  const handleAddEntry = (section: string) => {
    switch (section) {
      case 'education':
        setEducationEntries([...educationEntries, { id: educationEntries.length + 1 }]);
        break;
      case 'experience':
        setExperienceEntries([...experienceEntries, { id: experienceEntries.length + 1 }]);
        break;
      case 'skills':
        setSkillsEntries([...skillsEntries, { id: skillsEntries.length + 1 }]);
        break;
      case 'projects':
        setProjectsEntries([...projectsEntries, { id: projectsEntries.length + 1 }]);
        break;
      case 'achievements':
        setAchievementsEntries([...achievementsEntries, { id: achievementsEntries.length + 1 }]);
        break;
    }
  };

  const handleRemoveEntry = (section: string, id: number) => {
    switch (section) {
      case 'education':
        setEducationEntries(educationEntries.filter(entry => entry.id !== id));
        break;
      case 'experience':
        setExperienceEntries(experienceEntries.filter(entry => entry.id !== id));
        break;
      case 'skills':
        setSkillsEntries(skillsEntries.filter(entry => entry.id !== id));
        break;
      case 'projects':
        setProjectsEntries(projectsEntries.filter(entry => entry.id !== id));
        break;
      case 'achievements':
        setAchievementsEntries(achievementsEntries.filter(entry => entry.id !== id));
        break;
    }
  };

  const handleInputChange = (section: string, id: number, field: string, value: string) => {
    const updateEntry = (entries: Entry[]) => {
      return entries.map(entry => {
        if (entry.id === id) {
          return { ...entry, [field]: value };
        }
        return entry;
      });
    };

    switch (section) {
      case 'education':
        setEducationEntries(updateEntry(educationEntries));
        break;
      case 'experience':
        setExperienceEntries(updateEntry(experienceEntries));
        break;
      case 'skills':
        setSkillsEntries(updateEntry(skillsEntries));
        break;
      case 'projects':
        setProjectsEntries(updateEntry(projectsEntries));
        break;
      case 'achievements':
        setAchievementsEntries(updateEntry(achievementsEntries));
        break;
    }
  };

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
              onClick={() => setActiveSection(section.id)}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
                {section.id !== 'personal' && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddEntry(section.id);
                    }}
                    className="flex items-center text-indigo-600 hover:text-indigo-700"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </button>
                )}
              </div>
              
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
                {section.id === 'education' && educationEntries.map((entry) => (
                  <div key={entry.id} className="space-y-4 border-b pb-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Education Entry {entry.id}</h4>
                      <button 
                        onClick={() => handleRemoveEntry('education', entry.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Institution Name"
                      className="w-full p-2 border rounded-md"
                      value={entry.institution || ''}
                      onChange={(e) => handleInputChange('education', entry.id, 'institution', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Degree"
                      className="w-full p-2 border rounded-md"
                      value={entry.degree || ''}
                      onChange={(e) => handleInputChange('education', entry.id, 'degree', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Field of Study"
                      className="w-full p-2 border rounded-md"
                      value={entry.field || ''}
                      onChange={(e) => handleInputChange('education', entry.id, 'field', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Graduation Year"
                      className="w-full p-2 border rounded-md"
                      value={entry.year || ''}
                      onChange={(e) => handleInputChange('education', entry.id, 'year', e.target.value)}
                    />
                    <textarea
                      placeholder="Additional Details"
                      className="w-full p-2 border rounded-md"
                      rows={3}
                      value={entry.details || ''}
                      onChange={(e) => handleInputChange('education', entry.id, 'details', e.target.value)}
                    />
                  </div>
                ))}
                {section.id === 'experience' && experienceEntries.map((entry) => (
                  <div key={entry.id} className="space-y-4 border-b pb-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Experience Entry {entry.id}</h4>
                      <button 
                        onClick={() => handleRemoveEntry('experience', entry.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="w-full p-2 border rounded-md"
                      value={entry.company || ''}
                      onChange={(e) => handleInputChange('experience', entry.id, 'company', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Job Title"
                      className="w-full p-2 border rounded-md"
                      value={entry.title || ''}
                      onChange={(e) => handleInputChange('experience', entry.id, 'title', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Duration (e.g., Jan 2020 - Present)"
                      className="w-full p-2 border rounded-md"
                      value={entry.duration || ''}
                      onChange={(e) => handleInputChange('experience', entry.id, 'duration', e.target.value)}
                    />
                    <textarea
                      placeholder="Job Description"
                      className="w-full p-2 border rounded-md"
                      rows={4}
                      value={entry.description || ''}
                      onChange={(e) => handleInputChange('experience', entry.id, 'description', e.target.value)}
                    />
                  </div>
                ))}
                {section.id === 'skills' && skillsEntries.map((entry) => (
                  <div key={entry.id} className="space-y-4 border-b pb-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Skills Entry {entry.id}</h4>
                      <button 
                        onClick={() => handleRemoveEntry('skills', entry.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Technical Skills (comma separated)"
                      className="w-full p-2 border rounded-md"
                      value={entry.technical || ''}
                      onChange={(e) => handleInputChange('skills', entry.id, 'technical', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Soft Skills (comma separated)"
                      className="w-full p-2 border rounded-md"
                      value={entry.soft || ''}
                      onChange={(e) => handleInputChange('skills', entry.id, 'soft', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Languages"
                      className="w-full p-2 border rounded-md"
                      value={entry.languages || ''}
                      onChange={(e) => handleInputChange('skills', entry.id, 'languages', e.target.value)}
                    />
                  </div>
                ))}
                {section.id === 'projects' && projectsEntries.map((entry) => (
                  <div key={entry.id} className="space-y-4 border-b pb-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Project Entry {entry.id}</h4>
                      <button 
                        onClick={() => handleRemoveEntry('projects', entry.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Project Name"
                      className="w-full p-2 border rounded-md"
                      value={entry.name || ''}
                      onChange={(e) => handleInputChange('projects', entry.id, 'name', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Duration"
                      className="w-full p-2 border rounded-md"
                      value={entry.duration || ''}
                      onChange={(e) => handleInputChange('projects', entry.id, 'duration', e.target.value)}
                    />
                    <textarea
                      placeholder="Project Description"
                      className="w-full p-2 border rounded-md"
                      rows={4}
                      value={entry.description || ''}
                      onChange={(e) => handleInputChange('projects', entry.id, 'description', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Technologies Used"
                      className="w-full p-2 border rounded-md"
                      value={entry.technologies || ''}
                      onChange={(e) => handleInputChange('projects', entry.id, 'technologies', e.target.value)}
                    />
                  </div>
                ))}
                {section.id === 'achievements' && achievementsEntries.map((entry) => (
                  <div key={entry.id} className="space-y-4 border-b pb-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Achievement Entry {entry.id}</h4>
                      <button 
                        onClick={() => handleRemoveEntry('achievements', entry.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Achievement Title"
                      className="w-full p-2 border rounded-md"
                      value={entry.title || ''}
                      onChange={(e) => handleInputChange('achievements', entry.id, 'title', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Date"
                      className="w-full p-2 border rounded-md"
                      value={entry.date || ''}
                      onChange={(e) => handleInputChange('achievements', entry.id, 'date', e.target.value)}
                    />
                    <textarea
                      placeholder="Description"
                      className="w-full p-2 border rounded-md"
                      rows={3}
                      value={entry.description || ''}
                      onChange={(e) => handleInputChange('achievements', entry.id, 'description', e.target.value)}
                    />
                  </div>
                ))}
              </div>
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