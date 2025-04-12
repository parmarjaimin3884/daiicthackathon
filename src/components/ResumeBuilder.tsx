import React, { useState } from 'react';
import { Plus, Download, Trash2 } from 'lucide-react';

interface Entry {
  id: string;
  title: string;
  description: string;
}

const ResumeBuilder: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  const handleAddEntry = () => {
    const newEntry: Entry = {
      id: Date.now().toString(),
      title: '',
      description: ''
    };
    setEntries([...entries, newEntry]);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const handleUpdateEntry = (id: string, field: keyof Entry, value: string) => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Resume Builder</h2>
        <button
          onClick={handleAddEntry}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          <Plus size={20} />
          Add Section
        </button>
      </div>

      {entries.map(entry => (
        <div key={entry.id} className="mb-4 p-4 border rounded">
          <div className="flex justify-between items-center mb-2">
            <input
              type="text"
              value={entry.title}
              onChange={(e) => handleUpdateEntry(entry.id, 'title', e.target.value)}
              placeholder="Section Title"
              className="text-xl font-semibold border-b-2 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={() => handleDeleteEntry(entry.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
          </div>
          <textarea
            value={entry.description}
            onChange={(e) => handleUpdateEntry(entry.id, 'description', e.target.value)}
            placeholder="Enter your content here..."
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            rows={4}
          />
        </div>
      ))}

      <button
        onClick={() => {/* Handle download */}}
        className="mt-4 flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded"
      >
        <Download size={20} />
        Download Resume
      </button>
    </div>
  );
};

export default ResumeBuilder;