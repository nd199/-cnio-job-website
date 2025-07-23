import { LucideArrowBigDownDash } from 'lucide-react';
import { useState } from 'react';
import GroqClient from '../../api/groqClient';
import { useBlockedWords } from '../../utils/useBlockedWords';
import AIMaxScreen from './AIMaxScreen';
import AIMinScreen from './AIMinScreen';

const HomeLeft = ({ filters, setFilters }) => {
  const indianCities = [
    'Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad',
    'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat',
    'Coimbatore', 'Indore', 'Lucknow', 'Nagpur', 'Visakhapatnam',
    'Bhopal', 'Patna', 'Thane', 'Vadodara', 'Ludhiana',
    'Nashik', 'Rajkot', 'Madurai', 'Kanpur', 'Agra'
  ];
  const [locationInput, setLocationInput] = useState('');
  const [filteredCities, setFilteredCities] = useState(indianCities);

  const blockedWords = useBlockedWords();
  const [aiMaxScreen, setAiMaxScreen] = useState(false);
  const [expand, setExpand] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const inputLower = input.trim().toLowerCase();
    const containsBlockedWord = blockedWords.some((word) =>
      inputLower.includes(word.toLowerCase())
    );
    if (containsBlockedWord) {
      setMessages((prev) => [
        ...prev,
        {
          text: 'Sorry, this assistant only answers job and career-related questions.',
          sender: 'ai',
        },
      ]);
      return;
    }

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');
    try {
      const response = await GroqClient.post('/chat/completions', {
        model: 'llama3-70b-8192',
        messages: [
          {
            role: 'system',
            content: `You are a helpful job assistant on a job platform that answers clearly and smartly.
             You must **only** answer questions related to:
             - job search
             - career advice,
             - resume/interview tips,
             - job notifications,
             - job skills or preparation.
             If the user asks about anything unrelated (like politics, relationships, religion, hacking, or personal opinions), politely say:
            "I'm here to assist only with job and career-related queries. Please ask me about jobs, careers, or learning paths."`,
          },
          ...messages.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text,
          })),
          { role: 'user', content: input },
        ],
      });

      const aiReply = response.data.choices[0].message.content;
      setMessages((prev) => [...prev, { text: aiReply, sender: 'ai' }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages((prev) => [
        ...prev,
        { text: 'Sorry, something went wrong with AI.', sender: 'ai' },
      ]);
    }
  };

  return (
    <div className="flex-[1.8] max-w-[400px] rounded-lg flex items-center flex-col gap-4 h-auto">
      <div className="mt-2 w-full max-h-[500px] bg-white rounded-lg shadow-2xl font-bold">
        <div className="flex flex-col items-center justify-center w-full text-lg bg-transparent shadow-sm">
          <AIMinScreen
            aiMaxScreen={aiMaxScreen}
            setAiMaxScreen={setAiMaxScreen}
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
            messages={messages}
          />
        </div>
      </div>
      {expand ? (
        <div className="relative w-full h-auto p-4 space-y-3 bg-white rounded-lg shadow-2xl">
          <div className="text-lg font-bold">Sort / Tags</div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Experience Level</label>
            <input
              type="range"
              min="0"
              max="15"
              value={filters.experience}
              onChange={(e) =>
                setFilters({ ...filters, experience: parseInt(e.target.value) })
              }
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Job Type</label>
            <select
              value={filters.jobType}
              onChange={(e) =>
                setFilters({ ...filters, jobType: e.target.value })
              }
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Remote Options</label>
            <div className="flex gap-4">
              <label>
                <input
                  type="checkbox"
                  checked={filters.remoteOptions.includes('Remote')}
                  onChange={(e) => {
                    const updated = e.target.checked
                      ? [...filters.remoteOptions, 'Remote']
                      : filters.remoteOptions.filter((opt) => opt !== 'Remote');
                    setFilters({ ...filters, remoteOptions: updated });
                  }}
                  className="mr-2"
                />
                Remote
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filters.remoteOptions.includes('On-site')}
                  onChange={(e) => {
                    const updated = e.target.checked
                      ? [...filters.remoteOptions, 'On-site']
                      : filters.remoteOptions.filter((opt) => opt !== 'On-site');
                    setFilters({ ...filters, remoteOptions: updated });
                  }}
                  className="mr-2"
                />
                On-site
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filters.remoteOptions.includes('Hybrid')}
                  onChange={(e) => {
                    const updated = e.target.checked
                      ? [...filters.remoteOptions, 'Hybrid']
                      : filters.remoteOptions.filter((opt) => opt !== 'Hybrid');
                    setFilters({ ...filters, remoteOptions: updated });
                  }}
                  className="mr-2"
                />
                Hybrid
              </label>
            </div>
          </div>
          <div className="relative space-y-2">
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={locationInput}
              onChange={(e) => {
                const val = e.target.value;
                setLocationInput(val);
                setFilters({ ...filters, location: val });
                setFilteredCities(
                  indianCities.filter((city) =>
                    city.toLowerCase().includes(val.toLowerCase())
                  )
                );
              }}
              placeholder="Type a city, state or country"
              className="w-full p-2 border rounded"
            />
            {locationInput && (
              <ul className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border rounded shadow-lg max-h-48">
                {filteredCities.map((city) => (
                  <li
                    key={city}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setLocationInput(city);
                      setFilters({ ...filters, location: city });
                    }}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <LucideArrowBigDownDash
            className="absolute w-full cursor-pointer -bottom-4 animate-bounce size-6"
            onClick={() => setExpand(!expand)}
          />
        </div>
      ) : (
        <div className="w-full h-[100px] bg-white rounded-lg shadow-2xl relative p-4">
          <div className="text-lg font-bold">Sort / Tags</div>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">Experience</label>
            <input
              type="range"
              min="0"
              max="15"
              value={filters.experience}
              onChange={(e) =>
                setFilters({ ...filters, experience: parseInt(e.target.value) })
              }
              className="w-full"
            />
          </div>
          <LucideArrowBigDownDash
            className="absolute w-full cursor-pointer -bottom-4 animate-bounce size-6"
            onClick={() => setExpand(!expand)}
          />
        </div>
      )}
      <div className="w-full h-[190px] bg-white rounded-lg shadow-2xl relative">
        <div className="p-4 font-bold bg-white rounded-lg"></div>
      </div>
      <AIMaxScreen
        aiMaxScreen={aiMaxScreen}
        setAiMaxScreen={setAiMaxScreen}
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        messages={messages}
      />
    </div>
  );
};

export default HomeLeft;
