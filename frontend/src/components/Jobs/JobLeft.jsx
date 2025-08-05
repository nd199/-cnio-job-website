import 'rc-slider/assets/index.css';
import { useState } from 'react';
import GroqClient from '../../api/groqClient';
import { indianCities } from '../../lib/lib';
import { useBlockedWords } from '../../utils/useBlockedWords';
import AIMaxScreen from './AIMaxScreen';
import AIMinScreen from './AIMinScreen';
import SortMaxScreen from './SortMaxScreen';
import SortMinScreen from './SortMinScreen';

const JobLeft = ({ filters, setFilters }) => {
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
        { text: 'Sorry, something went wrong with AI.', sender: 'ai Try again..' },
      ]);
    }
  };

  return (
    <>
      <div className="xs:hidden md:flex lg:flex flex-[1.8] max-w-[420px] rounded-2xl bg-white/60 backdrop-blur-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 p-4 gap-6 flex-col items-center h-auto transition-all duration-500">
        <div className="w-full max-h-[500px] bg-white/70 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl transition-all duration-300">
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
          <SortMaxScreen
            filters={filters}
            setFilters={setFilters}
            locationInput={locationInput}
            filteredCities={filteredCities}
            setLocationInput={setLocationInput}
            setFilteredCities={setFilteredCities}
            indianCities={indianCities}
            setExpand={setExpand}
            expand={expand}
          />
        ) : (
          <SortMinScreen
            filters={filters}
            setFilters={setFilters}
            setExpand={setExpand}
            expand={expand}
          />
        )}
        <div className="w-full h-[190px] bg-white/50 backdrop-blur-md rounded-2xl shadow-md border border-white/20">
          <div className="p-4 font-bold bg-white rounded-lg"></div>
        </div>
      </div>
      {aiMaxScreen && (
        <AIMaxScreen
          aiMaxScreen={aiMaxScreen}
          setAiMaxScreen={setAiMaxScreen}
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          messages={messages}
        />
      )}
    </>
  );
};

export default JobLeft;
