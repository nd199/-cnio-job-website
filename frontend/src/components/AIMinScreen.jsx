import { ArrowUp, Maximize2 } from 'lucide-react';

const AIMinScreen = ({ setAiMaxScreen, setInput, input, sendMessage, messages }) => {
  return (
    <>
      <div className="w-full flex justify-between items-center px-2 py-2">
        <div>Ai Assistant</div>
        <div className="relative group">
          <Maximize2 className="cursor-pointer" onClick={() => setAiMaxScreen(true)} />
          <div className="absolute -top-8 right-0 bg-black text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
            Expand Assistant
          </div>
        </div>
      </div>
      <div className="w-full bg-slate-700 h-[450px] rounded-lg flex flex-col items-center relative px-2 py-2">
        <div className="flex-1 w-full overflow-y-auto text-white text-sm space-y-2 pr-1">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`w-full flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`p-2 rounded-md max-w-[80%] break-words whitespace-pre-wrap overflow-hidden
                  overflow-wrap: anywhere word-break: break-word ${
                    message.sender === 'user' ? 'bg-green-500' : 'bg-slate-600'
                  }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
        {/* Input Bar */}
        <div className="w-[95%] bg-white rounded-md h-[42px] flex items-center gap-2 absolute bottom-2 px-3">
          <input
            type="text"
            placeholder="May I help you?.."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-transparent outline-none text-sm"
          />
          <button
            onClick={sendMessage}
            className="bg-slate-200 w-6 h-6 rounded-full flex items-center justify-center"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

export default AIMinScreen;
