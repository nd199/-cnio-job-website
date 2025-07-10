import { ArrowUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const AIMaxScreen = ({ aiMaxScreen, setAiMaxScreen }) => {
  const [messages, setMessages] = useState([
    { text: 'Welcome! Ask me anything about jobs, tech, or career guidance.', sender: 'ai' },
    { text: 'What are some React jobs in Bangalore?', sender: 'user' },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { text: input.trim(), sender: 'user' }];
    setMessages(newMessages);
    setInput('');
    // Optional: Add simulated AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: input.trim(), sender: 'user' },
        {
          text: "Here's a React job: Frontend Developer at TechMahindra, Bangalore.",
          sender: 'ai',
        },
      ]);
    }, 800);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!aiMaxScreen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
      <div className="w-full max-w-[1000px] h-[90%] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center bg-white">
          <h2 className="text-lg font-bold">AI Assistant</h2>
          <button
            onClick={() => setAiMaxScreen(false)}
            className="text-gray-600 hover:text-black font-medium"
          >
            Close
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-slate-800 text-white p-4 space-y-2 overflow-y-auto text-sm">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`p-2 rounded-md max-w-[75%] break-words whitespace-pre-wrap ${
                  msg.sender === 'user' ? 'bg-green-500 text-black' : 'bg-slate-600 text-white'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t bg-white">
          <div className="flex items-center gap-2 rounded-md border px-3 py-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              type="text"
              placeholder="Type your message..."
              className="w-full bg-transparent outline-none text-sm text-black"
            />
            <button
              onClick={sendMessage}
              className="bg-slate-200 w-7 h-7 rounded-full flex items-center justify-center"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMaxScreen;
