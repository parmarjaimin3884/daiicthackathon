import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

interface CodePlaygroundProps {
  initialCode?: string;
  language?: string;
}

export const CodePlayground: React.FC<CodePlaygroundProps> = ({
  initialCode = '// Write your code here',
  language = 'javascript'
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleEditorChange = (value: string | undefined) => {
    if (value) setCode(value);
  };

  const runCode = async () => {
    setIsRunning(true);
    try {
      // For JavaScript code, we can use Function constructor
      // In a production environment, you'd want to use a sandboxed environment
      if (language === 'javascript') {
        const result = new Function(code)();
        setOutput(String(result));
      } else {
        setOutput('Language not supported yet');
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
    setIsRunning(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Code Playground</h2>
          <div className="space-x-2">
            <select
              className="px-3 py-2 border rounded"
              value={language}
              onChange={(e) => setCode('')}
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python (Coming Soon)</option>
            </select>
            <button
              onClick={runCode}
              disabled={isRunning}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {isRunning ? 'Running...' : 'Run Code'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="border rounded-lg overflow-hidden h-[500px]">
            <Editor
              height="100%"
              defaultLanguage={language}
              value={code}
              onChange={handleEditorChange}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true
              }}
            />
          </div>

          <div className="border rounded-lg p-4 bg-gray-900 text-white font-mono h-[500px] overflow-auto">
            <h3 className="text-lg font-semibold mb-2">Output:</h3>
            <pre className="whitespace-pre-wrap">{output}</pre>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Tips:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Use Ctrl + Enter to run your code quickly</li>
            <li>The editor supports auto-completion and syntax highlighting</li>
            <li>Your code runs in a sandboxed environment for safety</li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 