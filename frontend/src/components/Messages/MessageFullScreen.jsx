import { X } from 'lucide-react';

const MessageFullScreen = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="relative w-[90%] max-w-[600px] max-h-[80%] bg-white rounded-xl shadow-xl p-6 overflow-y-auto animate-fadeIn">
        <button onClick={onClose} className="absolute text-gray-500 top-3 right-3 hover:text-black">
          <X className="w-6 h-6" />
        </button>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-gray-800">{message.subject}</h2>
          <p className="text-sm text-gray-500">
            {message.sender} • {message.date}
          </p>
          <hr />
          <p className="leading-relaxed text-gray-700 whitespace-pre-line">{message.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageFullScreen;
