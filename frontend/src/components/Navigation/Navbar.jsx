import {
  Briefcase,
  Building2,
  Home,
  Mail,
  MessageSquareMoreIcon,
  SearchIcon,
  UserCircle2Icon,
} from 'lucide-react';
import { useState } from 'react';
import JobCategories from './JobCategories';

const Navbar = ({ setShowMessages }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showJobsCategories, setShowJobCategories] = useState(false);

  const handleSearchEvents = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSearchDropdown(value.trim().length > 0);
  };

  return (
    <div className="w-full fixed top-0 flex justify-between items-center px-10 h-20 shadow-md font-body m-auto transition border-color duration-300 ease-in-out gap-4 sm:px-5 xs:px-5 z-[200] bg-white">
      <div className="hidden text-2xl cursor-pointer sm:flex font-heading text-primary">
        <a href="#">CN.IO Jobs</a>
      </div>
      <ul className="flex-row items-center justify-between hidden gap-4 lg:flex">
        <li className="flex items-center gap-2 text-black hover:text-primaryHover text-subheading">
          <Home className="" />
          <a href="">Home</a>
        </li>
        <li
          className="relative flex items-center gap-2 text-black hover:text-primaryHover text-subheading"
          onClick={() => setShowJobCategories(true)}
        >
          <Briefcase />
          Jobs
          {showJobsCategories && <JobCategories />}
        </li>
        <li className="flex items-center gap-2 text-black hover:text-primaryHover text-subheading ">
          <Building2 />
          <a href="">Companies</a>
        </li>
        <li className="flex items-center gap-2 text-black hover:text-primaryHover text-subheading ">
          <Mail />
          <a href="">Contact Us</a>
        </li>
      </ul>
      <div className="flex flex-row items-center justify-between gap-4 xs:w-full xs:flex-row-reverse md:w-fit md:flex-row-reverse">
        <div
          className="flex items-center justify-between border-2 border-black hover:border-primaryHover
          rounded-2xl p-2 relative lg:w-[350px]"
        >
          <SearchIcon className="p-0 m-0 text-xl text-black cursor-pointer hover:text-primaryHover" />
          <input
            className="w-full ml-2 bg-transparent border-none outline-none"
            placeholder="Search Jobs..."
            value={searchTerm}
            aria-label="Search jobs"
            onChange={handleSearchEvents}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // Your enter key logic here
                console.log('Enter pressed!', e.target.value);
                // For example, trigger search or submit form
              }
            }}
          />
          {showSearchDropdown && searchTerm && (
            <div className="absolute left-0 z-50 w-full bg-white border border-gray-700 rounded-md shadow-md top-12">
              {['Developer', 'Designer', 'HR Manager'].map((result, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 text-black cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setSearchTerm(result);
                    setShowSearchDropdown(false);
                  }}
                >
                  {result}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between gap-4 text-subheading">
          <UserCircle2Icon size={33} className="cursor-pointer" />
        </div>
      </div>
      <div>
        <MessageSquareMoreIcon
          className="text-xl text-black transition duration-200 ease-in-out cursor-pointer hover:text-primaryHover"
          aria-label="Messages"
          onClick={() => setShowMessages(true)}
        />
      </div>
    </div>
  );
};

export default Navbar;
