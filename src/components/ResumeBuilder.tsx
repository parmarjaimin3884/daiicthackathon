import React, { useState } from 'react';
import { Plus, Download, Trash2, Eye, Edit2, Save } from 'lucide-react';

interface Section {
  id: string;
  type: 'personal' | 'education' | 'experience' | 'skills' | 'projects' | 'achievements';
  title: string;
  content: any;
}

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string[];
}

interface Skill {
  category: string;
  items: string[];
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
  link: string;
}

interface Achievement {
  title: string;
  date: string;
  description: string;
}

const ResumeBuilder: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([
    {
      id: '1',
      type: 'personal',
      title: 'Personal Information',
      content: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        summary: ''
      }
    },
    {
      id: '2',
      type: 'education',
      title: 'Education',
      content: []
    },
    {
      id: '3',
      type: 'experience',
      title: 'Work Experience',
      content: []
    },
    {
      id: '4',
      type: 'skills',
      title: 'Skills',
      content: []
    },
    {
      id: '5',
      type: 'projects',
      title: 'Projects',
      content: []
    },
    {
      id: '6',
      type: 'achievements',
      title: 'Achievements',
      content: []
    }
  ]);

  const [activeSection, setActiveSection] = useState<string>('1');
  const [isPreview, setIsPreview] = useState<boolean>(false);

  const handleAddEntry = (sectionId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        const newEntry = getEmptyEntry(section.type);
        return {
          ...section,
          content: [...section.content, newEntry]
        };
      }
      return section;
    }));
  };

  const handleDeleteEntry = (sectionId: string, entryIndex: number) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          content: section.content.filter((_: any, index: number) => index !== entryIndex)
        };
      }
      return section;
    }));
  };

  const handleUpdateEntry = (sectionId: string, entryIndex: number, field: string, value: any) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        if (section.type === 'personal') {
          return {
            ...section,
            content: {
              ...section.content,
              [field]: value
            }
          };
        } else {
          const updatedContent = [...section.content];
          updatedContent[entryIndex] = {
            ...updatedContent[entryIndex],
            [field]: value
          };
          return {
            ...section,
            content: updatedContent
          };
        }
      }
      return section;
    }));
  };

  const getEmptyEntry = (type: string) => {
    switch (type) {
      case 'education':
        return {
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          gpa: ''
        };
      case 'experience':
        return {
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: ['']
        };
      case 'skills':
        return {
          category: '',
          items: ['']
        };
      case 'projects':
        return {
          name: '',
          description: '',
          technologies: [''],
          link: ''
        };
      case 'achievements':
        return {
          title: '',
          date: '',
          description: ''
        };
      default:
        return {};
    }
  };

  const renderSectionContent = (section: Section) => {
    switch (section.type) {
      case 'personal':
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={section.content.fullName || ''}
              onChange={(e) => handleUpdateEntry(section.id, 0, 'fullName', e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={section.content.email || ''}
              onChange={(e) => handleUpdateEntry(section.id, 0, 'email', e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={section.content.phone || ''}
              onChange={(e) => handleUpdateEntry(section.id, 0, 'phone', e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Location"
              value={section.content.location || ''}
              onChange={(e) => handleUpdateEntry(section.id, 0, 'location', e.target.value)}
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Professional Summary"
              value={section.content.summary || ''}
              onChange={(e) => handleUpdateEntry(section.id, 0, 'summary', e.target.value)}
              className="w-full p-2 border rounded"
              rows={4}
            />
          </div>
        );

      case 'education':
        return (
          <div className="space-y-4">
            {section.content.map((entry: Education, index: number) => (
              <div key={index} className="border p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">Education Entry {index + 1}</h4>
                  <button
                    onClick={() => handleDeleteEntry(section.id, index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Institution"
                    value={entry.institution}
                    onChange={(e) => handleUpdateEntry(section.id, index, 'institution', e.target.value)}
                    className="p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Degree"
                    value={entry.degree}
                    onChange={(e) => handleUpdateEntry(section.id, index, 'degree', e.target.value)}
                    className="p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Field of Study"
                    value={entry.field}
                    onChange={(e) => handleUpdateEntry(section.id, index, 'field', e.target.value)}
                    className="p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="GPA"
                    value={entry.gpa}
                    onChange={(e) => handleUpdateEntry(section.id, index, 'gpa', e.target.value)}
                    className="p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Start Date"
                    value={entry.startDate}
                    onChange={(e) => handleUpdateEntry(section.id, index, 'startDate', e.target.value)}
                    className="p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="End Date"
                    value={entry.endDate}
                    onChange={(e) => handleUpdateEntry(section.id, index, 'endDate', e.target.value)}
                    className="p-2 border rounded"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={() => handleAddEntry(section.id)}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
            >
              <Plus size={16} />
              Add Education
            </button>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-4">
            {section.content.map((entry: Experience, index: number) => (
              <div key={index} className="border p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">Experience Entry {index + 1}</h4>
                  <button
                    onClick={() => handleDeleteEntry(section.id, index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Company"
                    value={entry.company}
                    onChange={(e) => handleUpdateEntry(section.id, index, 'company', e.target.value)}
                    className="p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Position"
                    value={entry.position}
                    onChange={(e) => handleUpdateEntry(section.id, index, 'position', e.target.value)}
                    className="p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Start Date"
                    value={entry.startDate}
                    onChange={(e) => handleUpdateEntry(section.id, index, 'startDate', e.target.value)}
                    className="p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="End Date"
                    value={entry.endDate}
                    onChange={(e) => handleUpdateEntry(section.id, index, 'endDate', e.target.value)}
                    className="p-2 border rounded"
                  />
                </div>
                <div className="mt-4">
                  {entry.description.map((desc, descIndex) => (
                    <div key={descIndex} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Description point"
                        value={desc}
                        onChange={(e) => {
                          const newDescription = [...entry.description];
                          newDescription[descIndex] = e.target.value;
                          handleUpdateEntry(section.id, index, 'description', newDescription);
                        }}
                        className="flex-1 p-2 border rounded"
                      />
                      <button
                        onClick={() => {
                          const newDescription = entry.description.filter((_, i) => i !== descIndex);
                          handleUpdateEntry(section.id, index, 'description', newDescription);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newDescription = [...entry.description, ''];
                      handleUpdateEntry(section.id, index, 'description', newDescription);
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Add Description Point
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => handleAddEntry(section.id)}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
            >
              <Plus size={16} />
              Add Experience
            </button>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-4">
            {section.content.map((entry: Skill, index: number) => (
              <div key={index} className="border p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">Skill Category {index + 1}</h4>
                  <button
                    onClick={() => handleDeleteEntry(section.id, index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Category (e.g., Technical, Soft Skills)"
                  value={entry.category}
                  onChange={(e) => handleUpdateEntry(section.id, index, 'category', e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                />
                <div className="space-y-2">
                  {entry.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Skill"
                        value={item}
                        onChange={(e) => {
                          const newItems = [...entry.items];
                          newItems[itemIndex] = e.target.value;
                          handleUpdateEntry(section.id, index, 'items', newItems);
                        }}
                        className="flex-1 p-2 border rounded"
                      />
                      <button
                        onClick={() => {
                          const newItems = entry.items.filter((_, i) => i !== itemIndex);
                          handleUpdateEntry(section.id, index, 'items', newItems);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newItems = [...entry.items, ''];
                      handleUpdateEntry(section.id, index, 'items', newItems);
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Add Skill
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => handleAddEntry(section.id)}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
            >
              <Plus size={16} />
              Add Skill Category
            </button>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-4">
            {section.content.map((entry: Project, index: number) => (
              <div key={index} className="border p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">Project {index + 1}</h4>
                  <button
                    onClick={() => handleDeleteEntry(section.id, index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Project Name"
                    value={entry.name}
                    onChange={(e) => handleUpdateEntry(section.id, index, 'name', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <textarea
                    placeholder="Project Description"
                    value={entry.description}
                    onChange={(e) => handleUpdateEntry(section.id, index, 'description', e.target.value)}
                    className="w-full p-2 border rounded"
                    rows={4}
                  />
                  <input
                    type="text"
                    placeholder="Project Link"
                    value={entry.link}
                    onChange={(e) => handleUpdateEntry(section.id, index, 'link', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <div className="space-y-2">
                    {entry.technologies.map((tech, techIndex) => (
                      <div key={techIndex} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Technology"
                          value={tech}
                          onChange={(e) => {
                            const newTech = [...entry.technologies];
                            newTech[techIndex] = e.target.value;
                            handleUpdateEntry(section.id, index, 'technologies', newTech);
                          }}
                          className="flex-1 p-2 border rounded"
                        />
                        <button
                          onClick={() => {
                            const newTech = entry.technologies.filter((_, i) => i !== techIndex);
                            handleUpdateEntry(section.id, index, 'technologies', newTech);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newTech = [...entry.technologies, ''];
                        handleUpdateEntry(section.id, index, 'technologies', newTech);
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Add Technology
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => handleAddEntry(section.id)}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
            >
              <Plus size={16} />
              Add Project
            </button>
          </div>
        );

      case 'achievements':
        return (
          <div className="space-y-4">
            {section.content.map((entry: Achievement, index: number) => (
              <div key={index} className="border p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">Achievement {index + 1}</h4>
                  <button
                    onClick={() => handleDeleteEntry(section.id, index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Achievement Title"
                    value={entry.title}
                    onChange={(e) => handleUpdateEntry(section.id, index, 'title', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Date"
                    value={entry.date}
                    onChange={(e) => handleUpdateEntry(section.id, index, 'date', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <textarea
                    placeholder="Description"
                    value={entry.description}
                    onChange={(e) => handleUpdateEntry(section.id, index, 'description', e.target.value)}
                    className="w-full p-2 border rounded"
                    rows={4}
                  />
                </div>
              </div>
            ))}
            <button
              onClick={() => handleAddEntry(section.id)}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
            >
              <Plus size={16} />
              Add Achievement
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const renderPreview = () => {
    const personalSection = sections.find(s => s.type === 'personal');
    const personalInfo = personalSection?.content as PersonalInfo;

    return (
      <div className="bg-white p-8 rounded-lg shadow">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">{personalInfo.fullName}</h1>
          <p className="text-gray-600">{personalInfo.email}</p>
          <p className="text-gray-600">{personalInfo.phone}</p>
          <p className="text-gray-600">{personalInfo.location}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Professional Summary</h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </div>

        {sections.map(section => {
          if (section.type === 'personal') return null;
          
          return (
            <div key={section.id} className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
              {section.content.map((entry: any, index: number) => (
                <div key={index} className="mb-4">
                  {section.type === 'education' && (
                    <div>
                      <h3 className="font-semibold">{entry.degree} in {entry.field}</h3>
                      <p className="text-gray-600">{entry.institution}</p>
                      <p className="text-gray-600">{entry.startDate} - {entry.endDate}</p>
                      {entry.gpa && <p className="text-gray-600">GPA: {entry.gpa}</p>}
                    </div>
                  )}
                  
                  {section.type === 'experience' && (
                    <div>
                      <h3 className="font-semibold">{entry.position}</h3>
                      <p className="text-gray-600">{entry.company}</p>
                      <p className="text-gray-600">{entry.startDate} - {entry.endDate}</p>
                      <ul className="list-disc list-inside mt-2">
                        {entry.description.map((desc: string, i: number) => (
                          <li key={i} className="text-gray-700">{desc}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {section.type === 'skills' && (
                    <div>
                      <h3 className="font-semibold">{entry.category}</h3>
                      <p className="text-gray-700">{entry.items.join(', ')}</p>
                    </div>
                  )}
                  
                  {section.type === 'projects' && (
                    <div>
                      <h3 className="font-semibold">{entry.name}</h3>
                      <p className="text-gray-700">{entry.description}</p>
                      <p className="text-gray-600">Technologies: {entry.technologies.join(', ')}</p>
                      {entry.link && (
                        <a href={entry.link} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                          View Project
                        </a>
                      )}
                    </div>
                  )}
                  
                  {section.type === 'achievements' && (
                    <div>
                      <h3 className="font-semibold">{entry.title}</h3>
                      <p className="text-gray-600">{entry.date}</p>
                      <p className="text-gray-700">{entry.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Resume Builder</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setIsPreview(!isPreview)}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isPreview ? <Edit2 size={20} /> : <Eye size={20} />}
            {isPreview ? 'Edit' : 'Preview'}
          </button>
          <button
            onClick={() => {/* Handle download */}}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded"
          >
            <Download size={20} />
            Download Resume
          </button>
        </div>
      </div>

      {isPreview ? (
        renderPreview()
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-4">Sections</h3>
              <div className="space-y-2">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left p-2 rounded ${
                      activeSection === section.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-6">
              {sections.map(section => (
                <div
                  key={section.id}
                  className={activeSection === section.id ? 'block' : 'hidden'}
                >
                  <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                  {renderSectionContent(section)}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;