import { Star, Trash2 } from 'lucide-react';
import { useState } from 'react';
import MessageFullScreen from './MessageFullScreen';

const Message = ({ message, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [starred, setStarred] = useState(message?.isStarred);

  return (
    <>
      <div
        className={`w-full h-[160px] flex items-center gap-4 px-4 py-2
          rounded-xl transition-all duration-200 ease-in-out
          cursor-pointer border
          ${message.isUnread ? 'bg-cyan-700 border-cyan-600' : 'bg-gray-800 border-gray-700'}
          shadow-md hover:shadow-lg hover:bg-cyan-800
        `}
        onClick={() => setExpanded(true)}
      >
        <div className="flex flex-[0.5] flex-col gap-4">
          <img
            src={`https://picsum.photos/${Math.floor(Math.random() * 1000)}`}
            alt="profile"
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="flex gap-1 -ml-3">
            <Star
              className={`w-6 h-6 cursor-pointer ${
                starred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setStarred(!starred);
              }}
            />
            <Trash2
              className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-700"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(message.id);
              }}
            />
          </div>
        </div>

        <div className="ml-0 w-full h-full flex flex-col justify-evenly border-b-2 border-gray-600 flex-[2] xs:ml-4">
          <div className="flex flex-col justify-between">
            <div className="flex justify-between">
              <p className="text-lg font-bold text-gray-200">{message?.sender}</p>
              <p className="text-sm text-gray-400">{message?.date}</p>
            </div>
            <p className="text-sm font-bold text-gray-300">{message?.subject}</p>
          </div>
          <p className="text-sm line-clamp-2 xs:line-clamp-3 sm:line-clamp-3 text-gray-300">
            {message?.desc}
          </p>
        </div>
      </div>
      {expanded && <MessageFullScreen message={message} onClose={() => setExpanded(false)} />}
    </>
  );
};

export default Message;
