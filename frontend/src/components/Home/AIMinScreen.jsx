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
    <div className="flex flex-col w-full h-full relative">
      <div className="w-full flex justify-between items-center px-3 py-2 bg-slate-100 rounded-t-md border-b">
        <h2 className="text-base font-semibold text-gray-800">AI Job Assistant</h2>
        <div className="flex items-center gap-2">
          <Info
            className="cursor-pointer text-gray-500 hover:text-blue-600 transition"
            onClick={AiInfoHandler}
          />
          <Maximize2
            className="cursor-pointer text-gray-600 hover:text-black transition"
            onClick={() => setAiMaxScreen(true)}
          />
        </div>
      </div>

      {aiInfo && (
        <div className="h-36 text-xs text-gray-700 bg-blue-50 mx-1 px-3 py-2 border-b border-blue-200 overflow-y-auto rounded-b-md absolute top-10 z-20">
          🤖 <strong>This AI assistant</strong> is designed to help you with job-related queries —
          including resume tips, career advice, interview preparation, and job search guidance.{' '}
          <br />
          <br />
          It can also <strong>automatically filter jobs</strong> in your feed based on your query.{' '}
          <br />
          Try typing something like:{' '}
          <span className="text-blue-600 italic">"React fresher jobs posted today"</span> to begin!
        </div>
      )}

      {/* Chat Body */}
      <div className="w-full bg-slate-800 h-[450px] rounded-b-lg flex flex-col items-center relative px-3 py-2">
        <div className="flex-1 w-full overflow-y-auto text-white text-sm space-y-3 pr-1 pb-12">
          <div className="text-gray-300 italic">Hi! How may I help you today?</div>

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
            className="w-full bg-transparent outline-none text-sm text-black placeholder:text-gray-400"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-100 hover:bg-blue-200 w-7 h-7 rounded-full flex items-center justify-center transition"
          >
            <ArrowUp size={16} className="text-blue-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIMinScreen;
