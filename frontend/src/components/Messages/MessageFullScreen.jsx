import { X } from 'lucide-react';
import { useRef, useState } from 'react';

const EMOJIS = ['😀', '😂', '😊', '😍', '😎', '😢', '👍', '🙏', '🔥', '💯', '🎉', '🚀'];

const MessageFullScreen = ({ message, onClose }) => {
  const [reply, setReply] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [files, setFiles] = useState([]);
  const textAreaRef = useRef(null);

  const handleSend = () => {
    console.log('Reply sent:', reply);
    console.log('Files:', files);
    setReply('');
    setFiles([]);
    setShowEmojiPicker(false);
  };

  const addEmoji = (emoji) => {
    const el = textAreaRef.current;
    if (!el) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const newText = reply.slice(0, start) + emoji + reply.slice(end);

    setReply(newText);

    setTimeout(() => {
      el.selectionStart = el.selectionEnd = start + emoji.length;
      el.focus();
    }, 0);
  };

  const onFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  if (!message) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-md p-4">
      <div className="relative w-full max-w-4xl max-h-[70vh] h-full bg-gray-900 rounded-xl shadow-xl p-6 overflow-y-auto flex flex-col">
        <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-2">
          <h2 className="text-xl font-bold text-gray-200 truncate max-w-[80%]">
            {message.subject}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
            aria-label="Close message"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-scroll space-y-6 text-gray-300 leading-relaxed whitespace-pre-wrap mb-4">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <img
                src="https://via.placeholder.com/40"
                alt="Sender"
                className="w-8 h-8 rounded-full border border-white/30"
              />
              <div className="bg-gray-800 p-4 rounded-lg w-fit max-w-[70%]">
                <p className="text-gray-400 text-sm mb-1">
                  {message.sender} • {message.date}
                </p>
                <p className="text-gray-300">{message.desc}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="flex items-start gap-3">
                <div className="bg-cyan-700 text-white p-4 rounded-lg w-fit max-w-[70%]">
                  <p className="text-sm">Sure, I’ll get back to you shortly.</p>
                </div>
                <img
                  src="https://via.placeholder.com/40"
                  alt="User"
                  className="w-8 h-8 rounded-full border border-white/30"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4 flex flex-col gap-2 relative">
          <div className="flex items-center gap-2 relative w-full">
            <textarea
              ref={textAreaRef}
              className="flex-1 resize-none rounded-md bg-gray-800 text-gray-200 p-3 pr-12 outline-none placeholder-gray-500 focus:ring-2 focus:ring-cyan-500"
              rows={3}
              placeholder="Type your reply..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowEmojiPicker((v) => !v)}
              className="absolute right-10 top-3 text-xl text-gray-400 hover:text-cyan-500 transition"
              aria-label="Toggle emoji picker"
              title="Emoji Picker"
            >
              😊
            </button>

            <label
              htmlFor="file-upload"
              className="cursor-pointer text-gray-400 hover:text-cyan-500 transition ml-2"
              title="Attach files"
            >
              📎
            </label>
            <input
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              onChange={onFileChange}
            />

            <button
              onClick={handleSend}
              disabled={!reply.trim() && files.length === 0}
              className={`px-5 py-2 rounded-md font-semibold text-white transition ml-2 ${
                reply.trim() || files.length > 0
                  ? 'bg-cyan-600 hover:bg-cyan-700'
                  : 'bg-cyan-600/50 cursor-not-allowed'
              }`}
            >
              Send
            </button>
          </div>

          {showEmojiPicker && (
            <div className="absolute bottom-[100px] right-[60px] z-50 bg-gray-800 p-3 rounded shadow-lg grid grid-cols-6 gap-2 w-60 select-none">
              {EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    addEmoji(emoji);
                    setShowEmojiPicker(false);
                  }}
                  className="text-2xl hover:bg-gray-700 rounded"
                  type="button"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          {files.length > 0 && (
            <div className="text-gray-300 text-sm mt-1 space-y-1 max-h-24 overflow-y-auto">
              {files.map((file, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span>📄</span>
                  <span className="truncate max-w-xs">{file.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageFullScreen;
