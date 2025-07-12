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
    <div className="w-full fixed top-0 flex justify-between items-center px-10 h-24 shadow-md font-body m-auto transition border-color duration-300 ease-in-out gap-4 sm:px-5 xs:px-5 z-[200] bg-white">
      <div className="hidden sm:flex text-2xl font-heading text-primary cursor-pointer">
        <a href="#">CN.IO Jobs</a>
      </div>
      <ul className="hidden lg:flex flex-row gap-4 justify-between items-center">
        <li className=" flex gap-2 items-center text-black hover:text-primaryHover text-subheading ">
          <Home className="" />
          <a href="">Home</a>
        </li>
        <li
          className="relative flex gap-2 items-center text-black hover:text-primaryHover text-subheading"
          onClick={() => setShowJobCategories(true)}
        >
          <Briefcase />
          Jobs
          {showJobsCategories && <JobCategories />}
        </li>
        <li className="flex gap-2 items-center text-black hover:text-primaryHover text-subheading ">
          <Building2 />
          <a href="">Companies</a>
        </li>
        <li className="flex gap-2 items-center text-black hover:text-primaryHover text-subheading ">
          <Mail />
          <a href="">Contact Us</a>
        </li>
      </ul>
      <div className="flex flex-row xs:w-full xs:flex-row-reverse md:w-fit md:flex-row-reverse items-center justify-between gap-4">
        <div
          className="flex items-center justify-between border-2 border-black hover:border-primaryHover
          rounded-2xl p-2 relative lg:w-[350px]"
        >
          <SearchIcon className="text-black hover:text-primaryHover text-xl m-0 p-0 cursor-pointer" />
          <input
            className="bg-transparent border-none outline-none ml-2 w-full"
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
            <div className="absolute top-12 left-0 w-full shadow-md rounded-md border border-gray-700 bg-white z-50">
              {['Developer', 'Designer', 'HR Manager'].map((result, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer"
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
        <div className="flex items-center gap-4 justify-between text-subheading">
          <UserCircle2Icon size={33} className="cursor-pointer" />
        </div>
      </div>
      <div>
        <MessageSquareMoreIcon
          className="text-black hover:text-primaryHover cursor-pointer text-xl transition duration-200 ease-in-out"
          aria-label="Messages"
          onClick={() => setShowMessages(true)}
        />
      </div>
    </div>
  );
};

export default Navbar;
