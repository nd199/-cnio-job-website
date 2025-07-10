import { LucideArrowBigDownDash } from 'lucide-react';
import { useState } from 'react';
import AIMaxScreen from '../components/AIMaxScreen';
import AIMinScreen from '../components/AIMinScreen';
import HomeCenter from '../components/HomeCenter';

const Home = () => {
  const [expand, setExpand] = useState(false);
  const [aiMaxScreen, setAiMaxScreen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you today?', sender: 'ai' },
    {
      text: 'Show React jobs in Bangalore',
      sender: 'user',
    },
  ]);
  const [input, setInput] = useState('');
  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
    // Simulate AI response later if needed
  };

  return (
    <div className="w-[calc(100%-0.8rem)] mx-auto border-x-2 flex rounded-lg flex-col gap-4 h-[100vh] bg-gray-100 relative">
      <div className="flex flex-row gap-4">
        {/* left */}
        <div className="flex-[1.8] max-w-[400px] rounded-lg flex items-center flex-col gap-4 h-auto">
          <div className="mt-2 w-full max-h-[500px] bg-white rounded-lg shadow-2xl font-bold">
            <div className="w-full text-lg shadow-sm bg-transparent flex flex-col items-center justify-center">
              {/* Header */}
              <AIMinScreen
                setAiMaxScreen={setAiMaxScreen}
                setInput={setInput}
                input={input}
                sendMessage={sendMessage}
                messages={messages}
              />
            </div>
          </div>
          {expand ? (
            <div className="w-full h-[190px] bg-white rounded-lg shadow-2xl relative">
              <div className="bg-white p-4 font-bold rounded-lg">Sort / Tags</div>
              <LucideArrowBigDownDash
                className="w-full absolute -bottom-4 animate-bounce size-6 cursor-pointer"
                onClick={() => setExpand(!expand)}
              />
            </div>
          ) : (
            <div className="w-full h-[100px] bg-white rounded-lg shadow-2xl relative">
              <div className="bg-white p-4 font-bold rounded-lg">Sort / Tags</div>
              <LucideArrowBigDownDash
                className="w-full absolute -bottom-4 animate-bounce size-6 cursor-pointer"
                onClick={() => setExpand(!expand)}
              />
            </div>
          )}
          <div className="w-full h-[100px] bg-white rounded-lg shadow-2xl relative">
            <div className="bg-white p-4 font-bold rounded-lg"></div>
          </div>
        </div>
        {/* center */}
        <HomeCenter />
        {/* right */}
        <div className="mt-2 flex-[1.8] max-w-[400px] rounded-lg overflow-y-auto h-auto">
          <div className="p-4 h-[460px] font-bold shadow-2xl bg-white rounded-lg">
            <div className="font-bold text-lg">News & Feed</div>
          </div>
        </div>
      </div>
      <div className=" w-full pt-4">
        <div className="bg-white p-4 rounded-md shadow">Learning Paths</div>
      </div>
      <AIMaxScreen aiMaxScreen={aiMaxScreen} setAiMaxScreen={setAiMaxScreen} />
    </div>
  );
};

export default Home;
