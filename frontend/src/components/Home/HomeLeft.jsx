import { LucideArrowBigDownDash } from 'lucide-react';
import { useState } from 'react';
import GroqClient from '../../api/groqClient';
import AIMaxScreen from './AIMaxScreen';
import AIMinScreen from './AIMinScreen';

const HomeLeft = () => {
  const [aiMaxScreen, setAiMaxScreen] = useState(false);
  const [expand, setExpand] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');
    try {
      const response = await GroqClient.post('/chat/completions', {
        model: 'llama3-70b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful job assistant that answers clearly and smartly.',
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
        <div className="w-full text-lg shadow-sm bg-transparent flex flex-col items-center justify-center">
          {/* Header */}
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
