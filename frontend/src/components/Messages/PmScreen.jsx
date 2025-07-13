import { MoreVertical, SearchIcon, X } from 'lucide-react';
import { useState } from 'react';
import { messages } from '../../lib/lib';
import Message from './Message';

const PmScreen = ({ setShowMessages }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Newest');
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [messageCategory, setMessageCategory] = useState('All');

  const getCategory = (category) => {
    if (category === 'Unread') return messages.filter((msg) => msg.type === 'Unread');
    if (category === 'Starred') return messages.filter((msg) => msg.type === 'Starred');
    if (category === 'Drafts') return messages.filter((msg) => msg.type === 'Drafts');
    if (category === 'Interview') return messages.filter((msg) => msg.type === 'Interview');
    if (category === 'Jobs') return messages.filter((msg) => msg.type === 'Jobs');
    return messages;
  };

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
      <div className="relative flex items-center justify-between w-full px-2 py-4 border-b-2 border-gray-200">
        <span className="flex flex-[0.3]">
          <X
            className="cursor-pointer hover:text-primaryHover"
            onClick={() => setShowMessages(false)}
          />
        </span>
        <div className="flex flex-[2] items-center justify-between border-2 border-black hover:border-primaryHover rounded-2xl p-2">
          <SearchIcon className="p-0 m-0 text-xl text-black cursor-pointer hover:text-primaryHover" />
          <input
            className="w-full ml-2 bg-transparent border-none outline-none"
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
            <div className="flex flex-col items-start justify-center w-full">
              <label htmlFor="sortBy" className="block mb-2 text-sm font-semibold">
                Sort By
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={handleSortChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Newest</option>
                <option>Oldest</option>
              </select>
            </div>
            <div className="flex items-center justify-center w-full">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" onClick={() => setShowMoreMenu(false)} />
                Mute notifications
              </label>
            </div>
            <button
              className="w-full py-1 text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
              onClick={() => setShowMoreMenu(false)}
            >
              Mark all as read
            </button>
            <button
              className="w-full py-1 text-white transition bg-red-600 rounded-md hover:bg-red-700"
              onClick={() => setShowMoreMenu(false)}
            >
              Clear chat history
            </button>
          </div>
        )}
      </div>
      <div className="w-full border-b-2 border-gray-200">
        <ul className="flex gap-2 p-3 text-sm text-gray-800 justify-evenly">
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
      <div className="flex-1 px-2 py-2 overflow-y-auto">
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
