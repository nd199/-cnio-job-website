import { MoreVertical, SearchIcon, X } from 'lucide-react';
import { useState } from 'react';
import Message from './Message';

const PmScreen = ({ setShowMessages }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Newest');
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const handleSearchEvents = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setShowMoreMenu(false);
    //TODO: Add any sorting logic here, or pass event up if needed
  };

  return (
    <div className="w-full md:w-[450px] lg:w-[450px] h-full absolute right-0 bg-white shadow-md z-40 flex flex-col min-h-0">
      <div className="w-full flex justify-between items-center py-4 px-2 border-b-2 border-gray-200 relative">
        <span className="flex flex-[0.3]">
          <X
            className="cursor-pointer hover:text-primaryHover"
            onClick={() => setShowMessages(false)}
          />
        </span>
        <div className="flex flex-[2] items-center justify-between border-2 border-black hover:border-primaryHover rounded-2xl p-2">
          <SearchIcon className="text-black hover:text-primaryHover text-xl m-0 p-0 cursor-pointer" />
          <input
            className="bg-transparent border-none outline-none ml-2 w-full"
            placeholder="Search Conversation..."
            value={searchTerm}
            onChange={handleSearchEvents}
          />
        </div>
        <MoreVertical
          className="m-0 flex-[0.3] ml-2 cursor-pointer"
          onClick={() => setShowMoreMenu((prev) => !prev)}
        />
        {showMoreMenu && (
          <div className="w-[200px] h-[auto] bg-white absolute top-14 right-7 rounded-sm border border-gray-300 shadow-lg p-4 flex flex-col items-center justify-center gap-4">
            <div className="w-full flex items-start justify-center flex-col">
              <label htmlFor="sortBy" className="block text-sm font-semibold mb-2">
                Sort By
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={handleSortChange}
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Newest</option>
                <option>Oldest</option>
              </select>
            </div>
            <div className="w-full flex items-center justify-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" onClick={() => setShowMoreMenu(false)} />
                Mute notifications
              </label>
            </div>
            <button
              className="w-full bg-blue-600 text-white rounded-md py-1 hover:bg-blue-700 transition"
              onClick={() => setShowMoreMenu(false)}
            >
              Mark all as read
            </button>
            <button
              className="w-full bg-red-600 text-white rounded-md py-1 hover:bg-red-700 transition"
              onClick={() => setShowMoreMenu(false)}
            >
              Clear chat history
            </button>
          </div>
        )}
      </div>
      <div className="w-full border-b-2 border-gray-200">
        <ul className="flex justify-evenly gap-2 p-3 text-sm text-gray-800">
          {['Jobs', 'Unread', 'Drafts', 'Starred'].map((tab) => (
            <li
              key={tab}
              className="border-[2px] border-primary rounded-md px-2 py-1 hover:border-green-800 cursor-pointer"
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 overflow-y-auto py-2 px-2">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
    </div>
  );
};

export default PmScreen;
