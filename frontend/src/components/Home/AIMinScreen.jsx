import { ArrowUp, Info, Maximize2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const AIMinScreen = ({ setAiMaxScreen, setInput, input, sendMessage, messages }) => {
  const messagesEndRef = useRef(null);
  const [aiInfo, setAiInfo] = useState(false);
  const timeOutRef = useRef(null);

  const AiInfoHandler = () => {
    setAiInfo((prev) => {
      const next = !prev;
      if (next) {
        timeOutRef.current = setTimeout(() => {
          setAiInfo(false);
        }, 5000);
      } else {
        clearTimeout(timeOutRef.current);
      }
      return next;
    });
  };

  useEffect(() => {
    return () => clearTimeout(timeOutRef.current);
  }, []);

  return (
    <div className="relative flex flex-col w-full h-full">
      <div className="flex items-center justify-between w-full px-3 py-2 border-b bg-slate-100 rounded-t-md">
        <h2 className="text-base font-semibold text-gray-800">AI Job Assistant</h2>
        <div className="flex items-center gap-2">
          <Info
            className="text-gray-500 transition cursor-pointer hover:text-blue-600"
            onClick={AiInfoHandler}
          />
          <Maximize2
            className="text-gray-600 transition cursor-pointer hover:text-black"
            onClick={() => setAiMaxScreen(true)}
          />
        </div>
      </div>

      {aiInfo && (
        <div className="absolute z-20 px-3 py-2 mx-1 overflow-y-auto text-xs text-gray-700 border-b border-blue-200 h-36 bg-blue-50 rounded-b-md top-10">
          🤖 <strong>This AI assistant</strong> is designed to help you with job-related queries —
          including resume tips, career advice, interview preparation, and job search guidance.{' '}
          <br />
          <br />
          It can also <strong>automatically filter jobs</strong> in your feed based on your query.{' '}
          <br />
          Try typing something like:{' '}
          <span className="italic text-blue-600">"React fresher jobs posted today"</span> to begin!
        </div>
      )}

      <div className="w-full bg-slate-800 h-[450px] rounded-b-lg flex flex-col items-center relative px-3 py-2">
        <div className="flex-1 w-full pb-12 pr-1 space-y-3 overflow-y-auto text-sm text-white">
          <div className="flex flex-col items-start justify-start text-lg italic text-gray-300">
            <span>Hi! How may I help you today?</span>
            <p>Click the above Info button for more details</p>
          </div>
          {messages?.map((message, index) => (
            <div
              key={index}
              className={`w-full flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`p-2 rounded-lg max-w-[80%] whitespace-pre-wrap overflow-hidden shadow-md ${
                  message.sender === 'user' ? 'bg-green-400 text-black' : 'bg-slate-600 text-white'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="w-[95%] bg-white rounded-full h-[44px] flex items-center gap-2 absolute bottom-2 px-4 shadow-lg">
          <input
            type="text"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && input.trim()) {
                sendMessage();
              }
            }}
            className="w-full text-sm text-black bg-transparent outline-none placeholder:text-gray-400"
          />
          <button
            onClick={sendMessage}
            className="flex items-center justify-center transition bg-blue-100 rounded-full hover:bg-blue-200 w-7 h-7"
          >
            <ArrowUp size={16} className="text-blue-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIMinScreen;
