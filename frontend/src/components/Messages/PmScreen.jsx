import { Dialog, Transition } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, MoreVertical, SearchIcon, X } from 'lucide-react';
import { Fragment, useState } from 'react';
import { messages } from '../../lib/lib';
import Message from './Message';

const tabs = ['All', 'Jobs', 'Unread', 'Drafts', 'Starred'];

const PmScreen = ({ setShowMessages }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Newest');
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [messageCategory, setMessageCategory] = useState('All');
  const [allMessages, setAllMessages] = useState(messages);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const filteredMessages = () => {
    let filtered = [...allMessages];

    if (messageCategory === 'Unread') {
      filtered = filtered.filter((msg) => msg.isUnread);
    } else if (messageCategory === 'Starred') {
      filtered = filtered.filter((msg) => msg.isStarred);
    } else if (messageCategory === 'Drafts') {
      filtered = filtered.filter((msg) => msg.isDraft);
    } else if (messageCategory === 'Jobs') {
      filtered = filtered.filter((msg) => msg.type === 'Jobs');
    }

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(
        (msg) =>
          msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          msg.desc.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === 'Newest') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'Oldest') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    return filtered;
  };

  const onDelete = (id) => {
    setAllMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const markAllAsRead = () => {
    setAllMessages((prev) => prev.map((msg) => ({ ...msg, isUnread: false })));
  };

  return (
    <>
      <div className="w-full md:w-[450px] h-full absolute right-0 bg-white shadow-md z-40 flex flex-col">
        <div className="relative flex items-center justify-between w-full px-2 py-4 border-b-2 border-gray-200">
          <X
            className="cursor-pointer hover:text-primaryHover"
            onClick={() => setShowMessages(false)}
          />
          <div className="flex items-center flex-1 h-[40px] px-4 mx-2 border-2 border-gray-300 px-02 hover:border-primaryHover rounded-xl">
            <SearchIcon className="text-gray-500" />
            <input
              className="w-full ml-2 bg-transparent border-none outline-none"
              placeholder="Search Conversation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <MoreVertical
            className="cursor-pointer"
            onClick={() => setShowMoreMenu((prev) => !prev)}
          />
          <AnimatePresence>
            {showMoreMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-16 right-4 w-[200px] bg-white border border-gray-300 shadow-lg rounded-md p-4 z-50"
              >
                <div className="mb-4">
                  <label htmlFor="sortBy" className="block mb-1 text-sm font-medium">
                    Sort By
                  </label>
                  <select
                    id="sortBy"
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setShowMoreMenu(false);
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option>Newest</option>
                    <option>Oldest</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <input type="checkbox" onClick={() => setShowMoreMenu(false)} />
                  <span className="text-sm">Mute notifications</span>
                </div>
                <button
                  className="w-full py-1 mb-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  onClick={() => {
                    markAllAsRead();
                    setShowMoreMenu(false);
                  }}
                >
                  Mark all as read
                </button>
                <button
                  className="w-full py-1 text-white bg-red-600 rounded-md hover:bg-red-700"
                  onClick={() => {
                    setShowMoreMenu(false);
                    setShowConfirmClear(true); // open modal
                  }}
                >
                  Clear chat history
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ul className="flex gap-2 px-3 py-2 text-sm text-gray-800 border-b-2 border-gray-200 xs:overflow-scroll justify-evenly">
          {tabs.map((tab) => (
            <li
              key={tab}
              onClick={() => setMessageCategory(tab)}
              className={`px-3 py-1 rounded-full cursor-pointer border-[2px] transition-all ${
                messageCategory === tab
                  ? 'bg-primary text-white border-primary'
                  : 'border-primary hover:border-green-800'
              }`}
            >
              {tab}
            </li>
          ))}
        </ul>

        <div className="flex-1 px-2 py-2 overflow-y-auto">
          {filteredMessages().length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
              <Mail className="w-12 h-12 mb-2 opacity-30" />
              <p className="font-semibold">No messages found</p>
              <p className="text-sm text-gray-400">Try changing filters or search keywords</p>
            </div>
          ) : (
            <motion.div layout className="flex flex-col gap-2">
              {filteredMessages().map((message) => (
                <Message key={message.id} message={message} onDelete={onDelete} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
      <Transition appear show={showConfirmClear} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowConfirmClear(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-gray-900">
                  Clear Chat History
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete all your messages? This action cannot be undone.
                  </p>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
                    onClick={() => setShowConfirmClear(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                    onClick={() => {
                      setAllMessages([]);
                      setShowConfirmClear(false);
                    }}
                  >
                    Yes, Clear
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PmScreen;
