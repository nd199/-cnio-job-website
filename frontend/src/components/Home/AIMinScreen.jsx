import { ArrowUp, Maximize2 } from 'lucide-react';
import { useEffect, useRef } from 'react';

const AIMinScreen = ({ setAiMaxScreen, setInput, input, sendMessage, messages }) => {
  const messagesEndRef = useRef(null);

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* Header */}
      <div className="w-full flex justify-between items-center px-2 py-2">
        <h2 className="text-sm font-semibold">Ai Assistant</h2>
        <div className="relative group">
          <Maximize2
            className="cursor-pointer text-gray-600 hover:text-black transition"
            onClick={() => setAiMaxScreen(true)}
          />
          <div className="absolute -top-8 right-0 bg-black text-white text-xs px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
            Expand Assistant
          </div>
        </div>
      </div>

      {/* Chat Body */}
      <div className="w-full bg-slate-700 h-[450px] rounded-lg flex flex-col items-center relative px-2 py-2">
        <div className="flex-1 w-full overflow-y-auto text-white text-sm space-y-2 pr-1 pb-12">
          {messages?.map((message, index) => (
            <div
              key={index}
              className={`w-full flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`p-2 rounded-md max-w-[80%] break-words whitespace-pre-wrap overflow-hidden ${
                  message.sender === 'user' ? 'bg-green-500 text-black' : 'bg-slate-600 text-white'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="w-[95%] bg-white rounded-md h-[42px] flex items-center gap-2 absolute bottom-2 px-3 shadow-sm">
          <input
            type="text"
            placeholder="May I help you?.."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && input.trim()) {
                sendMessage();
              }
            }}
            className="w-full bg-transparent outline-none text-sm text-black"
          />
          <button
            onClick={sendMessage}
            className="bg-slate-200 hover:bg-slate-300 w-6 h-6 rounded-full flex items-center justify-center transition"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

export default AIMinScreen;
